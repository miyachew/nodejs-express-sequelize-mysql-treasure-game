const yup = require('yup');
const Sequelize = require('sequelize');
const models = require('../models');

class TreasureController {
  async getTreasures(req, res, next) {
    const { latitude, longitude, distance, prize_value } = req.body;

    let schema = yup.object().shape({
      latitude: yup.number().required(),
      longitude: yup.number().required(),
      distance: yup.mixed().oneOf([1,10]),
      prize_value: yup.number().notRequired().nullable().integer().min(10).max(30)
    });

    await schema.validate({ latitude, longitude, distance, prize_value }).catch(function (err) {
      return res.status(422).json({ 'errors': err.errors }).end();
    });

    if (prize_value){
      let query = 'SELECT t.*,t2.amt FROM treasures t JOIN (select treasureId, min(amt) as amt FROM treasure_money_values WHERE amt >= :amt group by treasureId ) t2 on t.id=t2.treasureId';
      query += ' where(111.045 * DEGREES(ACOS(COS(RADIANS(:lat)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(:lon)) + SIN(RADIANS(:lat)) * SIN(RADIANS(latitude))))) < :distance'
      query += ' order by rand() limit 1';

      var treasureBox = await models.sequelize.query(query, {
        replacements: {
          amt: prize_value,
          lat: latitude,
          lon: longitude,
          distance
        },
        model: models.treasures,
        mapToModel: true,
        plain:true,
        type: Sequelize.QueryTypes.SELECT
      });
    }else{
      let query = 'SELECT t.*,t2.amt FROM treasures t LEFT JOIN treasure_money_values t2 on (t.id=t2.treasureId)';
      query += ' where(111.045 * DEGREES(ACOS(COS(RADIANS(:lat)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(:lon)) + SIN(RADIANS(:lat)) * SIN(RADIANS(latitude))))) < :distance'
      query += ' order by rand() limit 1';

      var treasureBox = await models.sequelize.query(query, {
        replacements: {
          lat: latitude,
          lon: longitude,
          distance
        },
        model: models.treasures,
        mapToModel: true,
        plain: true,
        type: Sequelize.QueryTypes.SELECT
      });
    }

    if (!treasureBox){
      return res.status(200).json({ 'message': "No luck. Please try again." }).end();
    }else{
      let prize = treasureBox.dataValues.amt;
      let treasureName = treasureBox.dataValues.name;

      let treasureMoneyValue = await models.treasure_money_values.findOne({
          where: { 
            treasureId: treasureBox.dataValues.id,
            amt: prize
          } 
      });
      if (!treasureMoneyValue) {
        return res.status(200).json({ 'message': "No luck. Please try again." }).end();
      }

      await models.user_treasures.create({
        userId: req.authData.user.id,
        treasureMoneyValueId: treasureMoneyValue.id
      }).then(function (newRecord) {
        if (!newRecord) {
          response.status(400).json({'errors':'Error in insert new record'});
        }
      });
      return res.status(200).json({ 'message': `You've won ${prize} from ${treasureName}` }).end();
    }
  }

  async getLeaderboard(req, res, next) {
    let query = 'select u.name,u.email,COALESCE(userTreasure.totalPrizeWon,0) as totalPrizeWon FROM users u left join (select t.userId, sum(amt) as totalPrizeWon FROM user_treasures t join treasure_money_values tmv on (t.treasureMoneyValueId=tmv.id) group by t.userId) as userTreasure on u.id=userTreasure.userId Order By userTreasure.totalPrizeWon desc';

    var leaderBoard = await models.sequelize.query(query, {
      replacements: {},
      model: models.users,
      mapToModel: true,
      type: Sequelize.QueryTypes.SELECT
    });
    res.json(leaderBoard)
  }
}
module.exports = TreasureController;
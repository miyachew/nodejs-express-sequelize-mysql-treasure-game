const jwt = require("jsonwebtoken");
const yup = require('yup');
const bcrypt = require('bcryptjs');

const authConfig = require("../config/auth");
const models = require('../models');

class AuthController {
  async login(req, res, next) {
    const { email, password } = req.body;

    let schema = yup.object().shape({
      password: yup.string().required(),
      email: yup.string().email()
    });

    await schema.validate({ email, password  }).catch(function (err) {
       return res.status(422).json({ 'errors': err.errors }).end();
    });

    let user = await models.users.findOne({ where: { email } });
    if(!user){
      return res.status(422).json({ 'errors': [ "Invalid login credetials." ] }).end();
    }

    let validPassword = await bcrypt.compareSync(password, user.password);
    if(!validPassword){
      return res.status(422).json({ 'errors': ["Invalid login credetials."] }).end();
    }

    jwt.sign({ user }, authConfig.secretKey, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        return res.status(422).json({ 'errors': err.message }).end();
      } else {
        res.status(200).json({ token, user });
      }
    });
  }
}
module.exports = AuthController;
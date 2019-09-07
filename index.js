const logger = require('morgan');
const bodyParser = require('body-parser');
const app = require('express')();

const ApiAcl = require("./middleware/api_acl");

const AuthController = require("./controllers/AuthController");
const TreasureController = require("./controllers/TreasureController");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const auth = new AuthController();
app.post('/login', auth.login);

const treasure = new TreasureController();
app.get('/treasures', ApiAcl, treasure.getTreasures);
app.get('/treasures/leaderboard', ApiAcl, treasure.getLeaderboard);

const port = 3000;
app.listen(port, () => console.log('Server running on port',port));
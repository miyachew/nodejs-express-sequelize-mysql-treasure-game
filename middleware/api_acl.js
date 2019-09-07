const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = function(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !=='undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        jwt.verify(bearerToken,authConfig.secretKey, (err,authData)=>{
            if(err){
                res.status(403);
                res.json({
                    'errors': err.message
                });
            }else{
                req.authData = authData;
                next();
            }
        });
    }else{
        res.status(403);
        res.json({
            'errors': err.message
        });
    }
};

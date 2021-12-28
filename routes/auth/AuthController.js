var jwt = require('jsonwebtoken');
var config = require('../../config/config');

function createToken(details){
        console.log(details,"detailsssss");
    return jwt.sign(details, config.secret, {
        expiresIn: '90d' // expires in 24 hours
    })
}
module.exports={generateAuthToken:createToken};

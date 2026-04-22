const jwt = require('jsonwebtoken');
const config = require('config');
const key = config.get('jwtKey');
function getToken(input)
{
    return jwt.sign(input, key);
}

function verify(input)
{
    return jwt.verify(input, key);
}

module.exports.getToken = getToken;
module.exports.verify = verify;

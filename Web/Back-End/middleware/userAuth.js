const jwt = require('../helper/jsonWebToken');

function auth(req, res, next) 
{
    const token = req.header('x-auth');
    if (!token) return res.status(401).send('ACCESS DENIED: no token provided');
    try
    {
        const decode = jwt.verify(token);
        req.user = decode;
        next();
    }
    catch (exep)
    {
        res.status(400).send('Invalid Token');
    }
}

module.exports = auth;
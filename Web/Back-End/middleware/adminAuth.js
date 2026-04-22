const jwt = require('../helper/jsonWebToken');

const { getToken } = require('../helper/jsonWebToken');

function auth(req, res, next) 
{
    const token = req.header('x-auth');
    if (!token) return res.status(401).send('ACCESS DENIED: no token provided');
    try
    {
        const decode = jwt.verify(token);
        if (!decode.isAdmin) return req.sendStatus(401);
        req.user = decode;
        next();
    }
    catch (exep)
    {
        res.status(400).send('Invalid Token');
    }
}

module.exports = auth;
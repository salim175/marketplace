const config = require('config');
const key = config.get('rootPass');
function auth(req, res, next) 
{
    const pass = req.header('x-rootPass');
    if (!pass) return res.status(401).send('ACCESS DENIED');
    if (pass !== key) return res.sendStatus(401);
    next();
}

module.exports = auth;
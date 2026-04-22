const winston = require('winston');
module.exports = (err, req, res, next) =>
{
    if (err.code == 11000) return res.status(400).send(err.message);
    console.log(err);
    today = new Date();
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    winston.error(err.message + " " + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + "~" + time);
    res.sendStatus(500);
}

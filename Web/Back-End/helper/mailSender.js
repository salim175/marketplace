const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreply.LiabnCoin@gmail.com',
        pass: 'noReply.LibanCoin123'
    }
});

module.exports = (mail, subject, text) =>
{
    console.log(mail + "\n" + subject + "\n" + text);
    let mailOptions = {
        from: 'noreply.LibanCoin@gmail.com',
        to: mail,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function (err, data)
    {
        if (err) throw err;
    });
};
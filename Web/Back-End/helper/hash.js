const bcrypt = require('bcrypt');

async function encrypt(input)
{
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(input, salt);
    return hashed;
}

async function compare(text, hash)
{
    return await bcrypt.compare(text, hash);
}
module.exports.encrypt = encrypt;
module.exports.compare = compare;

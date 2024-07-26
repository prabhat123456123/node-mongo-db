const { hash, compare } = require('bcryptjs');

const hashPassword = async (password) => {
    console.log(password);
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
}


const comparePassword = async (enteredPassword,originalPassword) => {
    const isMatch = await compare(enteredPassword,originalPassword);
    return isMatch;
}

module.exports = {hashPassword,comparePassword}
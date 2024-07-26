const { sign, verify } = require("jsonwebtoken");
const { jwtSecret,expiresIn } = require("../config");

const createToken =  (id,role) => {
    const token =  sign({ id, role }, jwtSecret, {
       expiresIn,
        issuer:'nodejs'
    });
    return token;
}


const verifyToken = async (token) => {
    console.log(token);
    const decoded =  await verify(token,jwtSecret);
    return decoded;
}

module.exports = {createToken,verifyToken}
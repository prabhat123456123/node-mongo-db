const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
    port:process.env.PORT,
    jwtSecret:process.env.JWT_SECRET,
    expiresIn:process.env.EXPIRESIN,
    mongo_url:process.env.MONGOURL,
    baseUrl:'/api/v1',
}
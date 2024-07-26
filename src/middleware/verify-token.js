const { User } = require('../models')
const {bcryptServices:{hashPassword,comparePassword},jwtServices:{createToken,verifyToken}} = require('../services')


const validateToken = async (req, res, next) => {
    try {
        const ipAddress = req.ip;
        const userAgent = req.get('User-Agent')
        let token;
        const { authorization } = req.headers;
        if (authorization && authorization.startsWith('Bearer')) {
            token = authorization.split(" ")[1];
        } else if (req.cookie?.token) {
            token = req.cookie?.token
        }
        if (!token) {
            return res.status(401).json({ message: "token not provided", status: 401 })
        }
        const decoded = await verifyToken(token);
        //  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        //         if (err) {
        //             if (err.name === 'TokenExpiredError') {
        //                 return res.status(401).json({ message: 'Token expired' });
        //             } else {
        //                 return res.status(401).json({ message: 'Unauthorized' });
        //             }
        //         }
        const currentUser = await User.findOne({ _id: decoded.id })

        if (!currentUser) {
            return res.status(401).json({ message: " user not exists with this token", status: 401 })
        }
        if (currentUser.ipAddress !== ipAddress || currentUser.userAgent !== userAgent) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = currentUser;
        res.locuser = currentUser;
        return next();
    } catch (err) {
         if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}

module.exports = {validateToken}



const {User} = require('../models')
const {bcryptServices:{hashPassword,comparePassword},jwtServices:{createToken,verifyToken}} = require('../services')

exports.signup = async (req, res, _) => {
    try {
        let { name, email, password } = req.body;
        const user = await User.findOne({email})
        if (user) {
        return res.status(409).json({ message:"user already exist", status:409})
        } else {
             password = await hashPassword(password);
            await User.create({name,email,password})
              
                return res.status(201).json({message:"created successfuly",status:201})
            
    }
    } catch (error) {
        console.log(error);
        
    }
}

exports.login = async (req, res, _) => {
    try {
        const { email, password } = req.body;
        const ipAddress = req.ip;
        const userAgent = req.get('User-Agent')
        console.log(ipAddress);
        const user = await User.findOne({email})
        if (user) {
            const isMatch = await comparePassword(password, user.password)
            if (isMatch) {
                const token = await createToken(user._id, user.role)
                user.ipAddress = ipAddress;
                user.userAgent = userAgent;
                await user.save();
                // res.setHeader('token', token);
                 res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
                 return res.status(200).json({ message:"logged in", status:200, token:token})
            } else {
                 return res.status(401).json({ message:"invalid credential", status:401})
            }
       
        } else {
                return res.status(404).json({message:"User Not Exists", status:404})
            
    }
    } catch (error) {
        console.log(error);
        
    }
}

exports.logout = async (req, res, _) => {
    try {
       res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log(error);
        
    }
}
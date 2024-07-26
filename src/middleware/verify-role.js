const restrictTo = (...roles) => async (req, res, next) => {
    const {role} = req.user;
    if (!roles.includes(role)) {
        return res.status(401).json({ message: "you are not authorized", status:401});
    }
    return next();
}

module.exports = {restrictTo}
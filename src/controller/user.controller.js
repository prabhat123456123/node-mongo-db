const { User } = require("../models")

exports.getData = async (req, res, _) => {
    const users = await User.find({})
     return res.status(200).json({ message:"fetched", status:200, users:users})
}

exports.getDataById = async (req, res, _) => {
     const user = await User.findOne({_id:req.body.id})
     return res.status(200).json({ message:"fetched", status:200, user:user})
}
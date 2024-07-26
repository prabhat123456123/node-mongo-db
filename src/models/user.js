const { Schema, model } = require('mongoose');

userSchema = new Schema(
    {
    name: {
        type: String,
        required:true
    },
     email: {
        type: String,
        required:true
    },
      password: {
        type: String,
        required:true
    },
       role: {
        type: String,
           enum: ['USER', 'ADMIN'],
           default:'USER'
        },
        ipAddress: {
        type: String,
        required:false
        },
         userAgent: {
        type: String,
        required:false
    },
    },{timestamps:true}
)

module.exports = model('User', userSchema);
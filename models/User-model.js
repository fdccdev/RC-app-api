const {model, Schema} = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        require: true
    },
    email_corp:{
        type: String,
        require: true,
        unique: true
    },
    area:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    active: {
        type: Boolean
    }
})

module.exports = model('User', UserSchema)
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secret;
const Role = require('./Role');
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength : [40,"Too many characters"],
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password:{
        type:String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    role:{
        type:String,
        ref:'Role'
    }
},{timestamps:true});

// Whenever returning json doc
userSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    return userObj
}


userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id.toString()},secret);
    user.tokens = user.tokens.concat({token});
    await user.save()
    return token
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next){
    const user = this;
    const emailCount = await mongoose.models.User.countDocuments({email: user.email  });
    if(emailCount>1)
        throw new Error(`User with email ${user.email} already exist`)
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8);
    }
});

// for login purpose only, auth can't do stuff, hence static method
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

// // unique does not work, hence working on 
// userSchema.path('email').validate( async (value,done) => {
//     const emailCount = await mongoose.models.User.countDocuments({email: value });
//     console.log(emailCount)
//     return !emailCount;
//   }, 'Email already exists');


module.exports = User = mongoose.model('User',userSchema);
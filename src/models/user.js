const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        max: 20
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', async function(next){
    //hash the password before saving
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

userSchema.static.validateLogin = async function(username, password){
    const user = await userModel.findOne({ username });

    if(!user){
        return new Error('Please enter a valid username/password!');
    }

    const isCorrectUser = await bcrypt.compareSync(password, user.password);
    if(!isCorrectUser){
        return new Error('Please enter a valid username/password!');
    }

    return user;
};

userSchema.methods.generateAuthToken = async function(){
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
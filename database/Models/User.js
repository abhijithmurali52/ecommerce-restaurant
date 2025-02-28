const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
        // unique: true,
    },
    email: {
        type: String,
        // required: true,
        // unique: true,
    },
    mobileNo: {
        type: String,
        // required: true,
        // unique: true,
    },
    address:{
        // type: String,
        // required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
}, { timestamps: true });

// Generate JWT token
UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// const userSchema = new Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// });
//
// const User = mongoose.model('User', userSchema);
//
// module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Method to generate JWT
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

// Method to hash password before saving user
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;


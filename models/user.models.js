const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        avatar: {
            type: {
                url: String,
                localPath: String,
            },
            default: {
                url: 'data:image/png;base64,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',
                localPath: 'images/',

            }
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters long'],
            lowercase: true,
            index: true,

        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long'],

        },



    },
    { timestamps: true }
)

userSchema.methods.isPasswordValid = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};


userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    })
})


const User = mongoose.model("User", userSchema);
module.exports = User;
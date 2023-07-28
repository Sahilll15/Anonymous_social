const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.models')




const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ msg: "Not all fields have been entered" })
        }

        const existedUser = await User.findOne({
            $or: [{ username }],
        });

        if (existedUser) {
            return res.status(400).json({ msg: "An account with this username  already exists" })
        }

        const newUser = await User.create({
            username,

            password
        })

        const token = jwt.sign({
            userId: newUser._id
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        res.status(201).json({ user: newUser, token: token, mssg: "new user created" })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
}


const loginUser = async (req, res) => {

    const { username, password } = req.body;
    try {
        if (!username | !password) {
            return res.status(400).json({ msg: "Not all fields have been entered" })
        }
        const user = await User.findOne({
            username
        })

        if (!user) {
            return res.status(400).json({ msg: "No account with this username does not exist!!" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid credentials" })
        }

        const token = jwt.sign({
            userId: user._id
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        res.status(200).json({ user: user, token: token, mssg: "user logged in" })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
}


const updateavatar = async (req, res) => {
    const { avatar } = req.body;
    try {
        const { userId } = req.params;
        if (!avatar) {
            return res.status(400).json({ msg: "No avatar was added" });
        }

        // Find the user by their userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "No user with this ID" });
        }

        // Update the avatar URL
        user.avatar.url = avatar;


        await user.save();

        res.json({ avatar: avatar, msg: "Avatar updated successfully!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}





module.exports = {
    registerUser,
    loginUser,
    updateavatar
}
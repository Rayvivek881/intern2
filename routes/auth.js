const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;
const varifyToken = require('../middleware/varifyToken');
const encrypt = require('../constant/encrypt')

router.post('/signup', async (req, res) => {
    const { userId, password } = req.body;
    console.log(JWT_TOKEN);
    try {
        if (!userId || !password) {
            return res.status(400).json({
                error: "fill all details"
            })
        }

        let encr = encrypt(password);
        const user = new User({
            userId: userId,
            password: encr
        })
        const token = jwt.sign({ _id: user._id }, JWT_TOKEN);
        console.log({ userId, encr, user });
        user.token = token;
        await user.save();
        res.status(200).json({
            user
        })
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.post('/changepassword', async (req, res) => {
    const { userId, prev_password, new_password } = req.body;
    try {
        if (!userId || !prev_password || !new_password) {
            return res.status(400).json({
                error: "add all the required field"
            })
        }
        const encr = encrypt(prev_password);
        const user = await User.find({ userId });
        if (String(user.password) !== String(encr)) {
            return res.status(400).json({
                error: "wrong previous password"
            })
        }
        user.password = encr
        user.createPassword = new Date.now();
        const token = jwt.sign({ _id: user._id }, JWT_TOKEN);
        user.token = token
        await user.save();
        res.status(200).json({
            user,
            msg: "password update successfully"
        })
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
})

module.exports = router
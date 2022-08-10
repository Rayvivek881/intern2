const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;
const varifyToken = require('../middleware/varifyToken');
const Student = require('../models/Student');

router.post('/create', varifyToken, async (req, res) => {
    const { stu_id, name, DOB } = req.body
    try {
        if (!stu_id || !name || !DOB) {
            return res.status(400).json({
                msg: "details missing"
            })
        }
        const student = await Student.create({
            user: req.user._id,
            stu_id,
            name,
            DOB
        })
        res.status(200).json({
            student: student,
            msg: "created successfully"
        })
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

module.exports = router
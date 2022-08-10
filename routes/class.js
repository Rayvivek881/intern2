const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;
const varifyToken = require('../middleware/auth');
const Subject = require('../models/Subject');
const Class = require('../models/Class');
const Student = require('../models/Student');

router.post('/create', varifyToken, async (req, res) => {
    const {year,class_teacher, class_id,subject,students} = req.body; 
    try {
        if(!year || !class_teacher || !class_id){
            return res.status(400).json({
                error: 'fill all details'
            })
        }
        const classess = new Class({
            class_id,
            year,
            class_teacher,
            subject
        })
        let class_student = [];
        for(let roll = 1;roll <= students.rolls.length ; roll++){
            const stu_id = students.rolls[roll].Student_id;
            const student = await Student.find({stu_id: stu_id});
            if(!student){
                res.status(404).json({
                    warning: `this user stuend_id ${stu_id} doesn't exist`
                })
                continue;
            }
            student.roll = roll;
            student.marks = students.rolls[roll].Marks;
            await student.save();
            class_student.push(stu_id);
        }
        classess.students = class_student;
        await classess.save();
        res.status(200).json({
            classess,
            msg: "succesfully executed"
        })
    } catch(err) {
        res.status(400).json({error: err});
    }
});

router.get('/:subject/:classid',varifyToken,async(req,res)=>{
    const {subject,classid} = req.params;
    try {
        if(!subject||!classid){
            return res.status(400).json({
                error: "something missing subject or class_id"
            })
        }
        const allStudent = await Subject.find({
            class: classid,
            name: subject
        })
        
    } catch (err) {
        res.status(400).json({error: err})
    }
})

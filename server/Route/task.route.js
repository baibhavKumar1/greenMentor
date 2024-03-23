const express  = require('express');
const auth = require('../Middleware/auth.middleware');
const TaskModel = require('../Model/task.model');
const UserModel = require('../Model/user.model');
const TaskRouter= express.Router();

TaskRouter.use(auth);

TaskRouter.get('/',async(req,res)=>{
    const task = await TaskModel.find({creator:req.body.userID})
    res.status(200).json(task)
})
TaskRouter.get('/:id',async(req,res)=>{
    const {id} = req.params;
    const task = await TaskModel.findById(id)
    res.status(200).json(task)
})
TaskRouter.post('/',async(req,res)=>{
    const task = await TaskModel.create({...req.body,creator:req.body.userID})
    await UserModel.findByIdAndUpdate(req.body.userID,{$push:{tasks:task._id}},{new:true})
    res.status(200).json(task)
})

TaskRouter.patch('/:id',async(req,res)=>{
    const {id} = req.params;
    const task = await TaskModel.findByIdAndUpdate(id,{...req.body},{new:true})
    res.status(200).json({task})
})
TaskRouter.delete('/:id',async(req,res)=>{
    await TaskModel.findByIdAndDelete(req.params.id)
    await UserModel.findByIdAndUpdate(req.body.userID,{$pull:{tasks:req.params.id}},{new:true})
    res.status(200).json({message:"Task Deleted"})
})

module.exports = TaskRouter
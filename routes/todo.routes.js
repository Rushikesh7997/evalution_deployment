const {Router} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const {TodoModel} = require("../models/Todo.model")

const todoController = Router();

todoController.get("/", async (req,res)=>{
    const {tag} = req.query
    const todo = await TodoModel.find({userId:req.body.userId, tag})
    res.send(todo)
})

todoController.post("/create", async(req,res)=>{
    const {TaskName, Status, Tag} = req.body;
    const todo = new TodoModel({
        TaskName,
        Status,
        Tag
    })
    try{
        await todo.save()
        res.send("todo created")
    }
    catch(err){
        res.send("something wrong")
    }
})

todoController.delete("/delete/:todoId", async(req,res)=>{
    const {todoId} = req.params
    const deleteTodo = await TodoModel.findOneAndDelete({_id:todoId, userId : req.body.userId})
    if(deleteTodo){
        res.status(200).send("Todo Deleted")
    }
    else{
        res.send("todo not deleted")
    }
})

todoController.patch("/update/:todoId", async(req,res)=>{
    const {todoId} = req.params
    const updateTodo = await TodoModel.findOneAndUpdate({_id:todoId, userId : req.body.userId},req.body)
    if(updateTodo){
        res.send("Todo Updated")
    }
    else{
        res.send("todo not Updated")
    }
})

module.exports = {todoController}
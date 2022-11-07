const express = require("express")
const cors = require("cors")
const {connection} = require("./config/db")
const {authentication} = require("./middlewares/authentication")
const {todoController} = require("./routes/todo.routes")
const {userController} = require("./routes/user.routes")


 
const app = express();

const PORT = process.env.PORT || 8500;

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to TODO-APP")
})

app.use(cors())

app.use("/user",userController)
app.use(authentication)
app.use("/todo", todoController)

app.listen(PORT,async()=>{
    try{
        await connection;
        console.log("connected to db")
    }
    catch(err){
        console.log("error in connecting in db")
        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})
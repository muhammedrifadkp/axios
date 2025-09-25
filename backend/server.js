const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({name:String,age:Number})

const User = mongoose.model("user",userSchema,"user")

// send datas to mongodb
app.post("/users",async (req,res) => {
    const newUser = new User(req.body)
    await newUser.save()
    res.json(newUser)
})

// edit data in the mongodb
app.patch("/users/:id",async (req,res) => {
    const {id} = req.params
    const updateAge = req.body
    const updatedUser = await User.findByIdAndUpdate(id,updateAge,{new:true})
    res.json(updatedUser)
})

// delete user from mongodb
app.delete("/users/:id",async (req,res) => {
    const {id} = req.params
    await User.findByIdAndDelete(id)
    res.json({message:"user deleted"})
})

// get datas from mongodb
app.get("/users",async (req,res)=>{
    const users = await User.find()
    res.json(users)
})

app.listen(3000, () => {  // http://localhost:3000
    console.log("server running at http://localhost:3000");
})
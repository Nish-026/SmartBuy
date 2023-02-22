const express = require("express");
const bcrypt = require("bcrypt")
const userRouter = express.Router();
const { userModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
userRouter.post("/register", async (req, res) => {
    const { name, email, password,mobile } = req.body
    const user=await userModel.find({email})
    if(user.length>0){
        res.send({"msg":"registered"})
    }else{
        try {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) res.send(err.message)
                else {
                    const user = new userModel({ name, email, password: hash,mobile})
                    await user.save();
                    res.send({ "msg": "success" })
                }
            });
        } catch (err) {
            res.send({ "msg": "something went wrong", "error": err.message })
        }
    }


})

userRouter.post("/login", async (req, res) => {
    const { email, password } = (req.body)
    try {
        const user = await userModel.find({email})
        if(user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result)=> {
                if(result){
                    let token = jwt.sign({userID:user[0]._id}, 'shhhhh');
                    res.send({ "msg": "Logging in", "token": token })
                }else{
                    res.send({ "msg": "Wrong credentials" })
                }
            });
        } else {
            res.send({"msg":"Something went wrong"})
        }
    } catch (err) {
        res.send({ "msg": "Something went wrong", "error": err.message })
    }

})

module.exports = {
    userRouter
}
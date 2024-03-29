const express = require("express");
const bcrypt = require("bcrypt")
const userRouter = express.Router();
const { userModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")



/********************** User Register **************************/ 
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
                    res.send({ "message": "user registered successfully" })
                }
            });
        } catch (err) {
            res.send({ "msg": "something went wrong", "error": err.message })
        }
    }


})




/********************** User Register **************************/ 

userRouter.post("/login", async (req, res) => {
    const { email, password } = (req.body)
    try {
        const user = await userModel.find({email})
        console.log(user);
        if(user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result)=> {
                console.log(result);
                if(result){
                    let token = jwt.sign({userID:user[0]._id,username:user[0].name}, 'shhhhh');
                    res.send({ "msg": "Logging in", "token": token,"username":user[0].name})
                }else{
                    res.status(401)
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

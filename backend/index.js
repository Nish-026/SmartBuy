const express=require("express");
const {connection}=require("./db")
const {userRouter}=require("./routes/user.route")
const {productRouter}=require("./routes/product.route")
const {cartRouter}=require("./routes/cart.route")
const cors=require("cors")
require("dotenv").config()
const app=express();
app.use(express.json());
app.use(cors())
app.use("/cart",cartRouter)
app.use("/users",userRouter)
app.use("/product",productRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")
    }catch(err){
        res.send({"msg":"something went wrong","err":err.message})
    }
    console.log("server is running")

})
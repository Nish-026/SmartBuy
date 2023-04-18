const express=require("express");
const {connection}=require("./db")
const {userRouter}=require("./routes/user.route")
const {productRouter}=require("./routes/product.route")
const {cartRouter}=require("./routes/cart.route")
const {orderRouter}=require("./routes/order.route")
const cors=require("cors")
require("dotenv").config()
const app=express();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/cart",cartRouter)
app.use("/users",userRouter)
app.use("/product",productRouter)
app.use("/orders",orderRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Yay! connected to the database")
    }catch(err){
        res.send({"msg":"something went wrong","err":err.message})
    }
    console.log("server is running")

})
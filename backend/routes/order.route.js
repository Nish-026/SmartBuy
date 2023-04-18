const express=require("express");
const {connection}=require("../db")
const {authenticate}=require("../middleware/authenticate.middleware")
const orderRouter=express.Router()
const {orderModel} = require("../model/order.model")

orderRouter.get("/",authenticate,async(req,res)=>{
    await connection
    console.log(req.body)
    const {userID}=req.body;
    console.log({userID})
    const orders= await orderModel.find({userID})
    res.send(orders);
})

orderRouter.post("/add",authenticate,async(req,res)=>{
    const payload= req.body
    console.log(payload)
    const order= new orderModel(payload)
    await order.save()
    res.send({"msg":"order placed"})
})



module.exports={
    orderRouter
}
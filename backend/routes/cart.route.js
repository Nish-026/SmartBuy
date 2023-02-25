const express=require("express");
const {connection}=require("../db")
const {authenticate}=require("../middleware/authenticate.middleware")
const cartRouter=express.Router()
const {cartModel} = require("../model/cart.model")
const {productModel}=require("../model/products.model")
cartRouter.get("/",authenticate,async(req,res)=>{
    await connection
    console.log(req.body)
    const {userID}=req.body;
    console.log({userID})
    const products= await cartModel.find({userID})
    const p=[]

    for(let i=0;i<products.length;i++){
        const product= await productModel.findOne({_id:products[i].product_Id})
        console.log(product)
        p.push(product);
    }
    console.log(p)
    res.send(p);
})

cartRouter.post("/add",authenticate,async(req,res)=>{
    const payload= req.body
    console.log(payload)
    const cart= new cartModel(payload)
    await cart.save()
    res.send({"msg":"cart created"})
})



module.exports={
    cartRouter
}
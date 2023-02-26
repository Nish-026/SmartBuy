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
    console.log(products)
    for(let i=0;i<products.length;i++){
        const product= await productModel.findOne({_id:products[i]["product_Id"]})
        console.log(product);
        p.push(product);
    }
    res.send(p);
})

cartRouter.get("/cartdata/",authenticate,async(req,res)=>{
    const {userID}=req.body;
    try{
        const products= await cartModel.find({userID})
        res.send(products);
    }catch(err){
        res.send({"msg":"something went wrong"})
    }
})
cartRouter.post("/add",authenticate,async(req,res)=>{
    const payload= req.body
    console.log(payload)
    const cart= new cartModel(payload)
    await cart.save()
    res.send({"msg":"cart created"})
})

cartRouter.delete("/delete/:id",authenticate,async(req,res)=>{
    const productID=req.params.id
    const query={}
    query["product_Id"]=productID
    const {userID}=req.body;
    console.log({userID})
    query["userID"]=req.body.userID
    console.log(query)
    const product =await cartModel.find(query)
    console.log(product);
    let ID=product[0]._id
    try{
            await cartModel.findByIdAndDelete({"_id":ID})
            res.send({"msg":"cart product deleted"})

    }catch(err){
        console.log(err);
        res.send({"msg":"something went wrong"})
    }
})
cartRouter.patch("/update/:id",authenticate,async(req,res)=>{
    const payload=req.body
    const productID=req.params.id
    const query={}
    query["product_Id"]=productID
    const {userID}=req.body;
    console.log({userID})
    query["userID"]=req.body.userID
    console.log(query)
    const product =await cartModel.find(query)
    console.log(product);
    let ID=product[0]._id
    try{
            await cartModel.findByIdAndUpdate({"_id":ID},payload)
            res.send({"msg":"cart product updated"})

    }catch(err){
        console.log(err);
        res.send({"msg":"something went wrong"})
    }
})


module.exports={
    cartRouter
}
const express=require("express");

const productRouter=express.Router()
const {productModel} = require("../model/products.model")

productRouter.get("/",async(req,res)=>{
    console.log(req.query)
    let query={}
    if(req.query.product_category){
        query["product_category"]=req.query.product_category;
    }
    if(req.query.category){
        query["category"]=req.query.category
    }
    let sortby={}
    let min,max;
    if(req.query.min||req.query.max){
        min=req.query.min
        max=req.query.max
        if(min&&max){
            query["price"]={$gt:min,$lt:max}
        }else{
            query["price"]={$gt:min}
        }
    }
    console.log(query);
    if(req.query.asc){
        sortby[req.query.asc]=1;
    }else if(req.query.desc){
        sortby[req.query.desc]=-1;
    }
    console.log(req.query)
    const products= await productModel.find(query).sort(sortby)
    let brands={}
    for(let i=0;i<products.length;i++){
        if(brands[products[i].brand]==undefined){
            brands[products[i].brand]=1;
        }
    }
    res.status(200).send({products,brands})

})


productRouter.post("/create",async(req,res)=>{
    const payload= req.body
    console.log(payload)
    const product= new productModel(payload)
    await product.save()
    res.send({"msg":"product created"})
})

productRouter.patch("/update/:id",async(req,res)=>{
    const noteID=req.params.id
    const payload=req.body
    try{

            await productModel.findByIdAndUpdate({"_id":noteID},payload)
            res.send({"msg":`Note with id: ${noteID} has been updated`})
        
    }catch(err){
        console.log(err);
        res.send({"msg":"something went wrong"})
    }
    
})



productRouter.delete("/delete/:id",async(req,res)=>{
    const noteID=req.params.id
    try{
            await productModel.findByIdAndDelete({"_id":noteID})
            res.send({"msg":"note deleted"})
        
    }catch(err){
        console.log(err);
        res.send({"msg":"something went wrong"})
    }
    
})

module.exports={
    productRouter
}

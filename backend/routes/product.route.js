const express=require("express");

const productRouter=express.Router()
const {productModel} = require("../model/products.model")

productRouter.get("/",async(req,res)=>{
    console.log(req.query)
    const products= await productModel.find(req.query)
    res.send(products)

})

productRouter.post("/create",async(req,res)=>{
    const payload= req.body
    console.log(payload)
    const product= new productModel(payload)
    await product.save()
    res.send({"msg":"product created"})
})

// productRouter.patch("/update/:id",async(req,res)=>{
//     const noteID=req.params.id
//     const payload=req.body
//     try{
//         if(userId_making_req!==userId_in_doc){
//             res.send({"msg":"You're not authorized"})
//         }else{
//             await notesModel.findByIdAndUpdate({"_id":noteID},payload)
//             res.send({"msg":`Note with id: ${noteID} has been updated`})
//         }
        
//     }catch(err){
//         console.log(err);
//         res.send({"msg":"something went wrong"})
//     }
    
// })


// noteRouter.delete("/delete/:id",async(req,res)=>{
//     const noteID=req.params.id
//     console.log(noteID)
//     const note=await notesModel.findOne({"_id":noteID})
//     console.log(note)
//     console.log(note.user)
//     const userId_in_doc=note.user
//     console.log(req.body);
//     const userId_making_req=req.body.user
//     console.log(userId_making_req);
//     try{
//         console.log(userId_making_req==userId_in_doc);
//         if(userId_making_req!==userId_in_doc){
//             res.send({"msg":"You're not authorized"})
//         }else{
//             await notesModel.findByIdAndDelete({"_id":noteID})
//             res.send({"msg":"note deleted"})
//         }
        
//     }catch(err){
//         console.log(err);
//         res.send({"msg":"something went wrong"})
//     }
    
// })

module.exports={
    productRouter
}

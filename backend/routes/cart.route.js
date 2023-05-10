const express=require("express");
const {connection}=require("../db")
const {authenticate}=require("../middleware/authenticate.middleware")
const cartRouter=express.Router()
const {cartModel} = require("../model/cart.model")
const {productModel}=require("../model/products.model")


cartRouter.get("/",authenticate,async(req,res)=>{
    await connection
    const {userID}=req.body;
    const cart= await cartModel.find({userID})
    const products=[]
    console.log(cart)
    if(cart){
    for(let i=0;i<cart[0].items.length;i++){
        const product= await productModel.findOne({_id:cart[0].items[i]["product_id"]})
        console.log(product);
        products.push(product);
    }
    res.send({products,cart});
    }else{
        res.send({msg:"empty"})
    }

})


// cartRouter.get("/cartdata/",authenticate,async(req,res)=>{
//     const {userID}=req.body;
//     try{
//         const products= await cartModel.find({userID})
//         res.send(products);
//     }catch(err){
//         res.send({"msg":"something went wrong"})
//     }
// })



//--------------------------------- For adding products into Cart ------------------------------------//

cartRouter.post('/add', authenticate,async (req, res) => {
  try {
    const { userID, product_id,quantity,price} = req.body; // Assuming you're sending these values in the request body
    // Find the cart for the given userID
    let cart = await cartModel.findOne({ userID });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new cartModel({
        userID,
        items: [],
        total_price: 0
      });
    }
    console.log(cart.items);
    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.product_id == product_id);

    if (existingItem) {
      // If the product already exists, update the quantity and price
      existingItem.quantity += quantity;
      existingItem.price += price;
    } else {
      // If the product doesn't exist, add a new item to the cart
      cart.items.push({
        product_id,
        quantity,
        price
      });
    }

    // Update the total price of the cart
    cart.total_price += price;

    // Save the cart
    await cart.save();

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// cartRouter.post("/add",authenticate,async(req,res)=>{
//     const payload= req.body
//     console.log(payload)
//     const cart= new cartModel(payload)
//     await cart.save()
//     res.send({"msg":"cart created"})
// })

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

cartRouter.delete("/deletes/:id",async(req,res)=>{
    const ID=req.params.id
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
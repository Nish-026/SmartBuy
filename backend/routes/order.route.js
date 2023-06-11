const express=require("express");
const {authenticate}=require("../middleware/authenticate.middleware")
const orderRouter=express.Router()
const {orderModel} = require("../model/order.model")
const {cartModel}= require("../model/cart.model")
const {productModel} = require("../model/products.model")

orderRouter.get("/", authenticate, async (req, res) => {
    const { userID } = req.body;
    try {
      const orders = await orderModel.find({ userID });
      let data = [];
      for (const order of orders) {
        let obj = {
          Date: order.Date,
          Total_price: order.price,
          products: [],
          id:order._id
        };
        for (const product of order.products) {
          const Product = await productModel.find({"_id":product.product_id}); // Apply await here if needed
          obj.products.push(Product);
        }
        data.push(obj);
      }
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ message: "Something went wrong" });
    }
  });
 
  orderRouter.get("/:id", authenticate, async (req, res) => {
    const ID = req.params.id;
    try {
      const orders = await orderModel.find({_id:ID });
      console.log(orders);
      let data = [];
      for (const order of orders) {
        let obj = {
          Date: order.Date,
          Total_price: order.price,
          products: [],
          id:order._id
        };
        for (const product of order.products) {
          const Product = await productModel.find({"_id":product.product_id}); // Apply await here if needed
          obj.products.push(Product);
        }
        data.push(obj);
      }
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ message: "Something went wrong" });
    }
  });

orderRouter.delete("/add/:ID",authenticate,async(req,res)=>{
    const cart= await cartModel.findByIdAndDelete(req.params.ID);
    console.log(cart);
    const payload= req.body
    payload.products=cart.items;
    payload.price=cart.total_price
    console.log(payload);
    const order= new orderModel(payload)
    await order.save()
    res.send({"msg":"order placed"})
})



module.exports={
    orderRouter
}
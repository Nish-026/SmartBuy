const mongoose=require("mongoose")

const orderSchema=mongoose.Schema({
    orderID: String,
    userID: String,
    Date: {type:String, default:new Date()},
    price: Number,
    products: [{
      product_id: String,
      quantity:String,
      price:Number
    }]
})
const orderModel=mongoose.model("orders",orderSchema)

module.exports={
    orderModel
}
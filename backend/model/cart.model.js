const mongoose=require("mongoose")

const cartSchema=mongoose.Schema({
    product_Id: String,
    quantity: Number,
    userID:String,
    price:Number
})
const cartModel=mongoose.model("cart",cartSchema)

module.exports={
    cartModel
}
const mongoose=require("mongoose")

const cartSchema=mongoose.Schema({
    product_Id: String,
    quantity: Number,
    userID:String
})
const cartModel=mongoose.model("cart",cartSchema)

module.exports={
    cartModel
}
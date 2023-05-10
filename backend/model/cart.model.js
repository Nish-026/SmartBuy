const mongoose=require("mongoose")

const cartSchema=mongoose.Schema({
    userID:String,
    items: [
        {
          product_id: String,
          quantity: Number,
          price: Number
        }
      ],
      total_price: Number
})
const cartModel=mongoose.model("cart",cartSchema)

module.exports={
    cartModel
}


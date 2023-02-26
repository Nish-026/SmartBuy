const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    color:String,
    material:String,
    name:String,
    price:Number,
    category:String,
    product_category:String,
    brand:String,
    description:String,
    image1:String,
    image2:String,
    image3:String,
    image4:String,
    image5:String,
    quantity:Number
})
const productModel=mongoose.model("product",productSchema)

module.exports={
    productModel
}
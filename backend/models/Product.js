const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    product_name:String,
    brand:String,
    price:Number,

})

module.exports=mongoose.model('Product',productSchema);
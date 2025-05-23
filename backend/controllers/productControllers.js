const Product=require('../models/Product')

const getProduct=async(req,res)=>{
    const products=await Product.find()
    res.status(200).json(products)
}

const createProduct=async(req,res)=>{
    const data=new Product(req.body);
    await data.save();
    res.status(201).json(data)

}


const updateProduct=async(req,res)=>{
    const productId=req.params.id;
    const updateData=req.body;
    const updatedProduct=await Product.findByIdAndUpdate(productId,updateData);
    res.status(200).json(updatedProduct)
}

const deleteProduct=async(req,res)=>{
    const productId=req.params.id;
    const deleteProduct=await Product.findByIdAndDelete(productId);
    res.status(200).json(deleteProduct)
}


module.exports={
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}


// {201 Meaning: A new resource was successfully created}
// {202 Meaning: The request was successful}
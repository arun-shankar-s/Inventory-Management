import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/ProductList.css'
import Footer from './Footer';
import {
    getProducts,
    deleteProduct,
    updateProduct,
    createProduct,
  } from '../services/api';

const ProductList=()=>{

    const[products,setProducts]=useState([])
    const [formData, setFormData] = useState({ product_name: '', brand: '', price: '' });
    const [editingId,setEditingId]=useState(null);
    const fetchProducts = () => {getProducts().then((res) => setProducts(res.data));};

    useEffect(() => {fetchProducts();}, []);

    const handleDelete = (id) => {deleteProduct(id).then(()=>{
        fetchProducts();
        toast.success("Deleted from Inventory");
    }).catch(()=>{
        toast.error("Failed to delete");
    })
    };



    const handleEdit = (product) => {
        setFormData({
          product_name: product.product_name,
          brand: product.brand,
          price: product.price,
        });
        setEditingId(product._id)
      };

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit=(e)=>{
        e.preventDefault();
        if(editingId){
            updateProduct(editingId,formData).then(()=>{
                fetchProducts();
                toast.success("Updated Successfully");
                setEditingId(null)
            }).catch(()=>{
                toast.error("Failed to update");
                setEditingId(null)
            })
            
            
        }
        else{
            createProduct(formData).then(()=>{
                fetchProducts();
                toast.success("Added to Inventory");
            }).catch(()=>{
                toast.error("Failed to add");
            })
            
        }
        
        setFormData({ product_name: '', brand: '', price: ''})
      }

      
    

      


    return(
        <div className="container">
            <h2 className="header">Inventory Management</h2>

            <form className='product-form' onSubmit={handleSubmit}>
                <input type="text" placeholder="Product Name" value={formData.product_name}  name="product_name" onChange={handleChange}></input>
                <input type="text" placeholder="Brand" value={formData.brand}  name="brand" onChange={handleChange}></input>
                <input type="Number" placeholder="Price" value={formData.price}  name="price" onChange={handleChange}></input>
                <button type="submit">{editingId ? 'Update Product' : 'Add Product'}</button>
            </form>


            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p)=>(
                        <tr key={p.id}>
                            <td>{p.product_name}</td>
                            <td>{p.brand}</td>
                            <td>{p.price}</td>
                            <td><button className='btn1' onClick={() => handleEdit(p)}>Edit</button></td>
                            <td><button className='btn2' onClick={() => handleDelete(p._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer /> 
            <Footer />
        </div>
    )
}

export default ProductList;
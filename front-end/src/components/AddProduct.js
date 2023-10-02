import React from "react";
import {useNavigate} from 'react-router-dom';
import { json } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const addProduct =async () => {
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        console.warn(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product',{
        method:'post',
        body:JSON.stringify({name,price,category,company,userId}),
        headers:{"Content-type":"application/json"}
  });
    result = await result.json();
    if(result){
      navigate('/')
    }
    console.warn(result);
  }
  return (
    <div class="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter your product name"
        className="inputBox"
        value={name} onChange={(e)=>{setName(e.target.value)}}
      />
      {error && !name && <span className="invalid-input">Enter valid name</span>}
      <input
        type="text"
        placeholder="Enter your product price"
        className="inputBox"
        value={price} onChange={(e)=>{setPrice(e.target.value)}}
      />
      {error && !price && <span className="invalid-input">Enter valid price</span>}
      <input
        type="text"
        placeholder="Enter your product category"
        className="inputBox"
        value={category} onChange={(e)=>{setCategory(e.target.value)}}
      />
      {error && !category && <span className="invalid-input">Enter valid category</span>}
      <input
        type="text"
        placeholder="Enter your product company"
        className="inputBox"
        value={company} onChange={(e)=>{setCompany(e.target.value)}}
      />
      {error && !company && <span className="invalid-input">Enter valid company</span>}
      <button onClick={addProduct} type="button" className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;

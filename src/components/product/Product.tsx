import React from 'react';
import { getProduct } from '../../api/index';
import { IProduct } from '../../api/types';
import './Product.scss';
import CategoriesRoute from '../../routes/categories/Categories';
import Product from '../../routes/product/Product';
import  { Redirect } from 'react-router-dom'
import Login from '../../routes/login/Login';

export default function ProductComponent(product: IProduct, key : any) {

  const onclick = (e:any) =>{
    
    console.log(key);
    
    
    return (<Redirect to='/login' exact component={Login}  />)
  }

  return (
    <div className="product" key={key} onClick={onclick}>
      <img src={product.image}></img>
      <p>{product.title}</p>
      <p>{product.price}</p>
      <p>{product.category}</p>
      

    </div>
  );
}


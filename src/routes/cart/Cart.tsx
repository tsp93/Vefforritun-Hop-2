import React, { useState, useEffect } from 'react';
import { getCart } from '../../api';

import './Cart.scss';
import { IProduct, ICart } from '../../api/types';
import ProductComponent from '../../components/product/Product';

export default function Cart() {

  const [ cart, setCart ] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getCart();
      console.log(result);
      setCart(result);
    }
    fetchProduct();
  }, []);

  function CartProduct(p: IProduct){
    return (
      <div key={p.id}>
         <img src={p.image}></img>
         <p>{p.title}</p>
         <p>{p.price} kr.</p>
         <p>{p.category}</p>
         <p> product id(temp): {p.id}</p>
       </div>
       
    )
  }


  function showProductList(mycart:ICart|undefined){
    if(mycart !== undefined){
     let array : any = [];
     for(let i=0; i< cart.products.length;i++){
       const p = {
         id: cart.products[i].id,
         image: cart.products[i].image,
         title: cart.products[i].title,
         price: cart.products[i].price.toString(),
         category: cart.products[i].category.title,
       }
       
       array.push(
         CartProduct(p)
       );
     }
     return array;   
    } 
  }

  function showTotalPrice(c: ICart){
    if(c !== undefined){
      return (
        <p>samtals: {c.total_price}</p>
      )
    }
  }

  return (
    <div>
      { showProductList(cart) }
      { showTotalPrice(cart)  } 
    </div>
    
  );
}
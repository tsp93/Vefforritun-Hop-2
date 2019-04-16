import React, { useState, useEffect } from 'react';
import { getCart, changeLineQuantity } from '../../api';

import './Cart.scss';
import { IProduct, ICart } from '../../api/types';
import ProductComponent from '../../components/product/Product';
import PropTypes from 'prop-types';


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

  function CartProduct(props: any){
    
    const [fjoldi, setfjoldi] = useState(props.product.quantity);

    function handleQuantityChange(e: any){
      let target = e.target.value;
      if(target <1){
        return;
      }
      setfjoldi(target);
    }

    async function submitChange(e :any){
      e.preventDefault();
      const l =props.product.line;
      console.log(fjoldi);
      
      await changeLineQuantity(l,fjoldi);

      const reload = await getCart();
      setCart(reload);

    }

    return (
      <div key={props.product.id}>
         <img src={props.product.image}></img>
         <p>{props.product.title}</p>
         <p>{props.product.price} kr.</p>
         <p>{props.product.category}</p>
         <p>quantity: {props.product.quantity}</p>
         <p> product id(temp): {props.product.id}</p>
         <form onSubmit={submitChange}>
           <label htmlFor="quantity">Fjöldi: </label>
           <input type="number" name="quantity" value={fjoldi} onChange={handleQuantityChange}></input>
           <button>Uppfæra</button>
         </form>
         <p>samtalt: {props.product.total} </p>
       </div>
       
    )
  }

  CartProduct.propTypes={
    product:    PropTypes.shape({
      id :      PropTypes.number.isRequired,
      image:    PropTypes.string,
      title:    PropTypes.string,
      price:    PropTypes.string,
      category: PropTypes.string,
      quantity: PropTypes.number,
      line:     PropTypes.number,
      total:    PropTypes.number,
    
    }),
  }


  function showProductList(mycart:ICart|undefined){
    if(mycart !== undefined){
     let array : any = [];
     for(let i=0; i< mycart.products.length;i++){
       const p = {
         id:        mycart.products[i].id,
         image:     mycart.products[i].image,
         title:     mycart.products[i].title,
         price:     mycart.products[i].price.toString(),
         category:  mycart.products[i].category.title,
         quantity:  mycart.products[i].quantity,
         line:      mycart.products[i].line,
         total:     mycart.products[i].total,
       }
       
       array.push(
         <CartProduct product={p} key={i}/>
       );
     }
     return array;   
    } 
  }

  function showTotalPrice(c: ICart){
    if(c !== undefined){
      return (
        <h2>Karfa samtals: {c.total_price}</h2>
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
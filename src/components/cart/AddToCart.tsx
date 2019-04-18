import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addToCart, getCart } from '../../api/index';
import { ifError } from 'assert';
import { IError } from '../../api/types';

import './Cart.scss';


export default function AddToCart(id: any){

  //const [quantity, setQuantity] = useState(0);

  let quantity =0;
  let errors : IError[] = [];

  async function orderProduct(e: any){
    e.preventDefault();
    console.log('orderProduct');
    console.log(quantity);

    const result =  await addToCart(id, quantity);
    console.log(result);
    errors= result;
  }
 
  function onChangeQuantity(e: any){
    let target = e.target.value;
    quantity = target;
   // setQuantity(target);
  }

  function showErrors(err: IError[]){
    let array =[];
    for(let i=0; i<err.length; i++){
      array.push(<p>{err[i].message}</p>);
    }
    return array;
  }


  const token = localStorage.getItem('myToken');
  if(token){
    return (
      <div className="addToCart__container">
        
        <form onSubmit={orderProduct}>
          <label>Fjöldi: </label>
          <input type="number" onChange={onChangeQuantity}></input>
          <button>setja í körfu</button>
        </form>
        {showErrors(errors)}
        
      </div>
    )
  }
}
/*
AddToCart.propTypes={
  id :      PropTypes.number.isRequired,

}*/
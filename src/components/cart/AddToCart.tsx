import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { postCart } from '../../api/index';


export default function AddToCart(id: number){

  //const [quantity, setQuantity] = useState();
  let quantity=0;

  async function orderProduct(e: any){
    e.preventDefault();
    console.log('orderProduct');
    console.log(quantity);

    await postCart(id, quantity);
  }
 
  function onChangeQuantity(e: any){
    let target = e.target.value;
    quantity= target;
  }


  const token = localStorage.getItem('myToken');
  if(token){
    return (
      <div>
        
        <form onSubmit={orderProduct}>
          <label>Fjöldi: </label>
          <input type="number" onChange={onChangeQuantity}></input>
          <button>setja í körfu</button>
        </form>
        
      </div>
    )
  }
}

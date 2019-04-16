import React, { useState } from 'react';
import PropTypes from 'prop-types';


export default function AddToCart(props: any){

  //const [quantity, setQuantity] = useState();

  function onChangeQuantity(e: any){
    let target = e.target.value;
  }


  const token = localStorage.getItem('myToken');
  if(token){
    return (
      <div>
        <form>
          <label>Fjöldi: </label>
          <input type="number" ></input>
          <button>setja í körfu</button>
        </form>
        
      </div>
    )
  }
}


import React from 'react';

import './Product.scss';
import  { Link } from 'react-router-dom'
import { IProduct } from '../../api/types';

export default function Product(props : IProduct) {

  function showProd(){
    return (
    <div>
      <img src={props.image}></img>
      <p>{props.title}</p>
      <p>{props.price} kr.</p>
      <p>{props.category}</p>
      <p> product id(temp): {props.id}</p>
    </div>)
  }

  return (
    <div className="product">
      <Link to={`/product/"${props.id}`}>{showProd()}</Link>
    </div>
  );
}

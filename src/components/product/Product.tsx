import React from 'react';
import { getProduct } from '../../api/index';
import { IProduct } from '../../api/types';
import './Product.scss';

export default function ProductComponent(product: IProduct) {

  return (
    <div className="product">
      <img src={product.image}></img>
      <p>{product.title}</p>
      <p>{product.price}</p>
      <p>{product.category}</p>

    </div>
  );
}


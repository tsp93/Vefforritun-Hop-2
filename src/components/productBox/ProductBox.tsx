import React from 'react';
import  { Link } from 'react-router-dom'

import { IProduct } from '../../api/types';

import './ProductBox.scss';

export default function ProductBox(props : IProduct) {
  const { id, image, title, category, price } = props;

  return (
    <Link to={`/product/${id}`} className="productBox">
      <div className="productImg">
        <img src={image}></img>
      </div>
      <div className="productInfo">
        <div className="productTitCat">
          <h3>{title}</h3>
          <p>{category.title}</p>
        </div>
        <p className="productPri">{price} kr.</p>
      </div>
    </Link>
  );
}

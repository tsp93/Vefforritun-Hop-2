import React from 'react';

import { IProduct } from '../../api/types';

import './Product.scss';

export default function Product(props : IProduct) {
  const { image, title, description, category, price } = props;

  return (
    <div className="product">
      <div className="productImg">
        <img src={image}></img>
      </div>
      <div className="productInfo">
        <h3>{title}</h3>
        <div className="productTitPri">
          <p>Flokkur: {category.title}</p>
          <p className="productPri">Verð: {price} kr.</p>
        </div>
        <p className="productDes">{description}</p>
      </div>
    </div>
  );
}

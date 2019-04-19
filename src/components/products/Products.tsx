import React from 'react';

import { IProduct } from '../../api/types';

import ProductBox from '../productBox/ProductBox';

import './Products.scss';

export default function Products(props : any) {
  const { products } = props;

  // Birtir vörur
  function showProducts(prod : IProduct[]) {
    const array : any = [];
    for(let i = 0; i < prod.length; i += 1){
      array.push(
        <ProductBox
          key={i}
          id={prod[i].id}
          title={prod[i].title}
          price={prod[i].price}
          image={prod[i].image}
          category={prod[i].category}
        />
      );
    }
    return array;   
  }

  return (
    <div className="products">
      {showProducts(products)}
    </div>
  );
}

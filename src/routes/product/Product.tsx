import React, { Fragment } from 'react';
import Products from '../../components/products/Products';

export default function Product() {

  const element = (<p>hello</p>);
  
  return (
    <div>
    <p> Products </p>
    
    { Products() }

    </div>
    
  );
}

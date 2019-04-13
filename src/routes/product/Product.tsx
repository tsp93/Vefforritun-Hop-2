import React, { Fragment, useEffect, useState } from 'react';
import { getProduct } from '../../api';
import { IProduct } from '../../api/types';
import ProductComponent from '../../components/product/Product';

export default function Product(props:any) {
  const { id } = props.match.params;
  const [ product, setProduct ] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getProduct(id);
      setProduct(result);
    }
    fetchProduct();
  }, []);

  
  function showProduct(prod:IProduct|undefined){
    if(prod !== undefined){
      return (
        <div>
          <img src={product.image}></img>
          <p>{product.title}</p>
          <p>{product.price}</p>
          <p>{product.category}</p>
        </div>
      
      )
    } else {
      return(
        <div>
          <p>Vara fannst ekki </p>
        </div>
      );
    }
  }

  return (
    <div>
      {showProduct(product)}
    </div>
  );
}


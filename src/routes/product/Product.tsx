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

  
  function und(prod:IProduct|undefined){
    if(prod !== undefined){
      return ProductComponent(prod,prod.id);
    } else {
      return '';
    }
  }

  return (
    <div>
      {und(product)}
    </div>
  );
}


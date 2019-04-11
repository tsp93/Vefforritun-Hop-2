import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { getProduct, getAllProducts } from '../../api';

import './Home.scss';
import ProductComponent from '../../components/product/Product';
import { IProduct } from '../../api/types';

export default function Home() {

  const [ products, setProducts ] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getAllProducts();
      setProducts(result);
    }
    fetchProduct();
  }, []);

  function showProductList(prod:IProduct[]|undefined){
    if(prod !== undefined){
     return (
       <div>
        { ProductComponent(prod[3]) } 
        { ProductComponent(prod[4]) }
       </div>
       
     ) 

       
    } else {
      return '';
    }
  }

  console.log(products);
  return (
    <Fragment>
      <Helmet title="Forsíða" />
       {showProductList(products) }
    </Fragment>
  );
}
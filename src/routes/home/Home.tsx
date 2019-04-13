import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { getProduct, getAllProducts } from '../../api';

import './Home.scss';
import ProductComponent from '../../components/product/Product';
import { IProduct } from '../../api/types';
import Search from '../../components/search/Search';

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
     let array : any = [];
     for(let i=0; i<prod.length;i++){
       array.push(
         ProductComponent(prod[i],prod[i].id) 
       );
     }
     return array;   
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
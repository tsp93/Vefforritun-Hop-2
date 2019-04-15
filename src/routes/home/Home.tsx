import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { getProduct, getAllProducts } from '../../api';
import  { Redirect,NavLink } from 'react-router-dom';

import './Home.scss';
import ProductComponent from '../../components/product/Product';
import { IProduct } from '../../api/types';
import Search from '../../components/search/Search';
import CategoriesRoute from '../categories/Categories';

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
       const p = {
         id: prod[i].id,
         image: prod[i].image,
         title: prod[i].title,
         price: prod[i].price.toString(),
         category: prod[i].category.title,
       }
       
       array.push(
         <ProductComponent key= {i} product={p} /> 
       );
     }
     return array;   
    } 
  }

 
  return (
    <Fragment>
      <Helmet title="Forsíða" />
       {showProductList(products) }
     <br/>
     <button>
       <NavLink to="/categories">skoða alla flokka</NavLink>
     </button>
     
      <CategoriesRoute/> 

    </Fragment>
  );
}
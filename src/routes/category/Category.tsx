import React, { useEffect, useState, Fragment } from 'react';
import Helmet from 'react-helmet';

import { getProductsInCat } from '../../api';
import { IProduct } from '../../api/types';
import ProductComponent from '../../components/product/Product';

export default function Category(props: any) {

  const [loading , setloading] = useState(true);
  const { id } = props.match.params;
  const [ products, setProducts ] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      setloading(false);
      const result = await getProductsInCat(id);
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
         <ProductComponent
         key= {i}
         product={p}
         /> 
       );
     }
     return array;   
    } 
  }

  function showState(l : Boolean){
    if(l){
      return (
        <p>sæki gögn...</p>
      )
    }
  }



  return (
    <Fragment>
      <Helmet title="Flokkur" />
        {showState(loading)}

        {showProductList(products) }
        <button>fyrrverandi síða</button>
        <button>næsta síða</button>

    </Fragment>
  )
}

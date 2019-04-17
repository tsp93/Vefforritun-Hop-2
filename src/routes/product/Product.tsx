import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getProduct } from '../../api';
import { IProduct } from '../../api/types';
import ProductComponent from '../../components/product/Product';
import AddToCart from '../../components/cart/AddToCart';



export default function Product(props:any) {

  const { id } = props.match.params;
  const [ product, setProduct ] = useState();
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getProduct(id);
      setProduct(result);
      setLoading(false);

    }
    fetchProduct();
  }, []);
  
  function showProduct(prod:IProduct){
    
    if(loading){
      return (<p>loading...</p>)
    }
    else{
      if(prod !== undefined){ 
         
        return (
          <div>
            <img src={prod.image}></img>
            <h1>{prod.title}</h1>
            <p>Verð:{prod.price}</p>
            <p>Flokkur: {prod.category}</p>
            <p>{prod.description}</p>
            <p>{prod.id}</p>
            {AddToCart(prod.id)}
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
    
  }

  return (
    <div>
      {showProduct(product)}
    </div>
  );
}




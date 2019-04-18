import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getProduct } from '../../api';
import { IProduct } from '../../api/types';
import ProductComponent from '../../components/product/Product';
import AddToCart from '../../components/cart/AddToCart';

import './Product.scss';
import Category from '../category/Category';

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
          <div className="product__page">
            <div className="product__image">
              <img src={prod.image}></img>
            </div>
            <div className="product__info">
              <h1>{prod.title}</h1>
              <p className="priduct__info--price">Verð:{prod.price}</p>
              <p>Flokkur: {prod.category.title}</p>
              <p>{prod.description}</p>
              {AddToCart(prod.id)}
            </div>
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




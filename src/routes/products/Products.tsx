import React, { Fragment, useEffect, useState } from 'react';

import { getProducts } from '../../api';
import { IProduct } from '../../api/types';

import ProductBox from '../../components/productBox/ProductBox';

import './Products.scss';

export default function Products(props : any) {
  const { offset, limit, category, search } = props;

  const [ products, setProducts ] = useState();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getProducts(offset, limit, category, search);
      setProducts(result);
      setLoading(false);
    }
    fetchProduct();
  }, []);
  
  function showProductList(prod : IProduct[] | undefined) {
    if (prod !== undefined) {
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
  }

  return (
    <Fragment>
      {loading && (
        <p>Loading...</p>
      )}
      {!loading && (
        <div className="productList">
          {showProductList(products)}
        </div>
      )}
    </Fragment>
  );
}



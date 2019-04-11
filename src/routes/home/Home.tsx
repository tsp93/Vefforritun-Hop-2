import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { getProduct, getAllProducts } from '../../api';

import './Home.scss';
import ProductComponent from '../../components/product/Product';
import { IProduct } from '../../api/types';

export default function Home() {

  const [ product, setProduct ] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getAllProducts();
      setProduct(result);
    }
    fetchProduct();
  }, []);

  function und(prod:IProduct|undefined){
    if(prod !== undefined){
      return ProductComponent(prod);
    } else {
      return '';
    }
  }


  return (
    <Fragment>
      <Helmet title="Forsíða" />
      {und(product)}
    </Fragment>
  );
}
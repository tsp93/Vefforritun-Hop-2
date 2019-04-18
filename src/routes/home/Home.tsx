import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import  { Link } from 'react-router-dom';

import CategoriesRoute from '../categories/Categories';
import ProductsRoute from '../products/Products';

import './Home.scss';

export default function Home() {
 
  return (
    <Fragment>
      <Helmet title="Forsíða" />
      <ProductsRoute/>
      
     <button>
       <Link to="/categories">skoða alla flokka</Link>
     </button>
     
      <CategoriesRoute/> 

    </Fragment>
  );
}
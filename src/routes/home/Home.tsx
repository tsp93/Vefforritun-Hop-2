import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom'

import Button from '../../components/button/Button';

import Categories from '../categories/Categories';
import Products from '../products/Products';

import './Home.scss';

export default function Home() {
 
  return (
    <Fragment>
      <Helmet title="Forsíða" />

      <h1>Nýjar vörur</h1>
      <Products
        limit={6}
      />
      
      <Link to={`/categories`}>
        <Button
          className={'categoryButton'}
          children={'Skoða alla flokka'}
        />
      </Link>
     
      <Categories /> 

    </Fragment>
  );
}
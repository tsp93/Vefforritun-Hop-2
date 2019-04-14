import React, { Component } from 'react';
import { getProduct } from '../../api/index';
import { IProduct } from '../../api/types';
import PropTypes from 'prop-types';

import './Product.scss';
import CategoriesRoute from '../../routes/categories/Categories';
import Product from '../../routes/product/Product';
import  { Redirect,NavLink } from 'react-router-dom'
import Login from '../../routes/login/Login';
import { prototype } from 'stream';

export default function ProductComponent(props : any) {

  const handleClick = (e: any) =>{
    console.log(props.product.category);
    //return (<Redirect exact to ="/cart">)
  }

  function showProd(){
    return (
    <div>
      <img src={props.product.image}></img>
      <p>{props.product.title}</p>
      <p>{props.product.price} kr.</p>
      <p>{props.product.category}</p>
    </div>)
  }

  return (
    <div className="product">
      
      <NavLink to={"/product/"+props.product.id }>{showProd()}</NavLink>
    </div>
  );
}

ProductComponent.propTypes = {
  product: PropTypes.shape({
    id : PropTypes.number.isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
    category: PropTypes.string,
    
  }),

}


/*
class ProductComponent extends Component{
  
  static propTypes = {
    image : PropTypes.string,
    title : PropTypes.string,
    price : PropTypes.string,
    category: PropTypes.string,
  }
  
  
  render(){
    return (
      <div className="product" >
        <img src={this.props.image}></img>
        <p>{this.props.title}</p>
        <p>{this.props.price}</p>
        <p>{this.props.category}</p>
        
  
      </div>
    );
  }
}

export default ProductComponent;
*/
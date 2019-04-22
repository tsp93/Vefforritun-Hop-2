import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import { getCart, changeLineQuantity, deleteLine, postOrders } from '../../api';
import { IProduct } from '../../api/types';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Errors from '../../components/errors/Errors';
import CartLines from '../../components/cart/Cart';

import NotFound from '../system-pages/NotFound';

import './Cart.scss';

export default function Cart() {

  const [ cart, setCart ] = useState();
  const [ nameAddress, setNameAddress ] = useState({ name: '', address: '' });

  const [ submitCartSuccess, setSubmitCartSuccess ] = useState(false);
  const [ errors, setErrors ] = useState();

  const [ notFound, setNotFound ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const cartResult = await getCart();
      if (cartResult.hasOwnProperty('error')) { 
        setNotFound(true);
      } else {
        setCart(cartResult);
      }
      setLoading(false);
    }
    fetchProduct();
  }, []);

  function onChangeNameAddress(e : any) {
    setNameAddress({
      ...nameAddress,
      [e.target.name]: e.target.value,
    });
  }


  async function onDeleteLine() {
    const cartResult = await getCart();
    setCart(cartResult);
  }

  async function onSubmitCart(e : any) {
    e.preventDefault();
    const { name, address } = nameAddress;
    const result = await postOrders(name, address);
  
    if (result.length !== 0) {
      setErrors(result);
    } else {
      setSubmitCartSuccess(true);
    }
  }

  return (
    <Fragment>
      {submitCartSuccess && (
        <Redirect to='/orders' />
      )}
      {notFound && (
        <NotFound />
      )}
      {(loading && !notFound) && (
        <p>Loading...</p>
      )}
      {(!loading && !notFound) && (
        <Fragment>
          <CartLines
            lines={cart.lines}
            onDeleteLine={onDeleteLine}
          />
          <p className="cartTotal">Karfa samtals: {cart.totalPrice} kr.</p>
          <form onSubmit={onSubmitCart} className="cartSubmit">
            <h2>Senda inn pöntun</h2>
            {errors != null && (
              <Errors
                errors={errors}
              />
            )}
            <Input
              label={'Nafn:'}
              name={'name'}
              value={nameAddress.name}
              onChange={onChangeNameAddress}
            />
            <Input
              label={'Heimilisfang:'}
              name={'address'}
              value={nameAddress.address}
              onChange={onChangeNameAddress}
            />
            <Button
              className={'cartSubmitButton'}
              children={'Senda Inn Pöntun'}
            />
          </form>
        </Fragment>
      )}
    </Fragment>
  );
}
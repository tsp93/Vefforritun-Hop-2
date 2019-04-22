import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import { getCart, changeLineQuantity, postOrders } from '../../api';
import { ICart, IProduct } from '../../api/types';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Errors from '../../components/errors/Errors';
import CartLines from '../../components/cart/Cart';

import NotFound from '../system-pages/NotFound';

import './Cart.scss';

export default function Cart() {

  const [ cart, setCart ] = useState();
  const [ nameAddress, setNameAddress ] = useState({ name: '', address: '' });
  const [ quantities, setQuantities ] = useState<number[]>([]);

  const [ submitCartSuccess, setSubmitCartSuccess ] = useState(false);
  const [ errors, setErrors ] = useState();

  const [ notFound, setNotFound ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const cartResult = await getCart();
      console.log(cartResult);
      if (cartResult.hasOwnProperty('error')) { 
        setNotFound(true);
      } else {
        setCart(cartResult);
        const quant : number [] = [];
        cartResult.lines.forEach((line : IProduct) => {
          quant.push(line.quantity ? line.quantity : 0);
        });
        setQuantities(quant);
      }
      setLoading(false);
    }
    fetchProduct();
  }, []);

  function onChangeQuantity(e : any) {
    const quant = quantities;
    const index = parseInt(e.target.name[e.target.name.length - 1]);
    quant[index] = parseInt(e.target.value);
    
    setQuantities(quant);
  }

  function onChangeNameAddress(e : any) {
    setNameAddress({
      ...nameAddress,
      [e.target.name]: e.target.value,
    });
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
            quantities={quantities}
            onChange={onChangeQuantity}
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
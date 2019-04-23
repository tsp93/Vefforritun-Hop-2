import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import { getCart, postOrders, getCurrentUser } from '../../api';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Errors from '../../components/errors/Errors';
import CartLines from '../../components/cart/Cart';

import './Cart.scss';

export default function Cart() {

  const [ cart, setCart ] = useState();
  const [ nameAddress, setNameAddress ] = useState({ name: '', address: '' });

  const [ submitCartSuccess, setSubmitCartSuccess ] = useState(false);
  const [ errors, setErrors ] = useState();

  const [ loggedIn, setLoggedIn ] = useState(true);
  const [ noCart, setNoCart ] = useState(false);

  const [ ordering, setOrdering ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const userResult = await getCurrentUser();
      if (userResult.hasOwnProperty('error')) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      const cartResult = await getCart();
      if (cartResult.hasOwnProperty('error') || cartResult.lines.length === 0) { 
        setNoCart(true);
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
    if (cartResult.lines.length === 0) { 
      setNoCart(true);
    }
  }

  async function onSubmitCart(e : any) {
    e.preventDefault();
    setOrdering(true);
    const { name, address } = nameAddress;
    const result = await postOrders(name, address);
  
    if (result.length !== 0) {
      setErrors(result);
    } else {
      setSubmitCartSuccess(true);
    }
    setOrdering(false);
  }

  return (
    <Fragment>
      {(!loggedIn && !loading) && (
        <Redirect to='/login' />
      )}
      {(noCart && !loading && loggedIn) && (
        <p className="noCart">Karfan þín er tóm</p>
      )}
      {(loading && !noCart && loggedIn) && (
        <p>Loading...</p>
      )}
      {(!loading && !noCart && loggedIn) && (
        <Fragment>
          <CartLines
            lines={cart.lines}
            onDeleteLine={onDeleteLine}
          />
          <p className="cartTotal">Karfa samtals: {cart.totalPrice} kr.</p>
          <form onSubmit={onSubmitCart} className="cartSubmit">
            <h2>Senda inn pöntun</h2>
            {submitCartSuccess && !ordering && (
              <p className="cartOrderMessage">Pöntun tókst!</p>
            )}
            {!submitCartSuccess && ordering && (
              <p className="cartOrderMessage">Sendi inn pöntun...</p>
            )}
            {!submitCartSuccess && !ordering && (
              <Fragment>
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
              </Fragment>
            )}
          </form>
        </Fragment>
      )}
    </Fragment>
  );
}
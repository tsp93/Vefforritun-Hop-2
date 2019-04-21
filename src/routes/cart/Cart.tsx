import React, { useState, useEffect, Fragment } from 'react';


import { getCart, changeLineQuantity } from '../../api';
import { ICart } from '../../api/types';

import CartLines from '../../components/cart/Cart';
import makeOrder from '../../components/makeOrder/makeOrder';

import './Cart.scss';
import Input from '../../components/input/Input';

export default function Cart() {

  const [ cart, setCart ] = useState();
  const [ nameAddress, setNameAddress ] = useState({ name: '', address: '' });

  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const cartResult = await getCart();
      setCart(cartResult);
      console.log(cartResult);
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

  function onSubmitCart() {

  }

  return (
    <Fragment>
      {loading && (
        <p>Loading...</p>
      )}
      {!loading && (
        <Fragment>
          <CartLines
            lines={cart.products}
          />
          <p className="cartTotal">Karfa samtals: {cart.totalPrice} kr.</p>
          <form onSubmit={onSubmitCart} className="cartSubmit">
            <h2>Senda inn pöntun</h2>
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
          
          </form>
        </Fragment>
      )}
    </Fragment>
  );
}
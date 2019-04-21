import React, { useState, useEffect, Fragment } from 'react';


import { getCart, changeLineQuantity } from '../../api';
import { ICart, IProduct } from '../../api/types';

import CartLines from '../../components/cart/Cart';
import makeOrder from '../../components/makeOrder/makeOrder';

import './Cart.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

export default function Cart() {
  const [ cart, setCart ] = useState();
  const [ nameAddress, setNameAddress ] = useState({ name: '', address: '' });
  const [ quantities, setQuantities ] = useState<number[]>([]);

  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const cartResult = await getCart();
      setCart(cartResult);
      const quant : number [] = [];
      cartResult.products.forEach((line : IProduct) => {
        quant.push(line.quantity ? line.quantity : 0);
      });
      setQuantities(quant);
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
            quantities={quantities}
            onChange={onChangeQuantity}
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
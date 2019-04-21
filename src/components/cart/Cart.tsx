import React from 'react';

import { IProduct } from '../../api/types';

import Input from '../input/Input';
import Button from '../button/Button';

import './Cart.scss';

export default function Cart(props : any) {
  const { lines, onChange, updateLine, deleteLine } = props;
  
  function showCartItems(lines : IProduct[]) {
    const array : any = [];
    let key = 0;
    lines.forEach(line => {
      array.push(
        <div className="cartLine" key={key++}>
          <div className="cartLineImage">
            <img src={line.image}></img>
          </div>
          <div className="cartLineInfo">
            <h1 className="cartLineInfoTitle">{line.title}</h1>
            <p className="cartLineInfoPrice">Verð: {line.price} kr.</p>
          </div>
          <div className="cartLineManagement">
            <div className="cartLineManagementQuantity">
              <Input
                label={'Fjöldi:'}
                name={'amount'}
                value={line.quantity ? line.quantity.toString() : ''}
                onChange={onChange}
                type={'number'}
                small={true}
              />
              <Button
                children={'Uppfæra'}
                onClick={updateLine}
                small={true}
              />
            </div>
            <p className="cartLineManagementTotalPrice">Samtals: {line.price} kr.</p>
            <Button
              className={'cartLineManagementDeleteButton'}
              children={'Eyða Línu'}
              onClick={deleteLine}
              small={true}
            />
          </div>
        </div>
      )
    });
    return array;
  }

  return (
    <div className="cartLines">
      {showCartItems(lines)}
    </div>
  );

  
}
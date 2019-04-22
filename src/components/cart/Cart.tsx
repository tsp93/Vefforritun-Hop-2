import React from 'react';
import { Link } from 'react-router-dom';

import { IProduct } from '../../api/types';

import Input from '../input/Input';
import Button from '../button/Button';

import './Cart.scss';

export default function Cart(props : any) {
  const { lines, quantities, onChange, updateLine, deleteLine } = props;
  
  function showCartItems(lines : IProduct[]) {
    const array : any = [];
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      array.push(
        <div className="cartLine" key={i}>
          <div className="cartLineImage">
            <img src={line.image}></img>
          </div>
          <div className="cartLineInfo">
            <h2><Link className="cartLineInfoTitle" to={`/product/${line.id}`}>{line.title}</Link></h2>
            <p className="cartLineInfoPrice">Verð: {line.price} kr.</p>
          </div>
          <div className="cartLineManagement">
            <div className="cartLineManagementQuantity">
              <Input
                label={'Fjöldi:'}
                name={`amount${i}`}
                value={quantities[i]}
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
            <p className="cartLineManagementTotalPrice">Samtals: {line.total} kr.</p>
            <Button
              className={'cartLineManagementDeleteButton'}
              children={'Eyða Línu'}
              onClick={deleteLine}
              small={true}
            />
          </div>
        </div>
      )
    }

      
    return array;
  }

  return (
    <div className="cartLines">
      {showCartItems(lines)}
    </div>
  );

  
}
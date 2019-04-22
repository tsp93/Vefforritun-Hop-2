import React from 'react';

import { IProduct } from '../../api/types';

import CartLine from '../cartLine/CartLine';

import './Cart.scss';

export default function CartLines(props : any) {
  const { lines, onDeleteLine } = props;
  
  function showCartItems(lines : IProduct[]) {
    const array : any = [];
    for (let i = 0; i < lines.length; i += 1) {
      array.push(
        <CartLine
          key={i}
          line={lines[i]}
          onDeleteLine={onDeleteLine}
        />
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
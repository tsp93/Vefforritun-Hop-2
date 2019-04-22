import React, { Fragment } from 'react';

import { IOrder, IProduct } from '../../api/types';

import './Order.scss';

export default function Order(props : IOrder) {
  const { id, name, address, created, lines, total } = props;

  function showLines(lines : IProduct[]) {
    const array = [];
    for (let i = 0; i < lines.length; i += 1) {
      array.push(
        <tr key={i}>
          <td>{lines[i].title}</td>
          <td>{lines[i].price} kr.</td>
          <td>{lines[i].quantity}</td>
          <td>{lines[i].total} kr.</td>
        </tr>
      );
    }
    return array;
  }

  return (
    <Fragment>
      <div className="orderInfo">
        <div className="orderInfoLeft">
          <p>Nafn</p>
          <p>Heimilisfang</p>
          <p>Búin til</p>
        </div>
        <div className="orderInfoRight">
          <p>{name}</p>
          <p>{address}</p>
          <p>{created}</p>
        </div>
      </div>
      <table className="orderTable">
        <thead>
          <tr>
            <th>Vara</th>
            <th>Verð</th>
            <th>Fjöldi</th>
            <th>Samtals</th>
          </tr>
        </thead>
        <tbody>
          {showLines(lines)}
        </tbody>
      </table>
      <p className="orderTotal">{total} kr.</p>
    </Fragment>
    );
}
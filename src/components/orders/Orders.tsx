import React from 'react';

import { IOrder } from '../../api/types';

import './Orders.scss';

export default function Orders(props : any) {
  const { orders } = props;

  function showOrders(orders : IOrder[]) {
    const array = [];
    for (let i = 0; i < orders.length; i += 1) {
      array.push(
        <tr key={i}>
          <td>Pöntun #{orders[i].id}</td>
          <td>{orders[i].name}</td>
          <td>{orders[i].address}</td>
          <td>{orders[i].created}</td>
        </tr>
      );
    }
    return array;
  }

  return (
    <table className="orderList">
      <thead>
        <tr>
          <th>Pöntun</th>
          <th>Nafn</th>
          <th>Heimilisfang</th>
          <th>Búin til</th>
        </tr>
      </thead>
      <tbody>
        {showOrders(orders)}
      </tbody>
    </table>
  );
}
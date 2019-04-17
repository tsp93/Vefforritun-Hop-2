import React, { useState, useEffect } from 'react';

import './Orders.scss';
import { getOrders } from '../../api';
import { IOrder } from '../../api/types';

export default function Orders() {

  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getOrders();
      setOrders(result);
      console.log(result);
    }
    fetchProduct();
  }, []);

  function showOrders(orders : IOrder[]){
    if(orders !== undefined){
      let array = [];
    for(let i =0; i<orders.length; i++){
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
    

  }



  return (
    
      <table>
        <thead>
          <tr>
            <th>Pöntun</th>
            <th>Nafn</th>
            <th>heimilisfang</th>
            <th>Búin til</th>
            </tr>
        </thead>
        <tbody>
          {showOrders(orders)}
        </tbody>
      </table>

    
    )
}

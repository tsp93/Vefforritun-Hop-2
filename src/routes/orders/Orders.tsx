import React, { useState, useEffect, Fragment } from 'react';

import { getOrders } from '../../api';

import OrderList from '../../components/orders/Orders';

import './Orders.scss';

export default function Orders() {

  const [ orders, setOrders ] = useState();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getOrders();
      setOrders(result);
      setLoading(false);
    }
    fetchProduct();
  }, []);

  return (
    <div className="orders">
      <h1 className="ordersTitle">Þínar pantanir</h1>
      {loading && (
        <p>Loading...</p>
      )}
      {!loading && (
        <OrderList 
          orders={orders}
        />
      )}
    </div>
    );
}

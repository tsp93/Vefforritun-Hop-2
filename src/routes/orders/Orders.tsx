import React, { useState, useEffect, Fragment } from 'react';

import { getOrders, getCurrentUser } from '../../api';

import OrderList from '../../components/orders/Orders';

import NoAccess from '../system-pages/NoAccess';

import './Orders.scss';

export default function Orders() {

  const [ orders, setOrders ] = useState();
  const [ loggedIn, setLoggedIn ] = useState(true);

  const [ loadingOrders, setLoadingOrders ] = useState(true);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const userResult = await getCurrentUser();
      if (userResult.hasOwnProperty('error')) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }
      setLoading(false);

      const ordersResult = await getOrders();
      setOrders(ordersResult);
      setLoadingOrders(false);
    }
    fetchProduct();
  }, []);

  return (
    <Fragment>
      {loggedIn && loading && (
        <p>Loading...</p>
      )}
      {(!loggedIn && !loading) && (
        <NoAccess />
      )}
      {(loggedIn && !loading) && (
        <div className="orders">
          <h1 className="ordersTitle">Þínar pantanir</h1>
          {loadingOrders && (
            <p>Sæki pantanir...</p>
          )}
          {!loadingOrders && (
            <OrderList 
              orders={orders}
            />
          )}
        </div>
      )}
    </Fragment>
  );
}

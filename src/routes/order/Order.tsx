import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { getOrder } from '../../api';

import OrderComponent from '../../components/order/Order';

import NotFound from '../system-pages/NotFound';

import './Order.scss';

export default function Order(props : any) {
  const { id } = props.match.params;

  const [ order, setOrder ] = useState();
  const [ loading, setLoading ] = useState(true);
  const [ notFound, setNotFound ] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getOrder(id);
      if (result.error) {
        setNotFound(true);
      } else {
        setOrder(result);
      }
      setLoading(false);
    }
    fetchProduct();
  }, []);

  return (
    <Fragment>
      {notFound && (
        <NotFound />
      )}
      {(loading && !notFound) && (
        <p>Loading...</p>
      )}
      {(!loading && !notFound) && (
        <Fragment>
          <Helmet title="Pöntun" />
          <div className="order">
            <h1 className="orderName">Pöntun #{order.id}</h1>
            <OrderComponent
              id={order.id}
              name={order.name}
              address={order.address}
              created={order.created}
              lines={order.lines}
              total={order.total}
            />
            <Link className="orderLinkToOrders" to="/orders">Aftur í pantanir</Link>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

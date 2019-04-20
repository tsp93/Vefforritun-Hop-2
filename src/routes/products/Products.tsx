import React, { Fragment, useEffect, useState } from 'react';

import { getProducts } from '../../api';

import ProductsList from '../../components/products/Products';

import './Products.scss';

export default function Products(props : any) {
  const { offset, limit, category, search } = props;
  const id : number | null = category ? category.id : null;

  const [ products, setProducts ] = useState();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts(offset, limit, id, search);
      setProducts(result);
      setLoading(false);
    }
    fetchProducts();
  }, []);


  return (
    <Fragment>
      {loading && (
        <p>Loading...</p>
      )}
      {!loading && (
        <ProductsList
          products={products}
        />
      )}
    </Fragment>
  );
}




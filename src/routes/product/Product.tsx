import React, { Fragment, useEffect, useState } from 'react';

import { getProduct, getProducts } from '../../api';

import ProductComponent from '../../components/product/Product';
import ProductList from '../../components/products/Products';
import AddToCart from '../../components/cart/AddToCart';

import './Product.scss';

export default function Product(props:any) {
  const { id } = props.match.params;
  const limit = 6;

  const [ product, setProduct ] = useState();
  const [ products, setProducts ] = useState();
  const [ loading , setLoading ] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const productResult = await getProduct(id);
      setProduct(productResult);
      const productsResult = await getProducts(null, limit, productResult.category.id, null);
      setProducts(productsResult);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  return (
    <Fragment>
      {loading && (
        <p>Loading...</p>
      )}
      {(!loading && product.id == null) && (
        <p>Vara fannst ekki</p>
      )}
      {(!loading && product.id != null) && (
        <Fragment>
          <ProductComponent
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            category={product.category}
            price={product.price}
          />

          <h1 className="moreFrom">Meira úr {product.category.title}</h1>
          <ProductList
            products={products}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

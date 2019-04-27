import React, { Fragment, useEffect, useState } from 'react';
import Helmet from 'react-helmet';

import { getProduct, getProducts, getCurrentUser, addToCart } from '../../api';

import ProductComponent from '../../components/product/Product';
import ProductList from '../../components/products/Products';

import NotFound from '../system-pages/NotFound';

import './Product.scss';

export default function Product(props:any) {
  const { id } = props.match.params;
  const limit = 6;

  const [ product, setProduct ] = useState();
  const [ products, setProducts ] = useState();
  const [ productAmount, setProductAmount ] = useState(1);

  const [ loggedIn, setLoggedIn ] = useState();
  const [ added, setAdded ] = useState(false);

  const [ notFound, setNotFound ] = useState(false);
  const [ loading , setLoading ] = useState(true);
  const [ addLoading, setAddLoading ] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const productResult = await getProduct(id);
      if (productResult.id == null) {
        setNotFound(true);
      } else {
        setAdded(false);
        setProduct(productResult);

        const productsResult = await getProducts(null, limit, productResult.category.id, null);
        setProducts(productsResult);

        const userResult = await getCurrentUser();
        setLoggedIn(userResult.username != null);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  function handleProductAmountChange(e : any) {
    setProductAmount(Number.parseInt(e.target.value));
  }

  async function onSubmitAmount() {
    if (productAmount < 1 || !Number.isInteger(productAmount)) {
      return;
    }
    setAdded(true);
    setAddLoading(true);
    await addToCart(product.id, productAmount);
    setAddLoading(false);
  }

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
          <Helmet title={product.title} />
          <ProductComponent
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            category={product.category}
            price={product.price}
            loggedIn={loggedIn}
            productAmount={productAmount}
            onChange={handleProductAmountChange}
            onClick={onSubmitAmount}
            added={added}
            addLoading={addLoading}
          />

          <h1 className="moreFromCat">Meira úr {product.category.title}</h1>
          <ProductList
            products={products}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

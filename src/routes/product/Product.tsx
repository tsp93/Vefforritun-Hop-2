import React, { Fragment, useEffect, useState } from 'react';

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

  const [ loggedIn, setLoggedIn ] = useState();
  const [ added, setAdded ] = useState(false);

  const [ productAmount, setProductAmount ] = useState(1);
  const [ notFound, setNotFound ] = useState(false);
  const [ loading , setLoading ] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const productResult = await getProduct(id);
      console.log(productResult);
      if (productResult.id == null) { 
        setNotFound(true);
      } else {
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
    setProductAmount(e.target.value);
  }

  async function onSubmitAmount() {
    setAdded(true);
    await addToCart(product.id, productAmount);
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

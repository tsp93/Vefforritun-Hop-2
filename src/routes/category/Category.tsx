import React, { useState, useEffect, Fragment } from 'react';
import Helmet from 'react-helmet';

import { getProducts } from '../../api';

import Button from '../../components/button/Button';
import Search from '../../components/search/Search';
import ProductsList from '../../components/products/Products';

import NotFound from '../system-pages/NotFound';

import './Category.scss';

export default function Category(props : any) {
  const { id } = props.match.params;
  const limit = 12;

  const [ products, setProducts ] = useState();
  const [ category, setCategory ] = useState();

  const [ search, setSearch ] = useState('');
  const [ searchNotFound, setSearchNotFound ] = useState(false);
  const [ searchNotFoundText, setsearchNotFoundText ] = useState();

  const [ offset, setOffset ] = useState(0);
  const [ page, setPage ] = useState(1);

  const [ loading, setLoading ] = useState(true);
  const [ searchLoading, setSearchLoading ] = useState(false);

  const [ notFound, setNotFound ] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts(offset, limit + 1, id, search);
      if (result.length === 0) {
        setNotFound(true);
      } else {
        setProducts(result);
        setCategory(result[0].category);
      }
      
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Uppfærir vörur
  async function updateProducts(offset : number) {
    setLoading(true);
    const result = await getProducts(offset, limit + 1, id, search);
    setProducts(result);
    setLoading(false);
  }

  // Handler fyrir leitarinput
  function handleSearchChange(e : any) {
    setSearch(e.target.value);
  }

  // Handler fyrir leitartakka
  async function submitSearch(e : any) {
    e.preventDefault();
    setSearchLoading(true);
    const result = await getProducts(offset, limit + 1, id, search);
    if (result.length !== 0) {
      setSearchNotFound(false);
      setProducts(result);
    } else {
      setSearchNotFound(true);
      setsearchNotFoundText(search);
    }
    setSearchLoading(false);
  }

  // Handler fyrir næstu síðu takka
  function handleNext() {
    setOffset(offset + limit);
    setPage(page + 1);
    updateProducts(offset + limit);
  }

  // Handler fyrir fyrri síðu takka
  function handlePrevious() {
    setOffset(offset - limit);
    setPage(page - 1);
    updateProducts(offset - limit);
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
          <Helmet title={category.title} />
          <h1 className="categoryTitle">{category.title}</h1>

          <Search
            handleSearchChange={handleSearchChange}
            submitSearch={submitSearch}
            searchText={search}
          />
          {searchLoading && (
            <p>Loading...</p>
          )}
          {(!searchLoading && searchNotFound) && (
            <p>Ekkert '{searchNotFoundText}' fannst</p>
          )}

          {(!searchNotFound && !searchLoading) &&(
            <Fragment>
              <ProductsList
                products={products.slice(0, 12)}
              />
              <div className='pageNav'>
                {page > 1 && (
                  <Button
                    className={'pageButt'}
                    children={'Fyrri síða'}
                    onClick={handlePrevious}
                    small={true}
                  />
                )}
                <p className='pageNum'>Síða {page}</p>
                {products.length > 12 && (
                  <Button
                    className={'pageButt'}
                    children={'Næsta síða'}
                    onClick={handleNext}
                    small={true}
                  />
                )}
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

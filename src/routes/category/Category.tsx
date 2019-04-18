import React, { useState, useEffect, Fragment } from 'react';
import Helmet from 'react-helmet';

import { getCategory } from '../../api';

import Search from '../../components/search/Search';

import Products from '../products/Products';

import './Category.scss';
import Button from '../../components/button/Button';

export default function Category(props : any) {
  const { id } = props.match.params;
  const limit = 12;

  const [ category, setCategory ] = useState();
  const [ offset, setOffset ] = useState(0);
  const [ search, setSearch ] = useState();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getCategory(id);
      setCategory(result);
      setLoading(false);
    }
    fetchProduct();
  }, []);

  function handleSearchChange(e : any) {
    setSearch(e.target.value);
  }

  function handleNext() {
    setOffset(offset + limit);
  }

  function handlePrevious() {
    setOffset(offset - limit);
  }

  return (
    <Fragment>
      {loading && (
        <p>Loading...</p>
      )}
      {(!loading && category!=null) && (
        <Fragment>
          <Helmet title={category.title} />

          <Search handleSearchChange={handleSearchChange} />
    
          <h1>{category.title}</h1>
    
          <Products
            offset={offset}
            limit={limit}
            category={category}
            search={search}
          />

          <Button
            className={'prevButt'}
            children={'Fyrri síða'}
            onClick={handlePrevious}
          />
          <Button
            className={'nextButt'}
            children={'Næsta síða'}
            onClick={handleNext}
          />
        </Fragment>
      )}
    </Fragment>
  )
}

import React, { useState, useEffect, Fragment } from 'react';
import  { Link } from 'react-router-dom';

import { getAllCategories } from '../../api';
import { ICategory } from '../../api/types';

import './Categories.scss';

/**
 * Birtir vöruflokkana á forsíðunni
 */
export default function CategoriesRoute() {

  const [ categories , setCategories ] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getAllCategories();
      setCategories(result);
    };
    fetchProduct();
  },[]);
  
  function showCategories(cat: ICategory[]) {
    if (cat !== undefined) {
      const array : any = [];
      for (let i = 0; i < cat.length; i += 1) {
        array.push(
          <Link to = {`/categories/${cat[i].id}`} key={i} className='category'>
            <h1>{cat[i].title}</h1>
          </Link>
        );
      }
      return array;
     }
  }

  return (
    <Fragment>
      <div>
        <h2>Skoðaðu vöruflokkana okkar</h2>
        <section className='categories'>
          { showCategories(categories) }
        </section>
      </div>
    </Fragment>
  );
}

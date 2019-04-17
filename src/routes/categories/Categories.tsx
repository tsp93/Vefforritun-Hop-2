import React, { useState, useEffect, Fragment } from 'react';
import  { Link } from 'react-router-dom';

import { getAllCategories } from '../../api';
import { ICategory } from '../../api/types';

import './Categories.scss';
import CategoryBox from '../../components/categoryBox/CategoryBox';

/**
 * Birtir vöruflokkana á forsíðunni
 */
export default function CategoriesRoute() {

  const [ categories, setCategories ] = useState();
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllCategories();
      setCategories(result);
    };
    fetchCategories();
  },[]);
  
  function showCategories(cat: ICategory[]) {
    if (cat != undefined) {
      const array : any = [];
      for (let i = 0; i < cat.length; i += 1) {
        array.push(
          <CategoryBox
              id={cat[i].id}
              title={cat[i].title}
              key={i}
            />
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

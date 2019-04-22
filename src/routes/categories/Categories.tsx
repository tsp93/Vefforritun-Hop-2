import React, { useState, useEffect, Fragment } from 'react';

import { getAllCategories } from '../../api';
import { ICategory } from '../../api/types';

import CategoryBox from '../../components/categoryBox/CategoryBox';

import './Categories.scss';

// Birtir vöruflokkana
export default function Categories() {

  const [ categories, setCategories ] = useState();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllCategories();
      setCategories(result);
      setLoading(false);
    };
    fetchCategories();
  }, []);
  
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
      {loading && (
        <p>Loading...</p>
      )}
      {!loading && (
        <div className="categories">
          <h2 className="categoriesTitle">Skoðaðu vöruflokkana okkar</h2>
          <section className='categoryList'>
            { showCategories(categories) }
          </section>
        </div>
      )}
    </Fragment>
  );
}

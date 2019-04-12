import React, { useState, useEffect, Fragment } from 'react';
import { getAllCategories } from '../../api';
import { ICategory } from '../../api/types';

export default function CategoriesRoute() {

  const [ categories , setCategories ] = useState();
  useEffect(() => {
    const fetchProduct = async () =>{
      const result = await getAllCategories();
      setCategories(result);
    }
    fetchProduct();
  },[]);

  function showCategories(cat: ICategory[]){
    if(cat !== undefined){
      let array : any = [];
      for(let i=0; i<cat.length;i++){
        array.push(
          <div>
            <h2 key={i}>{cat[i].title}</h2>
          </div>
        );
      }
      return array;   
     }
  }


  return (
    <Fragment>
      <section>
        { showCategories(categories) }
      </section>
      
    </Fragment>
  );
}

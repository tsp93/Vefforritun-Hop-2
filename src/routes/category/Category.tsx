import React, { useEffect, useState, Fragment } from 'react';
import Helmet from 'react-helmet';

import { getProductsInCat, searchProducts } from '../../api';
import { IProduct } from '../../api/types';
import ProductComponent from '../../components/product/Product';
import { async } from 'q';


export default function Category(props: any) {

  const [loading , setloading] = useState(true);
  const { id } = props.match.params;
  const [ title, setTitle ] = useState();
  const [ products, setProducts ] = useState();
  const [ fullList, setFullList ] = useState();


  const init = useEffect(() => {
    const fetchProduct = async () => {
      setloading(false);
      const result = await getProductsInCat(id);
      setProducts(result);
      setFullList(result);
      
    }
    fetchProduct();
  }, []);

  function Search() {

    const [search, setSearch] = useState();

    function handleSearchChange(e: any){
      let target = e.target.value;
      setSearch(target);
    }

    const submitSearch = async (e:any) => {
      e.preventDefault();
      if(search === '' || search ===undefined){
        setProducts(fullList);
      }
      else{
        const result = await searchProducts(search,id);
        setProducts(result);
      }
      
    }

    return (
      <form onSubmit={submitSearch}>
        <label htmlFor="leit">leit:</label>
        <input autoComplete="off" id="leit" type="text" name="leit" onChange={handleSearchChange}/>
        <button>leita</button>
        
      </form>
    );
  }

  function showProductList(prod:IProduct[]|undefined){
    if(prod !== undefined){
      let array : any = [];
      for(let i=0; i<prod.length;i++){
        const p = {
          id: prod[i].id,
          image: prod[i].image,
          title: prod[i].title,
          price: prod[i].price.toString(),
          category: prod[i].category.title,
        }
       
        array.push( <ProductComponent key= {i} product={p}/> );
     }
     return array;   
    } 
  }

  function showState(l : Boolean){
    if(l){
      return (
        <p>sæki gögn...</p>
      )
    }
  }



  return (
    <Fragment>
      <Helmet title="Flokkur" />
        <Search/>
        {showState(loading)}
        <h1>Flokkur</h1>

        {showProductList(products) }
        <button>fyrrverandi síða</button>
        <button>næsta síða</button>

    </Fragment>
  )
}

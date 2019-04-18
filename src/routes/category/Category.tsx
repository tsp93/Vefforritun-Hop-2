import React, { useEffect, useState, Fragment } from 'react';
import Helmet from 'react-helmet';

import { getProductsInCat, searchProducts } from '../../api';
import { IProduct } from '../../api/types';

import ProductBox from '../../components/productBox/ProductBox'

export default function Category(props: any) {

  const [loading , setloading] = useState(true);
  const { id } = props.match.params;
  const [ title, setTitle ] = useState();
  const [ products, setProducts ] = useState();
  const [ fullList, setFullList ] = useState();
  const [ offset , setOffset ] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setloading(false);
      const result = await getProductsInCat(id,offset);
      setProducts(result);
      setFullList(result);
      setloading(false);
    }
    fetchProducts();
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

    if(loading){
      return (<p>loading...</p>)
    }
    else{
      if(prod !== undefined){
        const array : any = [];
        for(let i=0; i<prod.length;i++){
          array.push(
            <ProductBox
              key={i}
              id={prod[i].id}
              title={prod[i].title}
              price={prod[i].price}
              image={prod[i].image}
              category={prod[i].category}
            />
          );
        }
        return array;   
      } 
    }
  }

  function showPagebuttons(){
    function prevPage(){
      const temp = offset - 10;
      setOffset(temp);
      loadPage(temp); 
    };
    function nextPage() {
      const temp = offset + 10;
      setOffset(temp);
      loadPage(temp);
    };

    async function loadPage(next:number){
      const result = await getProductsInCat(id,next);
      setProducts(result);
      console.log(result);
    }

    if(offset < 1){
      return (
        <div>
          <p>síða: {(offset/10)+ 1}</p>
          <button onClick={nextPage}>næsta síða</button>
        </div>
      )
    }
    else{
      return (
        <div>
          <button onClick={prevPage}>fyrrverandi síða</button>
          <p>síða: {(offset/10)+ 1}</p>
          <button onClick={nextPage}>næsta síða</button>
        </div>
      )
    }
    
  }



  return (
    <Fragment>
      <Helmet title="Flokkur" />
        <Search/>
        <h1>Flokkur</h1>

        {showProductList(products) }
        {showPagebuttons()}

    </Fragment>
  )
}

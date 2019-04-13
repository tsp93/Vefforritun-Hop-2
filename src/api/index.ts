import { IProduct, ICategory, IUser } from './types';
import { async } from 'q';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

// Sækja slóð á API úr env
const baseurl:string | undefined = process.env.REACT_APP_API_URL;

async function getProduct(id: number ) : Promise<IProduct> {
  // todo sækja vöru
  const url = new URL('/products/'+id,baseurl);
  const response = await fetch(url.href);
  const data = response.json();
  
  var product = data.then(function(value){
    const product: IProduct = { 
      category: value.category_title,
      id: value.id,
      image: value.image,
      price: value.price,
      title: value.title,
    };
    return product
  });

  return new Promise((resolve) => resolve(product))
}


async function getAllProducts() : Promise<IProduct[]>{
  const url = new URL('/products/',baseurl);
  const response = await fetch(url.href);
  const data = response.json();

  let products : IProduct[] = [];
    
  data.then(function(value){

    value.items.forEach(function(element: any){
  
      const product: IProduct = { 
      category: element.category_title,
      id: element.id,
      image: element.image,
      price: element.price,
      title: element.title,
      };
      
      products.push(product);
    });
    
  });
  

  return new Promise((resolve) => resolve(products));
}

async function getAllCategories() : Promise<ICategory[]>{
  const url = new URL('/categories',baseurl);
  const response = await fetch(url.href);
  const data = response.json();

  let categories : ICategory[] = [];

  data.then(function(value){
    value.items.forEach(function(element:any){
      const category: ICategory= {
        id: element.id,
        title: element.title
      };

      categories.push(category);
    });
  });
  return new Promise((resolve) => resolve(categories));
}

/**
 *  Login fall
 * @param u username
 * @param p password
 */

async function postLogin(u:String,p:any) : Promise<IUser | undefined >{
  const url = new URL('/users/login',baseurl);
  

  
  const response = await fetch(url.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: u,
      password: p,
    })
  });

  const data = response.json();
  

  let user = data.then(function(value){
    if(value.error){
      return undefined;
    }
  
    const result : IUser = {
      id: value.user.id,
      username: value.user.username,
      email: value.user.email,
      admin: value.user.admin
    }
    return result;
  });
 

  return new Promise(resolve => resolve(user)); 
}

export {
  postLogin,
  getProduct,
  getAllProducts,
  getAllCategories
};
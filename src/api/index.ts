import { IProduct, ICategory, IUser, IError } from './types';
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
      description: value.description
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
      category:{
        title:element.category_title,
        id: element.category_id
      }, 
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

async function getProductsInCat(id : number | string, page: number) : Promise<IProduct[]>{
  const offset = page*10;
  const limit = 10;
  console.log('page: '+ page);
  console.log('offset: ' + offset);
  console.log('limit: '+ limit);
 
  const suffix = '/products?category='+ id + '&offset='+ offset + '&limit=' + limit;
  const url = new URL(suffix, baseurl);
  const response = await fetch(url.href);
  const data = response.json();

  let products : IProduct[] = [];

  data.then(function(value){

    value.items.forEach(function(element: any){
  
      const product: IProduct = { 
      category:{
        title:element.category_title,
        id: element.category_id
      }, 
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

async function searchProducts(search : string,cat:string) : Promise<IProduct[]>{

  const suffix = '/products?search='+ search + '&category=' + cat;
  const url = new URL(suffix, baseurl);
  const response = await fetch(url.href);
  const data = response.json();

  let products : IProduct[] = [];

  data.then(function(value){

    value.items.forEach(function(element: any){
  
      const product: IProduct = { 
      category:{
        title:element.category_title,
        id: element.category_id
      }, 
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
 *  kallar á login fall á server 
 * @param u username
 * @param p password
 * 
 * skilar fylki af villum ef einhverjar
 */

async function postLogin(u:String,p:any) : Promise<IError[] | IUser>{
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
  

  let result = data.then(function(value){
    
    let messages : IError[] = [];

    if(value.user){
      const user :IUser = {
        id: value.user.id,
        username: value.user.username,
        email: value.user.email,
        admin: value.user.admin
      }
      return user;
    }
      
    if(!value.error && !value.user){
      value.forEach(function(err: any){
          const msg: IError = {
            field: err.field,
            message: err.error,
          }
          messages.push(msg);
        });
    }
        

    if(value.error){
      const msg : IError ={
        field: 'NoSuchUser',
        message: value.error,
        }
      messages.push(msg);
    }
      
    return messages;
  
  });
  return new Promise(resolve => resolve(result)); 
}

/**
 *  kallar á register fall á server
 * 
 * @param u username
 * @param p password
 * @param e email
 * 
 * skilar fylki af villum ef einhverjar
 */

async function postSignUp(u: string,p:string,e:string): Promise<IError[]>{
  const url = new URL('/users/register',baseurl);
  
  const response = await fetch(url.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: u,
      password: p,
      email: e,
    })
  });

  const data = response.json();

  let result = data.then(function(value){
    
    let messages : IError[] = [];
      if(value.errors){
        value.errors.forEach(function(err: any){
          const msg: IError = {
            field: err.field,
            message: err.error,
          }
          messages.push(msg);
        });
      }
      return messages;
    
  });
 
  return new Promise(resolve => resolve(result)); 
}

export {
  postLogin,
  getProduct,
  getAllProducts,
  getAllCategories,
  postSignUp,
  getProductsInCat,
  searchProducts
};
import { IProduct } from './types';
import { async } from 'q';

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
  

  return new Promise((resolve) => resolve(products))

}

export {
  getProduct,
  getAllProducts
};
import { IProduct, ICategory, IUser, IError, ICart, IOrder } from './types';

// Sækja slóð á API úr env
const baseurl : string | undefined = process.env.REACT_APP_API_URL;

/**
 * Hjálparfall sem býr til vöru út frá hlut
 * @param element Hlutur úr JSON
 */
function constructProduct(element: any) {
  const product: IProduct = {
    id: element.id,
    title: element.title,
    price: element.price,
    image: element.image,
    category: {
      id: element.category_id,
      title: element.category_title,
    },
    description: element.description,
    created: element.created,
    updated: element.updated,
    quantity: element.quantity,
    line: element.line,
    total: element.total,
  };

  return product;
}

/**
 * Sækir vöru
 * @param id Id á vöru 
 */
async function getProduct(id: number ) : Promise<IProduct> {
  const url = new URL(`/products/${id}`, baseurl);
  const response = await fetch(url.href);
  const data = response.json();

  const product = data.then((value) => {
    return constructProduct(value);
  });

  return new Promise((resolve) => resolve(product));
}

/**
 * Sækir vörur eftir parametrum
 * @param offset Hvar á að byrja á í vörulistanum
 * @param limit Hversu margar vörur á að sækja
 * @param categoryID Hvaða flokk vörurnar eru í
 * @param search Leit að ákveðinni vöru
 */
async function getProducts(offset : number | null, limit : number | null, categoryID : any | null, search : String | null) : Promise<IProduct[]> {
  let suffix = `/products?offset=${offset}&limit=${limit}`;
  if (categoryID != null) {
    suffix = `${suffix}&category=${categoryID}`
  }
  if (search != null) {
    suffix = `${suffix}&search=${search}`
  }
  const url = new URL(suffix, baseurl);
  const response = await fetch(url.href);
  const data = response.json();

  const products = data.then((value) => {
    const productList : IProduct[] = [];
    value.items.forEach((element: any) => {
      productList.push(constructProduct(element));
    });
    return productList;
  });

  return new Promise((resolve) => resolve(products));
}

/**
 * Sækir flokka
 */
async function getAllCategories() : Promise<ICategory[]> {
  const url = new URL('/categories', baseurl);
  const response = await fetch(url.href);
  const data = response.json();

   const categories = data.then((value) => {
    const categoryList : ICategory[] = [];
    value.items.forEach((element:any) => {
      const category: ICategory = {
        id: element.id,
        title: element.title,
      };
      categoryList.push(category);
    });
    return categoryList;
  });

  return new Promise((resolve) => resolve(categories));
}

/**
 * Kallar á login fall á server 
 * @param u username
 * @param p password
 * 
 * @returns Skilar fylki af villum ef einhverjar
 */
async function postLogin(u : String, p : any) : Promise<IError[] | IUser> {
  const url = new URL('/users/login', baseurl);
  const response = await fetch(url.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: u,
      password: p,
    }),
  });
  const data = response.json();

  const result = data.then((value) => {
    const messages : IError[] = [];

    // Ef notandi náði að skrá sig inn
    if (value.user) {
      const user : IUser = {
        id: value.user.id,
        username: value.user.username,
        email: value.user.email,
        admin: value.user.admin,
      }
      if (value.token) {
        localStorage.setItem('myToken', value.token);
      }
      return user;
    }

    // Ef villa kom upp við innskráningu
    if (!value.error && !value.user) {
      value.forEach((err: any) => {
        const msg: IError = {
          field: err.field,
          message: err.error,
        }
        messages.push(msg);
      });
    }

    // Ef notandi fannst ekki
    if (value.error) {
      const msg : IError = {
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
 * Kallar á register fall á server
 * 
 * @param u username
 * @param p password
 * @param e email
 * 
 * @returns Skilar fylki af villum ef einhverjar
 */
async function postSignUp(u : string, p : string, e : string) : Promise<IError[]> {
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

  const result = data.then((value) => {
    const messages : IError[] = [];
      if(value.errors){
        value.errors.forEach((err: any) => {
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

/**
 * Nær í innskráðan notanda
 */
async function getCurrentUser() : Promise<IUser | any> {
  const url = new URL('/users/me', baseurl);
  const options : any = { method: 'GET', headers: {} };

  const token = localStorage.getItem('myToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.href, options);
  const result = response.json();

  return new Promise(resolve => resolve(result)); 
}

/**
 * Nær í körfu
 */
async function getCart() : Promise<ICart> {
  const url = new URL('/cart', baseurl);
  const options : any = { method: 'GET', headers: {} };

  const token = localStorage.getItem('myToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.href, options);
  const data = response.json();

  const cart : ICart = {
    products: [],
    cartID: -1,
    total_price:0,
  };

  data.then((value) => {
    if(value.error){
      return value.error;
    }

    value.lines.forEach((element: any) => {
      cart.products.push(constructProduct(element));
    });
    cart.total_price = value.total;
    cart.cartID = value.id;
  });

  return new Promise(resolve => resolve(cart)); 
}

/**
 * Bætir við vöru í körfu
 * @param pid Id á vöru
 * @param q Magn af vöru
 */
async function addToCart(pid : number, q : number) : Promise<IError[]> {
  const url = new URL('/cart', baseurl);
  const options : any = {
    method: 'POST',
    headers: {},
    body:JSON.stringify({
      product: pid,
      quantity: q,
    })
  };
  options.headers['Content-Type'] ='application/json';

  const token = localStorage.getItem('myToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.href, options);
  const data = response.json();

  const result = data.then((value) => {
    const messages : IError[] = [];

    if (value.errors) {
      value.errors.forEach((err: any) => {
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

/**
 * Breytir magn af ákveðinni vöru í körfu
 * @param line Varan sem skal uppfæra
 * @param q Nýja magn af vöru
 */
async function changeLineQuantity(line : number, q : number | string) : Promise<IError[] | IProduct> {
  const suffix = `/cart/line/${line}`;
  const url = new URL(suffix,baseurl);
  const options : any = {
    method: 'PATCH',
    headers: {},
    body: JSON.stringify({
      quantity: q,
    })
  };
  options.headers['Content-Type'] ='application/json';

  const token = localStorage.getItem('myToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.href, options);
  const data = response.json();

  const result = data.then((value) => {
    if (value.errors) {
      const messages : IError[] = [];

      value.errors.forEach((err: any) => {
        const msg: IError = {
          field: err.field,
          message: err.error,
        }
        messages.push(msg);
      });

      return messages;
    } else {
      return constructProduct(value);
    }
  });

  return new Promise(resolve => resolve(result));
}

/**
 * Býr til pöntun úr körfu
 * @param name Nafn á notanda
 * @param address Heimilisfang notanda
 */
async function postOrders(name : string, address : string) : Promise<IError[]> {
  const url = new URL('/orders', baseurl);
  const options : any = {
    method: 'POST',
    headers: {},
    body: JSON.stringify({
      name: name,
      address: address,
    })
  };
  options.headers['Content-Type'] ='application/json';

  const token = localStorage.getItem('myToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.href, options);
  const data = response.json();

  const result = data.then((value) => {
    
    const messages : IError[] = [];
    if (value.errors) {
      value.errors.forEach((err: any) => {
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

/**
 * Sækir pantanir
 */
async function getOrders(): Promise<IOrder[] | IError[]> {
  const url = new URL('/orders', baseurl);
  const options : any = {
    method: 'GET',
    headers: {},
  };
  options.headers['Content-Type'] ='application/json';

  const token = localStorage.getItem('myToken');
  if(token){
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.href, options);
  const data = response.json();

  const result = data.then((value) => {
    if (value.errors) {
      const messages : IError[] = [];

      value.errors.forEach((err: any) => {
        const msg: IError = {
          field: err.field,
          message: err.error,
        }
        messages.push(msg);
      });
      return messages;
    } else {
      const orders : IOrder[] = [];

      value.items.forEach((element: any) => {
        const order = {
          id: element.id,
          name: element.name,
          address : element.address,
          created : element.created,
        }
        orders.push(order);
      });

      return orders;
    }
  });

  return new Promise(resolve => resolve(result));
}


export {
  postLogin,
  getProduct,
  getProducts,
  getAllCategories,
  postSignUp,
  getCurrentUser,
  getCart,
  addToCart,
  changeLineQuantity,
  postOrders,
  getOrders,
};
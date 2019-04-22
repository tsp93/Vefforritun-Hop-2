import { IProduct, ICategory, IUser, IError, ICart, IOrder } from './types';

// Sækja slóð á API úr env
const baseurl : string | undefined = process.env.REACT_APP_API_URL;

/**
 * Hjálparfall sem býr til vöru út frá hlut
 * @param element Hlutur úr JSON
 */
function constructProduct(element: any) {
  if (element.product_id != null) {
    element.lineId = element.id;
    element.id = element.product_id;
  }
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
    lineId: element.lineId,
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
async function postLogin(u : String, p : any) : Promise<IError[]> {
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
      localStorage.setItem('myToken', value.token);
      return messages;
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
async function getCart() : Promise<ICart | any> {
  const url = new URL('/cart', baseurl);
  const options : any = { method: 'GET', headers: {} };

  const token = localStorage.getItem('myToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.href, options);
  const data = response.json();

  const cart = data.then((value) => {
    const carty : ICart = {
      lines: [],
      cartID: -1,
      totalPrice:0,
    };

    if(value.error){
      return value;
    }

    value.lines.forEach((element: any) => {
      carty.lines.push(constructProduct(element));
    });
    carty.totalPrice = value.total;
    carty.cartID = value.id;
    return carty;
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

  let quant = q;
  const cart = await getCart();
  if (!cart.error) {
    cart.lines.forEach((line : IProduct) => {
      if (line.id === pid) {
        quant += line.quantity ? line.quantity : 0;
        return;
      }
    });
  }

  const options : any = {
    method: 'POST',
    headers: {},
    body:JSON.stringify({
      product: pid,
      quantity: quant,
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
async function getOrders() : Promise<IOrder[] | any> {
  const url = new URL('/orders', baseurl);
  const options : any = {
    method: 'GET',
    headers: {},
  };
  options.headers['Content-Type'] ='application/json';

  const token = localStorage.getItem('myToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.href, options);
  const data = response.json();

  const result = data.then((value) => {
    if (value.error) {
      return value;
    } else {
      const orders : IOrder[] = [];

      value.items.forEach((element: any) => {
        const order = {
          id: element.id,
          name: element.name,
          address : element.address,
          created : element.created,
          lines : element.lines,
          total : element.total,
        }
        orders.push(order);
      });

      return orders;
    }
  });

  return new Promise(resolve => resolve(result));
}

/**
 * Sækir pöntun
 */
async function getOrder(id : number) : Promise<IOrder | any> {
  const url = new URL(`/orders/${id}`, baseurl);
  const options : any = {
    method: 'GET',
    headers: {},
  };
  options.headers['Content-Type'] ='application/json';

  const token = localStorage.getItem('myToken');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.href, options);
  const data = response.json();

  const result = data.then((value) => {
    if (value.error) {
      return value;
    } else {
      const order = {
        id: value.id,
        name: value.name,
        address : value.address,
        created : value.created,
        lines : value.lines,
        total : value.total,
      }
      return order;
    }
  });

  return new Promise(resolve => resolve(result));
}


export {
  getProduct,
  getProducts,
  getAllCategories,
  postLogin,
  postSignUp,
  getCurrentUser,
  getCart,
  addToCart,
  changeLineQuantity,
  postOrders,
  getOrders,
  getOrder,
};
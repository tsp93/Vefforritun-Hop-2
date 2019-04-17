export interface ICategory {
  id: number;
  title: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  category: ICategory;
  description?: string;
  created?: Date;
  updated?: Date;
  quantity?: number;
  line?: number;
  total?: number;
}

export interface IUser{
  id: number;
  username: String;
  email: String;
  admin: Boolean;
}

export interface IError{
  field: String;
  message: String;
}

export interface ICart{
  products: IProduct[];
  cartID: number;
  total_price: number;
}

export interface IOrder{
  id: number;
  name: string;
  address: string;
  created: Date;
}

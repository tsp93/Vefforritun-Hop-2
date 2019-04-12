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
}

export interface IUser{
  id: number;
  username: String;
  email: String;
  admin: Boolean;
}

// todo fleiri týpur

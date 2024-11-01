export interface IParamsProduct {
  img: string[];
  title: string;
  desc: string;
  price: string;
}

export interface IProduct {
  img: string[];
  title: string;
  desc: string;
  price: string;
}

export interface ICartStore {
  cart: IProduct[];
  removeCart: (cart: IProduct) => void;
  addCart: (cart: IProduct) => void;
  clearCart: () => void;
}

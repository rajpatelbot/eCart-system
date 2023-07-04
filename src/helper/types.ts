export interface UseFetchResponse<TData> {
  data: TData | null;
  isLoading: boolean;
  error: Error | null;
  fetchData: (url: string, headers?: Record<string, string>) => Promise<void>;
}

export interface BaseSliceInterface {
  cartProducts: CartProductsInterface[];
}

export interface setCartProductsAction {
  payload: CartProductsInterface[];
  type: string;
}

export interface ProductInterface {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartProductsInterface extends ProductInterface {
  quantity: number;
}

export interface responseInterface {
  limit: number;
  products: ProductInterface[];
  skip: number;
  total: number;
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `/products/category/${category}`,
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductQuery,
  useGetProductsByCategoryQuery 
} = apiSlice; 
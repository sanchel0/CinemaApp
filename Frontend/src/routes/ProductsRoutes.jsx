import { Route } from 'react-router-dom';
import ProductsList from '../pages/products/ProductsList';
import CreateProduct from '../pages/products/CreateProduct';
import EditProduct from '../pages/products/EditProduct';
import ProductDetails from '../pages/products/ProductDetails';

export const ProductsRoutes = () => (
  <>
    <Route path="/products" element={<ProductsList />} />
    <Route path="/products/create" element={<CreateProduct />} />
    <Route path="/products/:id/update" element={<EditProduct/>} />
    <Route path="/products/:id/details" element={<ProductDetails/>} />
  </>
);
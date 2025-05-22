import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll, remove } from '../../services/products';

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll()
      .then(setProducts)
      .catch(console.error);
  }, []);

  const handleDelete = async (product) => {
    const confirmed = window.confirm(`¿Seguro que desea eliminar el producto "${product.name}"?`);
    if (!confirmed) return;

    try {
      await remove(product.id);
      const updated = await getAll();
      setProducts(updated);
    } catch (err) {
      console.error(`Error al borrar ${product.name}:`, err);
      alert('No se pudo eliminar');
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td className="actions">
                <Link className="update" to={`/products/${product.id}/update`}>Update</Link>
                <button className="link-like delete" onClick={() => handleDelete(product)}>Delete</button>
                <Link className="details" to={`/products/${product.id}/details`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/products/create">Create Product</Link>
    </div>
  );
}
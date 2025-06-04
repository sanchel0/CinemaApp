import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDetails } from '../../services/products';
import { getImageUrl } from '../../services/images';
import EntityLayout from '../../components/layouts/EntityLayout';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDetails(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al obtener detalles: ' + err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No se encontró el producto</div>;

  return (
    <EntityLayout entityName="products">
      <h2>Product Details</h2>
      <div className="details">
        <p><strong>ID:</strong> {product.id}</p>
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
        <p><strong>Stock:</strong> {product.stock.toFixed(2)}</p>
        <p><strong>Image:</strong><br />
          <img src={getImageUrl(product.imageUrl)} alt={product.name} style={{ maxWidth: '150px' }} />
        </p>
        {console.log(product.imageUrl)}
        <p><strong>Last Update:</strong> {new Date(product.lastUpdate).toLocaleString()}</p>
      </div>
    </EntityLayout>
  );
}

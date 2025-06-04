import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetails, edit } from '../../services/products';
import EntityLayout from '../../components/layouts/EntityLayout';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDetails(id)
      .then(product => {
        setForm({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          imageUrl: product.imageUrl
        });
        setLoading(false);
      })
      .catch(error => {
        setError('Error al cargar el producto: ' + error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await edit(id, {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock)
      });
      alert('Producto actualizado correctamente');
      navigate('/products');
    } catch (error) {
      alert('Error al actualizar el producto: ' + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <EntityLayout entityName="products">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={form.description} onChange={handleChange} maxLength="500" required />

        <label>Price:</label>
        <input type="number" name="price" value={form.price} onChange={handleChange} required />

        <label>Stock:</label>
        <input type="number" name="stock" value={form.stock} onChange={handleChange} required />

        <label>Image URL:</label>
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} required />

        <button type="submit">Save</button>
      </form>
    </EntityLayout>
  );
}

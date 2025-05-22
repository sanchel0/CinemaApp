import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from '../../services/products';
import { uploadImage } from '../../services/images';
import EntityLayout from '../../components/layouts/EntityLayout';

export default function CreateProduct() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;

    if (form.checkValidity()) {
        const formData = new FormData(form);
        const imageFile = formData.get('imageUrl');
        const data = Object.fromEntries(formData.entries());
        
        console.log('Datos válidos:', data);
        alert('Formulario enviándose...');
        try {
            const imageUrl = await uploadImage(imageFile);
            
            const created = await create({
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                imageUrl
        });
        console.log('Producto creado con ID:', created.id);
        navigate('/products');
        } catch (err) {
            alert('No se pudo crear el producto: ' + err.message);
            console.error(err);
        }
    } 
    else {
        alert('Todos los campos son obligatorios');
        form.reportValidity();
    }
  };

  return (
    <EntityLayout entityName="products">
      <h2>Create Product</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" required />

        <label>Description:</label>
        <textarea name="description" required maxLength="500"/>

        <label>Price:</label>
        <input type="number" name="price" required min="0" step="0.01" />

        <label>Stock:</label>
        <input type="number" name="stock" required min="0" />

        <label>Image URL:</label>
        <input type="file" name="imageUrl" required />

        <button type="submit">Create</button>
      </form>
    </EntityLayout>
  );
}

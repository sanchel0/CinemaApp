import {API_URL_PRODUCTS} from '../constants/api'

const headers = {
  'Content-Type': 'application/json',
};

export async function getAll() {
  const res = await fetch(API_URL_PRODUCTS);
  if (!res.ok) throw new Error('Error al obtener productos');
  return await res.json();
};

export async function getDetails(id) {
  const res = await fetch(`${API_URL_PRODUCTS}/${id}`);
  if (!res.ok) throw new Error('Producto no encontrado');
  return await res.json();
};

export async function create(productData) {
  const res = await fetch(API_URL_PRODUCTS, {
    method: 'POST',
    headers,
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return await res.json();
};

export async function edit(id, productData) {
  const res = await fetch(`${API_URL_PRODUCTS}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Error al actualizar producto');
  return await res.json();
};

export async function remove(id) {
  const res = await fetch(`${API_URL_PRODUCTS}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar producto');
  return true;
};

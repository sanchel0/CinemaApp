import { API_URL_CINEMAS } from '../constants/api';

const headers = {
  'Content-Type': 'application/json',
};

export async function getAll() {
  const res = await fetch(API_URL_CINEMAS);
  if (!res.ok) throw new Error('Error al obtener cines');
  return await res.json();
};

export async function getDetails(id) {
  const res = await fetch(`${API_URL_CINEMAS}/${id}`);
  if (!res.ok) throw new Error('Cine no encontrado');
  return await res.json();
};

export async function create(cinemaData) {
  const res = await fetch(API_URL_CINEMAS, {
    method: 'POST',
    headers,
    body: JSON.stringify(cinemaData),
  });
  if (!res.ok) throw new Error('Error al crear cine');
  return await res.json();
};

export async function edit(id, cinemaData) {
  const res = await fetch(`${API_URL_CINEMAS}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(cinemaData),
  });
  if (!res.ok) throw new Error('Error al actualizar cine');
  return await res.json();
};

export async function remove(id) {
  const res = await fetch(`${API_URL_CINEMAS}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar cine');
  return true;
};

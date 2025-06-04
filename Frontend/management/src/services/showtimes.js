import { API_URL_SHOWTIMES } from '../constants/api';

export async function getAll() {
  const response = await fetch(API_URL_SHOWTIMES);
  if (!response.ok) throw new Error('Error al obtener showtimes');
  return await response.json();
}

export async function getDetails(id) {
  const response = await fetch(`${API_URL_SHOWTIMES}/${id}`);
  if (!response.ok) throw new Error('Error al obtener detalles del showtime');
  return await response.json();
}

export async function create(showtimeData) {
  const response = await fetch(API_URL_SHOWTIMES, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(showtimeData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al crear showtime: ${errorText}`);
  }

  return await response.json(); // Devuelve el showtime creado con ID
}

export async function edit(id, showtimeData) {
  const response = await fetch(`${API_URL_SHOWTIMES}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(showtimeData),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`Error al actualizar showtime: ${errorBody}`);
  }
}

export async function remove(id) {
  const response = await fetch(`${API_URL_SHOWTIMES}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar showtime');
  }
}

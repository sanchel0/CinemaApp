import { API_URL_AUDITORIUMS } from '../constants/api';

export async function getAll() {
  const response = await fetch(API_URL_AUDITORIUMS);
  if (!response.ok) throw new Error('Error al obtener auditorios');
  return await response.json();
}

export async function getDetails(id) {
  const response = await fetch(`${API_URL_AUDITORIUMS}/${id}`);
  if (!response.ok) throw new Error('Error al obtener detalles del auditorio');
  return await response.json();
}

export async function create(auditoriumData) {
  const response = await fetch(API_URL_AUDITORIUMS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(auditoriumData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al crear auditorio: ${errorText}`);
  }

  return await response.json(); // Devuelve el auditorio creado con ID
}

export async function edit(id, auditoriumData) {
  const response = await fetch(`${API_URL_AUDITORIUMS}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(auditoriumData),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar auditorio: ' + await response.json());
  }//Poner esto para recibir los errores que manda la API. poner en el throw new Error el await responde.json(). Es util.
}

export async function remove(id) {
  const response = await fetch(`${API_URL_AUDITORIUMS}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar auditorio');
  }
}

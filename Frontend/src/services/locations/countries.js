import { API_URL_COUNTRIES } from '../../constants/api';

const headers = {
  'Content-Type': 'application/json',
};

export const createOrUpdate = async (data) => {
  if (data.id) {
    return updateCountry(data.id, data);
  } else {
    return createCountry(data);
  }
};

export async function getCountries() {
  const res = await fetch(API_URL_COUNTRIES);
  if (!res.ok) throw new Error('Error al obtener países');
  return await res.json();
}

export async function getCountry(id) {
  const res = await fetch(`${API_URL_COUNTRIES}/${id}`);
  if (!res.ok) throw new Error('País no encontrado');
  return await res.json();
}

export async function createCountry(data) {
  const res = await fetch(API_URL_COUNTRIES, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  console.log(JSON.stringify(data))
  if (!res.ok) throw new Error('Error al crear país');
  return await res.json();
}

export async function updateCountry(id, data) {
  const res = await fetch(`${API_URL_COUNTRIES}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar país');
  return await res.json();
}

export async function deleteCountry(id) {
  const res = await fetch(`${API_URL_COUNTRIES}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar país');
  return true;
}

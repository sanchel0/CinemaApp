import { API_URL_STATES, API_URL_COUNTRIES } from '../../constants/api';

const headers = {
  'Content-Type': 'application/json',
};

export async function getStates() {
  const res = await fetch(API_URL_STATES);
  if (!res.ok) throw new Error('Error al obtener países');
  return await res.json();
}

export async function getStatesByCountryId(countryId) {
  let url = API_URL_COUNTRIES;
  if (countryId) url += `/${countryId}/states`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener estados');
  const result = await res.json();
  return result;
}

export const createOrUpdate = async (data) => {
  if (data.id) {
    return updateState(data.id, data);
  } else {
    return createState(data);
  }
};

export async function createState(data) {
  const res = await fetch(API_URL_STATES, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear estado');
  return await res.json();
}

export async function updateState(id, data) {
  const res = await fetch(`${API_URL_STATES}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar estado');
  return await res.json();
}

export async function deleteState(id) {
  const res = await fetch(`${API_URL_STATES}/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!res.ok) throw new Error('Error al eliminar estado');
  if (res.status !== 204) {
    return await res.json();
  }

  return null;
}
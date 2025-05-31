import { API_URL_CITIES } from '../constants/api';

const headers = {
  'Content-Type': 'application/json',
};

export async function getCities(stateId = null) {
  let url = API_URL_CITIES;
  if (stateId) url += `?stateId=${stateId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener ciudades');
  return await res.json();
}

export async function createCity(data) {
  const res = await fetch(API_URL_CITIES, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear ciudad');
  return await res.json();
}

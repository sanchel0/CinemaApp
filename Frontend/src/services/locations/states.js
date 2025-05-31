import { API_URL_STATES, API_URL_COUNTRIES } from '../../constants/api';

const headers = {
  'Content-Type': 'application/json',
};

export async function getStatesByCountryId(countryId) {
  let url = API_URL_COUNTRIES;
  if (countryId) url += `/${countryId}/states`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener estados');
  const result = await res.json();
  return result;
}

export async function createState(data) {
  const res = await fetch(API_URL_STATES, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear estado');
  return await res.json();
}

import { API_URL_CITIES, API_URL_STATES } from '../../constants/api';

const headers = {
  'Content-Type': 'application/json',
};

/*export async function getCities(stateId = null) {
  let url = API_URL_CITIES;
  if (stateId) url += `?stateId=${stateId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener ciudades');
  return await res.json();
}*/

export async function getCitiesByStateId(stateId) {
  let url = API_URL_STATES;
  if (stateId) url += `/${stateId}/cities`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener ciudades');
  const result = await res.json();
  return result;
}

export const createOrUpdate = async (data) => {
  console.log(data)
  if (data.id) {
    console.log('update: ' + data.id)
    return updateCity(data.id, data);
  } else {
    console.log('create: ' + data.id)
    return createCity(data);
  }
};

export async function createCity(data) {
  const res = await fetch(API_URL_CITIES, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear ciudad');
  return await res.json();
}

export async function updateCity(id, data) {
  const res = await fetch(`${API_URL_CITIES}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar ciudad');
  return await res.json();
}

export async function deleteCity(id) {
  const res = await fetch(`${API_URL_CITIES}/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!res.ok) throw new Error('Error al eliminar ciudad');
  if (res.status !== 204) {
    return await res.json();
  }

  return null;
}
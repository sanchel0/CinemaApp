import {API_URL_MOVIES} from '../constants/api'

export async function getAll() {
      const response = await fetch(API_URL_MOVIES);
      if (!response.ok) throw new Error('Error al obtener elementos');
      return await response.json();
}

export async function getDetails(id) {
  const response = await fetch(`${API_URL_MOVIES}/${id}`);
  
  if (!response.ok) {
    throw new Error('Error al obtener detalles');
  }
  
  return await response.json();
}

export async function getByName(name) {
  const response = await fetch(`${API_URL_MOVIES}/search?name=${encodeURIComponent(name)}`);

  if (!response.ok) {
    throw new Error('Error al buscar por nombre');
  }

  return await response.json();
};

export async function create(movieData) {
  const response = await fetch(API_URL_MOVIES, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movieData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al crear la película: ${errorText}`);
  }
  else return null;
}

export async function edit(id, movieData) {
  const response = await fetch(`${API_URL_MOVIES}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData),
  });
console.log(JSON.stringify(movieData))
  if (!response.ok) {
    throw new Error('Error al actualizar la película');
  }
};

export async function remove(id) {
    const response = await fetch(`${API_URL_MOVIES}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar');
}
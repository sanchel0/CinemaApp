import {BASE_URL, API_URL_IMAGES} from '../constants/api'

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_URL_IMAGES}/upload`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) throw new Error('Error al subir la imagen');

  const data = await res.json();
  return data.imageUrl;
}

export function getImageUrl(path) {
  if (!path) return '';
  // Si ya es una URL completa, la devuelve tal cual
  if (path.startsWith('http')) return path;
  // Si es ruta relativa, concatena con backend
  return BASE_URL + path;
}
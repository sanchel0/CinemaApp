export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_BASE_URL = BASE_URL + '/api'

export const API_URL_ACTORS = `${API_BASE_URL}/actors`;
export const API_URL_DIRECTORS = `${API_BASE_URL}/directors`;
export const API_URL_GENRES = `${API_BASE_URL}/genres`;
export const API_URL_MOVIES = `${API_BASE_URL}/movies`;

export const API_URL_CINEMAS = `${API_BASE_URL}/cinemas`;

export const API_URL_PRODUCTS = `${API_BASE_URL}/products`;

export const API_URL_IMAGES = `${API_BASE_URL}/images`;
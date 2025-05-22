export function createEntityService(baseUrl) {
  return {
    async getAll() {
      const response = await fetch(baseUrl);
      if (!response.ok) throw new Error('Error al obtener elementos');
      return await response.json();
    },

    async getDetails(id) {
      const response = await fetch(`${baseUrl}/${id}`);
      if (!response.ok) throw new Error('Error al obtener detalles');
      return await response.json();
    },

    async getByName(name) {
      const response = await fetch(`${baseUrl}/search?name=${encodeURIComponent(name)}`);
      if (!response.ok) throw new Error('Error al buscar por nombre');
      return await response.json();
    },

    async create({ name }) {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      console.log('Creando con nombre:', name);
      const created = await response.json();
      console.log('Entidad creada:', created);
      if (!response.ok) throw new Error('Error al crear elemento');
      return await created;
    },

    async edit(id, { name }) {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(id), name }),
      });

      if (!response.ok) throw new Error('Error al actualizar');
    },

    async remove(id) {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar');
    },
  };
}

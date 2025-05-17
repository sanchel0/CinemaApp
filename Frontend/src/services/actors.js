const API_URL = 'https://localhost:7092/api/actors';

export function createActor({ name }) {
    return fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear el actor');
        }
        return response.json(); // devolvemos la promesa que resuelve el JSON
    })
    .then(data => {
        console.log('Actor creado:', data);
        return data; // devolvemos los datos al que lo llama
    })
    .catch(error => {
        console.error('Error en createActor:', error.message);
        throw error; // para que lo pueda manejar quien lo llama
    });
}
/*export async function createActor({name}) {
    console.log('Creando actor, enviando request')
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    });
    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
        throw new Error('Error al crear el actor');
    }

    return await response.json(); // Esto incluirá el ID generado
}
*/
export async function getActors() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener actores');
    return await response.json();
}

export async function getActorDetails(id) {
    console.log(`id: ${id}`)
    const response = await fetch(API_URL + '/' + id);
    if (!response.ok) throw new Error('Error al obtener detalles de actor');
    return await response.json();
}

export async function editActor(id, {name}) {
    try {
        const response = await fetch(API_URL + '/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(id), name }),
        });

        if (!response.ok) {
        throw new Error("Error al actualizar");
        }
    }
    catch (error) {
        return error.message;
    }
}

export async function deleteActor(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el actor');
  }
}
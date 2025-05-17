import { useEffect, useState } from 'react';
import {getActors, deleteActor} from '../../services/actors.js';
import { Link } from 'react-router-dom';

function ActorsList() {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        getActors().then(setActors).catch(console.error);
    }, []);

    const handleDelete = async (actor) => {
    const confirmed = window.confirm(`¿Seguro que desea eliminar a ${actor.name}?`);
    if (!confirmed) return;

    try {
        await deleteActor(actor.id);
        // Podés recargar lista o navegar a otra ruta
        const updatedActors = await getActors();
        setActors(updatedActors);
        } catch (err) {
        console.error('Error al borrar actor:', err);
        alert('No se pudo eliminar');
        }
    };

    return (
        <div>
            <h2>Actors</h2>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map(actor => (
                    <tr key={actor.id}>
                        <td>{actor.name}</td>
                        <td className='actions'>
                            <Link className='update' to={`/actors/${actor.id}/update`}>Update</Link>
                            <button className="link-like delete" onClick={() => handleDelete(actor)}>Delete</button>
                            <Link className='details' to={`/actors/${actor.id}/details`}>Details</Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/actors/create">Create Actor</Link>
        </div>
    );
}

export default ActorsList;

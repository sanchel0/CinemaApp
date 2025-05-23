import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll, remove } from '../../services/cinemas';

export default function CinemasList() {
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    getAll()
      .then(setCinemas)
      .catch(console.error);
  }, []);

  const handleDelete = async (cinema) => {
    const confirmed = window.confirm(`¿Seguro que desea eliminar el cine "${cinema.name}"?`);
    if (!confirmed) return;

    try {
      await remove(cinema.id);
      const updated = await getAll();
      setCinemas(updated);
    } catch (err) {
      console.error(`Error al borrar ${cinema.name}:`, err);
      alert('No se pudo eliminar');
    }
  };

  return (
    <div>
      <h2>Cinemas</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>City</th>
            <th>State</th>
            <th>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {cinemas.map((cinema) => (
            <tr key={cinema.id}>
              <td>{cinema.name}</td>
              <td>{cinema.country}</td>
              <td>{cinema.city}</td>
              <td>{cinema.state}</td>
              <td>{cinema.isActive ? 'Yes' : 'No'}</td>
              <td className="actions">
                <Link className="update" to={`/cinemas/${cinema.id}/update`}>Update</Link>
                <button className="link-like delete" onClick={() => handleDelete(cinema)}>Delete</button>
                <Link className="details" to={`/cinemas/${cinema.id}/details`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/cinemas/create">Create Cinema</Link>
    </div>
  );
}
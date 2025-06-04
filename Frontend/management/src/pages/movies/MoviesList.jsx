import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getAll, remove} from '../../services/movies.js';

export default function MoviesList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAll()
      .then(setItems)
      .catch(console.error);
  }, []);

  const handleDelete = async (item) => {
    const confirmed = window.confirm(`¿Seguro que desea eliminar a ${item.name}?`);
    if (!confirmed) return;

    try {
      await remove(item.id);
      const updated = await getAll();
      setItems(updated);
    } catch (err) {
      console.error(`Error al borrar ${item.title}:`, err);
      alert('No se pudo eliminar');
    }
  };

  return (
    <div>
      <h2>Movies</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>Classification</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.duration} min</td>
              <td>{movie.classification}</td>
              <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
              <td className="actions">
                <Link className="update" to={`/movies/${movie.id}/update`}>Update</Link>
                <button className="link-like delete" onClick={() => handleDelete(movie)}>Delete</button>
                <Link className="details" to={`/movies/${movie.id}/details`}>Details</Link>
              </td>
              <td>
                <details>
                  <summary>Details</summary>
                  <p><strong>Actors:</strong> {movie.actors.map(a => a.name).join(', ')}</p>
                  <p><strong>Directors:</strong> {movie.directors.map(d => d.name).join(', ')}</p>
                  <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/movies/create">Create Movie</Link>
    </div>
  );
}
/*
<td>{movie.actors.map(a => a.name).join(', ')}</td>
<td>{movie.directors.map(d => d.name).join(', ')}</td>
<td>{movie.genres.map(g => g.name).join(', ')}</td>

alternativa:
              <td>
                <details>
                  <summary>Details</summary>
                  <p><strong>Actors:</strong> {movie.actors.map(a => a.name).join(', ')}</p>
                  <p><strong>Directors:</strong> {movie.directors.map(d => d.name).join(', ')}</p>
                  <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
                </details>
              </td>
*/
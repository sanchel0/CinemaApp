import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll, remove } from '../../services/showtimes';

export default function ShowtimesList() {
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    getAll()
      .then(setShowtimes)
      .catch(console.error);
  }, []);

  const handleDelete = async (showtime) => {
    const confirmed = window.confirm(`¿Seguro que desea eliminar el showtime de la película "${showtime.movieTitle}"?`);
    if (!confirmed) return;

    try {
      await remove(showtime.id);
      const updated = await getAll();
      setShowtimes(updated);
    } catch (err) {
      console.error(`Error al borrar showtime:`, err);
      alert('No se pudo eliminar');
    }
  };
function toDateTimeLocalString(date) {
        const pad = (n) => n.toString().padStart(2, '0');
        return date.getFullYear() + '-' +
                pad(date.getMonth() + 1) + '-' +
                pad(date.getDate()) + 'T' +
                pad(date.getHours()) + ':' +
                pad(date.getMinutes());
    }
  return (
    <div>
      <h2>Showtimes</h2>
      <table>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Auditorium</th>
            <th>Start Time</th>
          </tr>
        </thead>
        <tbody>
          {showtimes.map((item) => (
            <tr key={item.id}>
              <td>{item.movieTitle}</td>
              <td>{item.auditoriumName}</td>
              <td>{new Date(item.startTime + "Z").toLocaleString()}</td>
                {console.log(item.startTime + "Z")}
                {console.log(new Date(item.startTime + "Z").toISOString())}
                {console.log(new Date(item.startTime + "Z").toString())}
                {console.log(new Date(item.startTime + "Z").toLocaleString())}
              <td className="actions">
                <Link className="update" to={`/showtimes/${item.id}/update`}>Update</Link>
                <button className="link-like delete" onClick={() => handleDelete(item)}>Delete</button>
                <Link className="details" to={`/showtimes/${item.id}/details`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/showtimes/create">Create Showtime</Link>
    </div>
  );
}

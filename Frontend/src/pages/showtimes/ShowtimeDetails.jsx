import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDetails } from '../../services/showtimes';
import { getDetails as getAuditoriumById } from '../../services/auditoriums.js';
import { getDetails as getCinemaById } from '../../services/cinemas.js';
import EntityLayout from '../../components/layouts/EntityLayout';

export default function ShowtimeDetails() {
  const { id } = useParams();
  const [showtime, setShowtime] = useState(null);
  const [cinema, setCinema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDetails(id)
        .then(showtimeData => {
            setShowtime(showtimeData);
            return getAuditoriumById(showtimeData.auditoriumId);
        })
        .then(audiData => {
            return getCinemaById(audiData.cinemaId);
        })
        .then(cinemaData => {
            setCinema(cinemaData);
            setLoading(false);
        })
        .catch(err => {
            setError('Error al obtener detalles: ' + err.message);
            setLoading(false);
        });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!showtime) return <div>Showtime not found.</div>;

  return (
    <EntityLayout entityName="showtimes">
      <h2>Showtime Details</h2>
      <div className="details">
        <p><strong>ID:</strong> {showtime.id}</p>
        <p><strong>Movie:</strong> {showtime.movieTitle}</p>
        <p><strong>Auditorium:</strong> {showtime.auditoriumName}</p>
        <p><strong>Cinema:</strong> {cinema.name}</p>
        <p><strong>Start Time (local):</strong> {new Date(showtime.startTime).toLocaleString()}</p>
        <p><strong>Cinema Timezone:</strong> {cinema.timezone}</p>
      </div>
    </EntityLayout>
  );
}

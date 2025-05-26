import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from '../../services/showtimes.js';
import { getAll as getMovies } from '../../services/movies.js';
import { getAll as getAuditoriums } from '../../services/auditoriums.js';
import { getDetails as getCinemaById } from '../../services/cinemas.js';
import EntityLayout from '../../components/layouts/EntityLayout';

export default function CreateShowtime() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [auditoriums, setAuditoriums] = useState([]);
  const [cinema, setCinema] = useState(null);

  useEffect(() => {
      async function getMoviesAndAuditoriums() {
          try {
          const movs = await getMovies();
          setMovies(movs);
          } catch (error) {
          console.error('Error cargando cinemas:', error);
          }
          try {
          const audits = await getAuditoriums();
          setAuditoriums(audits);
          } catch (error) {
          console.error('Error cargando auditorios:', error);
          }
      }
      getMoviesAndAuditoriums();
  }, []);

  const handleAuditoriumChange = async (e) => {
    const id = parseInt(e.target.value);

    const selectedAuditorium = auditoriums.find(a => a.id === id);
    if (!selectedAuditorium){
      setCinema(null);
      return;
    } 
    const cinemaData = await getCinemaById(selectedAuditorium.cinemaId);
    setCinema(cinemaData);
    console.log(cinema)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;

    if (form.checkValidity()) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const movieId = parseInt(data.movieId);
        const auditoriumId = parseInt(data.auditoriumId);
        
        const showtimeData = {
            startTime: new Date(data.startTime).toISOString(),
            movieId: movieId,
            auditoriumId: auditoriumId
        }
        try {
            const created = await create(showtimeData);
            alert(`Creado con ID: ${created.id}`);
            navigate('/showtimes');
        } 
        catch (error) {
            alert('Error creando showtime: ' + error.message);
        } 
    }
    else {
    alert('Todos los campos son obligatorios');
    form.reportValidity();
    }
  };

  return (
    <EntityLayout entityName='showtimes'>
      <h2>Create Showtime</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <select  name="movieId" required>
        <option value="" disabled>Seleccione una movie</option>
        {movies.map(item => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
        </select>

        <select  name="auditoriumId" required onChange={handleAuditoriumChange}>
        <option value="">Seleccione un auditorium</option>
        {auditoriums.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
        </select>

        <div>
          <label htmlFor="start-time">
            Start Time
            {cinema ? (
              <span style={{ color: 'gray'}}> (Local time at cinema "{cinema.name}": {cinema.timezone})</span>
            ) : (
              <span style={{ color: 'gray', fontStyle: 'italic' }}> (Please select an auditorium to see cinema timezone)</span>
            )}
          </label>
          <input
            id="start-time"
            name="startTime"
            type="datetime-local"
            required
          />
          {cinema && (
            <small style={{ color: 'gray' }}>
              Enter the showtime in the cinema's local time ({cinema.timezone}).
            </small>
          )}
        </div>

        <button type="submit">Create</button>
      </form>
    </EntityLayout>
  );
}

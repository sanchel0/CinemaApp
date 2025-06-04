import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetails, edit } from '../../services/showtimes.js';
import { getAll as getMovies } from '../../services/movies.js';
import { getAll as getAuditoriums } from '../../services/auditoriums.js';
import { getDetails as getCinemaById } from '../../services/cinemas.js';
import EntityLayout from '../../components/layouts/EntityLayout';

export default function EditShowtime() {
    const { id } = useParams();
    const formRef = useRef(null);
    const [itemData, setItemData] = useState(null);
    const navigate = useNavigate();
  
    const [movies, setMovies] = useState([]);
    const [auditoriums, setAuditoriums] = useState([]);
    const [cinema, setCinema] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            getDetails(id)
              .then(data => {
                setItemData(data);
                setLoading(false);
              })
              .catch(err => {
                setError('Error cargando: ' + err);
                setLoading(false);
              }
            );
    }, [id]);
        
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
                id: parseInt(id),
                startTime: new Date(data.startTime).toISOString(),
                movieId: movieId,
                auditoriumId: auditoriumId
            }
            console.log(showtimeData)
            console.log(new Date(showtimeData.startTime).toLocaleString())
            console.log(toDateTimeLocalString(new Date(showtimeData.startTime)))
            try {
                await edit(id, showtimeData);
                alert(`Actualizado correctamente`);
                navigate('/showtimes');
            } 
            catch (error) {
                alert('Error al actualizar: ' + error.message);
            }
        }
        else {
        alert('Todos los campos son obligatorios');
        form.reportValidity();
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

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <EntityLayout entityName='showtimes'>
        <h2>Edit Showtime</h2>
        <form ref={formRef} onSubmit={handleSubmit}>

            <select  name="movieId" required>
            <option value="" disabled>Seleccione una movie</option>
            {movies.map(item => (
            <option key={item.id} value={item.id} defaultValue={itemData.movieId}>
                {item.title}
            </option>
            ))}
            </select>

            <select  name="auditoriumId" required onChange={handleAuditoriumChange}>
            <option value="" disabled>Seleccione un auditorium</option>
            {auditoriums.map(item => (
            <option key={item.id} value={item.id} defaultValue={itemData.auditoriumId}>
                {item.name}
            </option>
            ))}
            </select>

            <div>
                <label htmlFor="start-time">Start Time:</label>
                <input
                    id="start-time"
                    name="startTime"
                    type="datetime-local"
                    defaultValue={toDateTimeLocalString(new Date(itemData.startTime + "Z"))}
                    required
                />
            </div>

            <button type="submit">Save</button>
        </form>
        </EntityLayout>
    );
}

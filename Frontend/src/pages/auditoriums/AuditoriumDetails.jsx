import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDetails } from '../../services/auditoriums';
import EntityLayout from '../../components/layouts/EntityLayout';

export default function AuditoriumDetails() {
    const { id } = useParams();
    const [auditorium, setAuditorium] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getDetails(id)
            .then(data => {
            setAuditorium(data);
            setLoading(false);
            })
            .catch(err => {
            setError('Error al obtener detalles: ' + err.message);
            setLoading(false);
        });
    }, [id]);
    
    const get = () => {
        const groupedSeats = auditorium.seats.reduce((acc, seat) => {
            if (!acc[seat.row]) acc[seat.row] = [];
            acc[seat.row].push(seat.number);
            return acc;
            }, {}
        );
        return groupedSeats;
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!auditorium) return <div>No se encontró el auditorium</div>;
    
    return(
        <EntityLayout entityName='auditoriums'>
            <h2>Auditorium Details</h2>
            <div className="details">
                <p><strong>ID:</strong> {auditorium.id}</p>
                <p><strong>Name:</strong> {auditorium.name}</p>
                <p><strong>Cinema:</strong> {auditorium.cinemaName}</p>
                <p><strong>Capacity:</strong> {auditorium.capacity}</p>
                <h3>Seats:</h3>
                <div className="grid">
                    <div className="grid-seats seats-display">
                        <div className="seat-wrapper">
                            {Object.entries(get()).map(([row, numbers]) => (
                            <div key={row} className="row">
                            {numbers.map(num => (
                                <span key={num} className="seat">{row}-{num}</span>
                            ))}
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </EntityLayout>
    )
}
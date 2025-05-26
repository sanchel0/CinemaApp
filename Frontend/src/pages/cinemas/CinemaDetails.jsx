import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDetails } from '../../services/cinemas';
import EntityLayout from '../../components/layouts/EntityLayout';

export default function CinemaDetails() {
  const { id } = useParams();
  const [cinema, setCinema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDetails(id)
      .then(data => {
        setCinema(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al obtener detalles del cine: ' + err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!cinema) return <div>No se encontró el cine</div>;

  return (
    <EntityLayout entityName="cinemas">
      <h2>Cinema Details</h2>
      <div className="details">
        <p><strong>ID:</strong> {cinema.id}</p>
        <p><strong>Name:</strong> {cinema.name}</p>
        <p><strong>Country:</strong> {cinema.country}</p>
        <p><strong>State:</strong> {cinema.state}</p>
        <p><strong>City:</strong> {cinema.city}</p>
        <p><strong>Address:</strong> {cinema.address}</p>
        <p><strong>Location:</strong> {cinema.location}</p>
        <p><strong>Postal Code:</strong> {cinema.postalCode}</p>
        <p><strong>Time Zone:</strong> {cinema.timeZone}</p>
        <p><strong>Phone Number:</strong> {cinema.phoneNumber}</p>
        <p><strong>Email:</strong> {cinema.email}</p>
        <p><strong>Opening Time:</strong> {cinema.openingTime}</p>
        <p><strong>Closing Time:</strong> {cinema.closingTime}</p>
        <p><strong>Active:</strong> {cinema.isActive ? 'Yes' : 'No'}</p>

        {cinema.auditoriums && cinema.auditoriums.length > 0 && (
          <>
            <p><strong>Auditoriums:</strong></p>
            <ul>
              {cinema.auditoriums.map((a) => (
                <li key={a.id}>
                  {a.name} - {a.capacity} seats
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </EntityLayout>
  );
}
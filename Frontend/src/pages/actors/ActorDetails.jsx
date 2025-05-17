import {getActorDetails} from '../../services/actors.js';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ActorLayout from '../../components/layouts/ActorLayout.jsx';

export default function ActorDetails() {
   const { id } = useParams();
   
   const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Envinado fetch...')
    getActorDetails(id)
    .then(details => {
        setName(details.name)
        setLoading(false);
    })
    .catch((error) => {
      setError('Error fetching actor details: ' + error);
      setLoading(false);
    })
  },[id])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ActorLayout>
        <h2>Actor Details</h2>
        <div className="actor-details">
          <div className="detail-item">
            <span className="label">ID:</span>
            <span className="value">{id}</span>
          </div>
          <div className="detail-item">
            <span className="label">Name:</span>
            <span className="value">{name}</span>
          </div>
        </div>
    </ActorLayout>
  );
}
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EntityLayout from '../../components/layouts/EntityLayout';

export default function EntityDetails({ entityName, displayName, getDetails }) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDetails(id)
      .then(data => {
        setName(data.name);
        setLoading(false);
      })
      .catch(err => {
        setError('Error: ' + err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <EntityLayout entityName={entityName}>
      <h2>{displayName} Details</h2>
      <div className="entity-details">
          <div className="detail-item">
            <span className="label">ID:</span>
            <span className="value">{id}</span>
          </div>
          <div className="detail-item">
            <span className="label">Name:</span>
            <span className="value">{name}</span>
          </div>
        </div>
    </EntityLayout>
  );
}
//<div className="actor-details"> cambia actor-details a solo details.
//agregar un layout
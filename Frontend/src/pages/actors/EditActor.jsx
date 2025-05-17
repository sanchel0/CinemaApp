import { useState, useEffect } from 'react';
import {getActorDetails, editActor} from '../../services/actors.js';
import { useParams, useNavigate } from 'react-router-dom';
import ActorLayout from '../../components/layouts/ActorLayout.jsx';

export default function EditActor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState({ name: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    getActorDetails(id)
    .then(actorDetails => {
      setName(actorDetails.name);
      setLoading(false);
    })
    .catch((error) => {
      setError('Error fetching actor details: ' + error);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editActor(id, {name} );
      alert('Actor actualizado correctamente');
      navigate("/actor");
    } catch (error) {
      alert('Error al actualizar actor: ' + error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ActorLayout>
      <h2>Edit Actor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        
        <button type="submit">Submit</button>
      </form>
    </ActorLayout>
  );
}

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EntityLayout from '../../components/layouts/EntityLayout';

export default function EditEntity({entityName, displayName, getDetails, edit}) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState({ name: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getDetails(id)
        .then(entityDetails => {
        setName(entityDetails.name);
        setLoading(false);
        })
        .catch((error) => {
        setError('Error fetching details: ' + error);
        setLoading(false);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
      await edit(id, {name} );
      alert('Actualizado correctamente');
      navigate(`/${entityName[0].toLowerCase() + entityName.slice(1)}`);
    } catch (error) {
      alert('Error al actualizar: ' + error);
    }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    
    return(
        <EntityLayout entityName={entityName}>
              <h2>Edit {displayName}</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                
                <button type="submit">Save</button>
              </form>
            </EntityLayout>
    )
}
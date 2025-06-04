import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntityLayout from '../../components/layouts/EntityLayout';

function CreateEntity({ entityName, displayName, create }) {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEntity = await create({ name });
            console.log(newEntity.name);
            console.log(`${entityName[0].toUpperCase() + entityName.slice(1)} creado con ID:`, newEntity.id);
            navigate(`/${entityName[0].toLowerCase() + entityName.slice(1)}`);
        } catch (error) {
            alert(`No se pudo crear el ${entityName[0].toLowerCase() + entityName.slice(1)}: ` + error);
        }
    };

    return (
        <EntityLayout entityName={entityName}>
            <h2>Create {displayName}</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                />
                <button type="submit">Create</button>
            </form>
        </EntityLayout>
    );
}

export default CreateEntity;
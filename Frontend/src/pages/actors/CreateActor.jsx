import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {createActor} from '../../services/actors.js';
import ActorLayout from '../../components/layouts/ActorLayout.jsx';

function CreateActor() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newActor = await createActor({ name });
            console.log(newActor.name);
            console.log('Actor creado con ID:', newActor.id);
            navigate('/actors');
        } catch (error) {
            alert('No se pudo crear el actor: ' + error);
        }
    };

    return (
        <ActorLayout>
            <h2>Create Actor</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </ActorLayout>
    );
}

export default CreateActor;

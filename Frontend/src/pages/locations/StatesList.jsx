import { useState, useEffect, useRef } from 'react';
import { getStatesByCountryId } from '../../services/locations/states';

const StatesList = ({ country, openModal }) => {
    const [states, setStates] = useState([]);
    const [selectedStateId, setSelectedStateId] = useState(null);

    useEffect(() => {
      getStatesByCountryId(country.id)
        .then(setStates)
        .catch(console.error);
    },[]);

    const handleViewCities = (stateId) => {
      setSelectedStateId(stateId);
    };

    return(
        <>
            <h2>{country.name[0].toUpperCase() + country.name.slice(1)} country's states</h2>
            
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {states.map((s) => (
                    <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>
                        <button onClick={() => openModal('state', {...s})}>Edit</button>
                        <button onClick={() => handleViewCities(s.id)}>View States</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button onClick={() => openModal('state')}>Create State</button>
            {/*selectedCountryId && (
                <StateList countryId={selectedCountryId} />
            )*/}
        </>
    )
}

export default StatesList;
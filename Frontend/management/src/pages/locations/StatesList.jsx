import { getStatesByCountryId, deleteState } from '../../services/locations/states';
import CitiesList from './CitiesList';
import useEntityList from '../../hooks/useEntityList';

const StatesList = ({ country, openModal }) => {
    const { items: states, selected: selectedState, setSelected: setSelectedState, refresh: handleRefresh, handleDelete } = useEntityList({
    fetchList: getStatesByCountryId,
    deleteItem: deleteState,
    fetchId: country.id,
  });
  
    return(
        <>
            <h2>States of {country.name[0].toUpperCase() + country.name.slice(1)}</h2>
            
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
                        <button onClick={() => openModal('state', {...s}, handleRefresh)}>Edit</button>
                         <button onClick={() => handleDelete(s)}>Delete</button>
                        <button onClick={() => setSelectedState(s)}>View Cities</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button onClick={() => openModal('state', {countryId: country.id}, handleRefresh)}>Create State</button>

            {selectedState && (
                <CitiesList 
                    state={selectedState}
                    openModal={openModal} 
                />
            )}
        </>
    )
}

export default StatesList;
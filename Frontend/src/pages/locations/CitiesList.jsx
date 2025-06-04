import { getCitiesByStateId, deleteCity } from '../../services/locations/cities';
import useEntityList from '../../hooks/useEntityList';

const CitiesList = ({ state, openModal }) => {
    const { items: cities, refresh: handleRefresh, handleDelete } = useEntityList({
    fetchList: getCitiesByStateId,
    deleteItem: deleteCity,
    fetchId: state.id,
  });

    return(
        <>
            <h2>Cities of {state.name[0].toUpperCase() + state.name.slice(1)}</h2>
            
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Time Zone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cities.map((c) => (
                    <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.timeZone}</td>
                    <td>
                        <button onClick={() => openModal('city', {...c}, handleRefresh)}>Edit</button>
                        <button onClick={() => handleDelete(c)}>Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button onClick={() => openModal('city', {stateId: state.id}, handleRefresh)}>Create City</button>
        </>
    )
}

export default CitiesList;
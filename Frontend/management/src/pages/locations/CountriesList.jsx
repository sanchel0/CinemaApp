import useEntityModal from '../../hooks/useEntityModal';
import EntityModalRenderer from '../../components/modal/EntityModalRenderer';
import { createOrUpdate as createOrUpdateCountry, getCountries, deleteCountry } from '../../services/locations/countries';
import { createOrUpdate as createOrUpdateState } from '../../services/locations/states';
import { createOrUpdate as createOrUpdateCity } from '../../services/locations/cities';
import StatesList from './StatesList';
import useEntityList from '../../hooks/useEntityList';

const CountriesList = () => {
    const { items: countries, selected: selectedCountry, setSelected: setSelectedCountry, refresh: handleRefresh, handleDelete } = useEntityList({
    fetchList: getCountries,
    deleteItem: deleteCountry,
  });
  
  const { modalData, openModal, closeModal } = useEntityModal();

    const handleSubmit = (entity, data) => {
      console.log(`Saving ${entity}`, data);
      
      const handlers = {
        country: createOrUpdateCountry,
        state: createOrUpdateState,
        city: createOrUpdateCity
      };
      const action = handlers[entity];

      if (!action) return;

      return action(data)
        .then((savedItem) => {
          console.log(`${entity} saved`, savedItem);
          return savedItem; // devolvemos el dato para que lo use el modal si quiere
        })
        .catch((err) => {
          console.error(`Error saving ${entity}`, err);
          alert(`Error saving ${entity}: ${err.message}`);
          throw err; // lo volvemos a lanzar si querés capturarlo en otro lado
        });
    };

    return(
      <>
        <h1>Locations</h1>
        <h2>Countries</h2>
        <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ISO</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.isoCode}</td>
              <td>{c.email}</td>
              <td>{c.phoneNumber}</td>
              <td>
                <button onClick={() => openModal('country', {...c}, handleRefresh)}>Edit</button>
                 <button onClick={() => handleDelete(c)}>Delete</button>
                <button onClick={() => setSelectedCountry(c)}>View States</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={() => openModal('country', {}, handleRefresh)}>Create Country</button>
      

      {selectedCountry && (
        <StatesList 
          country={selectedCountry}
          openModal={openModal}
        />
      )}

        <EntityModalRenderer
          modalData={modalData}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
        

      </>
    )
}
export default CountriesList;
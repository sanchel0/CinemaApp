import { useState, useEffect, useRef } from 'react';
import useEntityModal from '../../hooks/useEntityModal';
import EntityModalRenderer from '../../components/modal/EntityModalRenderer';
import { createOrUpdate, getCountries } from '../../services/locations/countries';
import { createState } from '../../services/locations/states';
import StatesList from './StatesList';

const CountriesList = () => {
    const { modalData, openModal, closeModal } = useEntityModal();
    
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
      getCountries()
        .then(setCountries)
        .catch(console.error);
    },[]);

    const handleViewStates = (countryId) => {
      setSelectedCountry(countryId);
    };

    const handleSubmit = (entity, data) => {
      console.log(`Saving ${entity}`, data);
      switch(entity) {
        case 'country':
          createOrUpdate(data).then((data) => alert('Item: '+ data)).catch();
          break;
        case 'state':
          createState(data).then().catch();
          break;
        // otros
      }
    };

    return(
      <>
        <h1>Demo Modal</h1>
        
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
                <button onClick={() => openModal('country', {...c})}>Edit</button>
                <button onClick={() => handleViewStates(c)}>View States</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={() => openModal('country')}>Create Country</button>
      

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
          countries={[{ id: 1, name: 'USA' }, { id: 2, name: 'Canada' }]}
        />
        

      </>
    )
}
export default CountriesList;
import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal'
import { getCountries } from '../../services/locations/countries';

export default function StateModal ({ show, onClose, onSubmit, initialValues = {}}) {
  const formRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(initialValues.countryId || '');
  const isEdit = initialValues && initialValues.id != null;

  useEffect(() => {
        getCountries()
          .then(setCountries)
          .catch(console.error);
      },[]);
    
  useEffect(() => {
    const form = formRef.current;
    if (form && initialValues) {
      Object.entries(initialValues).forEach(([k, v]) => {
        if (form.elements[k]) form.elements[k].value = v;
      });
    }
  }, [initialValues, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (form.checkValidity()) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      if (initialValues.id) {
        data.id = initialValues.id;
      }
      onSubmit(data);
    }
    else {
        alert('Todos los campos son obligatorios');
        form.reportValidity();
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Modal.Header onClose={onClose}>
          <Modal.Title>{isEdit ? "Edit" : "Create"} State</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input name="name" placeholder="Name" />
          <select name="countryId" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="">Select Country</option>
            {countries.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">Save</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

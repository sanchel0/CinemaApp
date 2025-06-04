import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal'
import { getStates } from '../../services/locations/states';

export default function CityModal ({ show, onClose, onSubmit, initialValues = {}}) {
  const formRef = useRef(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(initialValues.stateId || '');
  const isEdit = initialValues && initialValues.id != null;

  useEffect(() => {
        getStates()
          .then(setStates)
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
          <Modal.Title>{isEdit ? "Edit" : "Create"} City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input name="name" placeholder="Name" />
          <input name="timeZone" placeholder="Time Zone" />
          <select name="stateId" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">Select State</option>
            {states.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
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

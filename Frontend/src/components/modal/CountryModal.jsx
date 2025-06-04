import React, { useEffect, useRef } from 'react';
import Modal from './Modal'

export default function CountryModal ({ show, onClose, onSubmit, initialValues = {} }) {
  const formRef = useRef(null);

  const isEdit = initialValues && Object.keys(initialValues).length > 0;

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
      if (data.phoneNumber && !data.phoneNumber.startsWith('+')) {
        data.phoneNumber = '+' + data.phoneNumber;
      }
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
          <Modal.Title>{isEdit ? "Edit" : "Create"} Country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" name="name" placeholder="Name" defaultValue={initialValues?.name || ''} required />
          <input type="text" name="isoCode" placeholder="ISO Code" defaultValue={initialValues?.isoCode || ''} required />
          <input type="email" name="email" placeholder="Email" defaultValue={initialValues?.email || ''} />
          <input type="text" pattern="^\+?[0-9]+$" inputMode="numeric" name="phoneNumber" placeholder="Enter phone number with country code (e.g. +52)" defaultValue={initialValues?.phoneNumber || ''} />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">Save</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from '../../services/cinemas';
import EntityLayout from '../../components/layouts/EntityLayout';

function CreateCinema() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;

    if (form.checkValidity()) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        console.log('Datos válidos:', data);
        alert('Formulario enviándose...');
        
        const newCinemaData = {
            name: form.name.value,
            country: form.country.value,
            city: form.city.value,
            state: form.state.value,
            location: form.location.value,
            address: form.address.value,
            postalCode: form.postalCode.value,
            phoneNumber: form.phoneNumber.value,
            email: form.email.value,
            openingTime: form.openingTime.value + ':00',
            closingTime: form.closingTime.value + ':00',
            isActive: form.isActive.checked,
        };

        try {
            const newCinema = await create(newCinemaData);
            alert(`Cinema creado con ID: ${newCinema.id}`);
            navigate('/cinemas');
        } catch (error) {
            alert('Error creando cinema: ' + (error.message || error));
        }
    }
    else {
        alert('Todos los campos son obligatorios');
        form.reportValidity();
    }
  };

  return (
    <EntityLayout entityName="cinemas">
      <h2>Create Cinema</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" type="text" required autoFocus />

        <label>Country:</label>
        <input name="country" type="text" required />

        <label>City:</label>
        <input name="city" type="text" required />

        <label>State:</label>
        <input name="state" type="text" required />

        <label>Location:</label>
        <input name="location" type="text" required />

        <label>Address:</label>
        <input name="address" type="text" required />

        <label>Postal Code:</label>
        <input name="postalCode" type="text" required />

        <label>Phone Number:</label>
        <input name="phoneNumber" type="text" required />

        <label>Email:</label>
        <input name="email" type="email" required />

        <label>Opening Time (HH:mm):</label>
        <input name="openingTime" type="time" required />

        <label>Closing Time (HH:mm):</label>
        <input name="closingTime" type="time" required />

        <label>
          Active:
          <input name="isActive" type="checkbox" defaultChecked />
        </label>

        <button type="submit">Create</button>
      </form>
    </EntityLayout>
  );
}

export default CreateCinema;

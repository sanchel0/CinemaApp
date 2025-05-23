import { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetails, edit } from '../../services/cinemas';
import EntityLayout from '../../components/layouts/EntityLayout';

function EditCinema() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cinemaData, setCinemaData] = useState(null);

  useEffect(() => {
    getDetails(id)
      .then(data => {
        setCinemaData(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error cargando el cine: ' + err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;

    if (form.checkValidity()) {

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Datos válidos:', data);
        alert('Formulario enviándose...');
        const updatedCinema = {
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
        await edit(id, updatedCinema);
        alert('Cinema actualizado correctamente');
        navigate('/cinemas');
      } catch (error) {
        alert('Error al actualizar cinema: ' + (error.message || error));
      }
    } else {
      alert('Por favor, complete todos los campos correctamente');
      form.reportValidity();
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <EntityLayout entityName="cinemas">
      <h2>Edit Cinema</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" type="text" defaultValue={cinemaData.name} required autoFocus />

        <label>Country:</label>
        <input name="country" type="text" defaultValue={cinemaData.country} required />

        <label>City:</label>
        <input name="city" type="text" defaultValue={cinemaData.city} required />

        <label>State:</label>
        <input name="state" type="text" defaultValue={cinemaData.state} required />

        <label>Location:</label>
        <input name="location" type="text" defaultValue={cinemaData.location} required />

        <label>Address:</label>
        <input name="address" type="text" defaultValue={cinemaData.address} required />

        <label>Postal Code:</label>
        <input name="postalCode" type="text" defaultValue={cinemaData.postalCode} required />

        <label>Phone Number:</label>
        <input name="phoneNumber" type="text" defaultValue={cinemaData.phoneNumber} required />

        <label>Email:</label>
        <input name="email" type="email" defaultValue={cinemaData.email} required />

        <label>Opening Time (HH:mm):</label>
        <input name="openingTime" type="time" defaultValue={cinemaData.openingTime.slice(0,5)} required />

        <label>Closing Time (HH:mm):</label>
        <input name="closingTime" type="time" defaultValue={cinemaData.closingTime.slice(0,5)} required />

        <label>
          Active:
          <input name="isActive" type="checkbox" defaultChecked={cinemaData.isActive} />
        </label>

        <button type="submit">Save</button>
      </form>
    </EntityLayout>
  );
}

export default EditCinema;

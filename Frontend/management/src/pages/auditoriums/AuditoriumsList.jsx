import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll, remove } from '../../services/auditoriums';

export default function AuditoriumsList() {
    const [auditoriums, setAuditoriums] = useState([]);
    
      useEffect(() => {
        getAll()
          .then(setAuditoriums)
          .catch(console.error);
      }, []);
    
      const handleDelete = async (auditorium) => {
        const confirmed = window.confirm(`¿Seguro que desea eliminar el auditorio "${auditorium.name}"?`);
        if (!confirmed) return;
    
        try {
          await remove(auditorium.id);
          const updated = await getAll();
          setAuditoriums(updated);
        } catch (err) {
          console.error(`Error al borrar ${auditorium.name}:`, err);
          alert('No se pudo eliminar');
        }
      };
      
      return(
        <div>
      <h2>Auditoriums</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cinema</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {auditoriums.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.cinemaName}</td>
              <td>{item.capacity}</td>
              <td className="actions">
                <Link className="update" to={`/auditoriums/${item.id}/update`}>Update</Link>
                <button className="link-like delete" onClick={() => handleDelete(item)}>Delete</button>
                <Link className="details" to={`/auditoriums/${item.id}/details`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/auditoriums/create">Create Auditorium</Link>
    </div>
    )
}
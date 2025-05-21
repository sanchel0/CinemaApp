import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function EntityList({ entityName, displayName, getAll, remove }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAll()
      .then(setItems)
      .catch(console.error);
  }, [entityName]);

  const handleDelete = async (item) => {
    const confirmed = window.confirm(`¿Seguro que desea eliminar a ${item.name}?`);
    if (!confirmed) return;

    try {
      await remove(item.id);
      const updated = await getAll();
      setItems(updated);
    } catch (err) {
      console.error(`Error al borrar ${entityName}:`, err);
      alert('No se pudo eliminar');
    }
  };

  return (
    <div>
      <h2>{entityName[0].toUpperCase() + entityName.slice(1)}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td className="actions">
                <Link className='update' to={`/${entityName}/${item.id}/update`}>Update</Link>
                <button className="link-like delete" onClick={() => handleDelete(item)}>Delete</button>
                <Link className='details' to={`/${entityName}/${item.id}/details`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/${entityName}/create`}>Create {displayName}</Link>
    </div>
  );
}

export default EntityList;

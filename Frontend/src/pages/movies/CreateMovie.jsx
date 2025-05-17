import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateMovie() {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  
  return (
    <div>
      <h2>Agregar Nueva Película</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Fecha de estreno:</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

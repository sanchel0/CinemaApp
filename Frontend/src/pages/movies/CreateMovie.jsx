import { useState, useEffect, useRef } from 'react';
import MovieLayout from '../../components/layouts/MovieLayout.jsx';

export default function CreateMovie() {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const [actor, setActor] = useState('');

  const [items, setItems] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [leavingItems, setLeavingItems] = useState([]);

  const [seleccionado, setSeleccionado] = useState(null);

  const [isAdding, setIsAdding] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    /*if (items.length > 0) {
      setIsVisible(true);
    }
    else{
      setIsVisible(false);
    }*/
    if (isAdding) {
      setIsAdding(false);
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [items, isAdding]);

  const handleAdd = () => {
    const valor = actor.trim();
    if (valor && !items.includes(valor)) {
      setIsAdding(true);
      
      setItems(prev => [...prev, valor]);
      setAddedItems(prev => [...prev, valor]);

      setTimeout(() => {
        setAddedItems(prev => prev.filter(i => i !== valor));
      }, 300); // igual al tiempo de la animación
    }
    
    setActor('');
  };

  const handleRemove = () => {
    if (seleccionado !== null) {
      setLeavingItems(prev => [...prev, seleccionado]);
      
      setTimeout(() => {
        setItems(prev => prev.filter(item => item !== seleccionado));
        setLeavingItems(prev => prev.filter(item => item !== seleccionado));
        setSeleccionado(null);
      }, 300);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <MovieLayout>
      <h2>Agregar Nueva Película</h2>
      <form className='container' onSubmit={handleSubmit}>
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

        <div>
          <label>Add an actor:</label>
          <input
            type="text"
            value={actor}
            onChange={e => setActor(e.target.value)}
            placeholder="Enter an actor's name..."
          />

          <div>
            <button className='add' type="button" onClick={handleAdd}>Add</button>
            <button className={`remove ${seleccionado ? 'activeBtn' : ''}`} type="button" onClick={handleRemove} disabled={!seleccionado}>Remove</button>
          </div>
          
          <div className='items-container'>
              <p className='items-title'>Actors:</p>
              {items.length > 0 && (
                <ul ref={listRef} className={`items`}>
                {items.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => setSeleccionado(item)}
                    className={`item ${item === seleccionado ? 'active' : 'inactive'} ${addedItems.includes(item) ? 'added' : ''} ${leavingItems.includes(item) ? 'leaving' : ''}`}
                  >
                    {item}
                  </li>
                ))}
                </ul>
              )
            }
          </div>
        </div>

        <button type="submit">Guardar</button>
      </form>
    </MovieLayout>
  );
}

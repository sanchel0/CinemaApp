import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieLayout from '../../components/layouts/MovieLayout.jsx';
import EntitySelector from '../../components/EntitySelector.jsx';
import useEntitySelector from '../../hooks/useEntitySelector.js';
import {create} from '../../services/movies.js';
import {getByName as getActorsByName, create as createActor} from '../../services/actors.js';
import {getByName as getDirectorsByName, create as createDirector} from '../../services/directors.js';
import {getByName as getGenresByName, create as createGenre} from '../../services/genres';

export default function CreateMovie() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [classification, setClassification] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const directorSelector = useEntitySelector();
  const actorSelector = useEntitySelector();
  const genreSelector = useEntitySelector();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const actorIds = actorSelector.items.map(actor => actor.id);
    const directorIds = directorSelector.items.map(director => director.id);
    const genreIds = genreSelector.items.map(genre => genre.id);

    const movieData = {
      title,
      description,
      duration: Number(duration),
      releaseDate: new Date(releaseDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      classification,
      posterUrl,
      actorIds,
      directorIds,
      genreIds
    };

    try {
      const createdMovie = await create(movieData);
      console.log('Pelicula creada:', createdMovie);
      navigate('/movies');
    } catch (error) {
      alert('Error al crear la película: ' + error.message);
    }
  }

  return (
    <MovieLayout>
      <h2>Create Movie</h2>
      <form className='container' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Título:</label>
          <input
            id='title'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='description'>Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='duration'>Duration (minutes):</label>
          <input
            id='duration'
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor='classification'>Classification:</label>
          <select
            id="classification"
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            required
          >
            <option value="">-- Select classification --</option>
            <option value="G">G - General Audience</option>
            <option value="PG">PG - Parental Guidance</option>
            <option value="PG-13">PG-13 - Parents Strongly Cautioned</option>
            <option value="R">R - Restricted</option>
            <option value="NC-17">NC-17 - Adults Only</option>
          </select>
        </div>

        <div>
          <label htmlFor='poster'>PosterUrl:</label>
          <input
            id='poster'
            type="url"
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='release-date'>Release Date:</label>
          <input
            id='release-date'
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='end-date'>End Date:</label>
          <input
            id='end-date'
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <EntitySelector
          title="Actors"
          placeholder="Enter an actor's name..."
          {...actorSelector}
          getByName={getActorsByName}
          createNew={createActor}
        />

        <EntitySelector
          title="Directors"
          placeholder="Enter a director's name..."
          value={directorSelector.value}
          setValue={directorSelector.setValue}
          handleAdd={directorSelector.handleAdd}
          handleRemove={directorSelector.handleRemove}
          items={directorSelector.items}
          setItems={directorSelector.setItems}
          selectedItem={directorSelector.selectedItem}
          setSelectedItem={directorSelector.setSelectedItem}
          selectedSuggestion={directorSelector.selectedSuggestion}
          setSelectedSuggestion={directorSelector.setSelectedSuggestion}
          addedItems={directorSelector.addedItems}
          leavingItems={directorSelector.leavingItems}
          listRef={directorSelector.listRef}
          getByName={getDirectorsByName}
          createNew={createDirector}
        />
        
        <EntitySelector
          title="Genres"
          placeholder="Enter a genre's name..."
          {...genreSelector}
          getByName={getGenresByName}
          createNew={createGenre}
        />

        <button type="submit">Guardar</button>
      </form>
    </MovieLayout>
  );
}

/*
  const [actor, setActor] = useState('');

  const [items, setItems] = useState([]);

  const [seleccionado, setSeleccionado] = useState(null);

  const [isAdding, setIsAdding] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
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
*/

/*
 <div>
          <h3>Actors</h3>
          <label htmlFor={`Actors-input`}>Name:</label>
          <input
            id={`Actors-input`}
            type="text"
            value={actor}
            onChange={e => setActor(e.target.value)}
            placeholder="Enter an actor's name..."
          />

          <div>
            <button className='add' type="button" onClick={handleAdd}>Add</button>
            <button className={`remove ${seleccionado ? 'activeBtn' : ''}`} type="button" onClick={handleRemove} disabled={!seleccionado}>Remove</button>
          </div>
          
          {items.length > 0 && (
            <div className='items-container'>
              <p className='items-title'>Added actors:</p>
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
            </div>)}
        </div>
*/
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetails, edit } from '../../services/movies';
import EntityLayout from '../../components/layouts/EntityLayout';
import EntitySelector from '../../components/EntitySelector.jsx';
import useEntitySelector from '../../hooks/useEntitySelector.js';
import {getByName as getActorsByName, create as createActor} from '../../services/actors.js';
import {getByName as getDirectorsByName, create as createDirector} from '../../services/directors.js';
import {getByName as getGenresByName, create as createGenre} from '../../services/genres';

function EditMovie() {
    const { id } = useParams();
    const navigate = useNavigate();

    const actorSelector = useEntitySelector();
    const directorSelector = useEntitySelector();
    const genreSelector = useEntitySelector();

    const [movie, setMovie] = useState({
        title: '',
        description: '',
        duration: 0,
        releaseDate: '',
        endDate: '',
        classification: '',
        posterUrl: '',
        actorIds: [],
        directorIds: [],
        genreIds: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDateForInput = (dateString) => {
        return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
    };

    useEffect(() => {
        getDetails(id)
        .then((data) => {
            setMovie(data);
            actorSelector.setItems(data.actors || []);
            directorSelector.setItems(data.directors || []);
            genreSelector.setItems(data.genres || []);
            console.log(movie)
            console.log(actorSelector.items)
            setLoading(false);
        })
        .catch((err) => {
            setError('Error al cargar la película: ' + err);
            setLoading(false);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMovie = {
            ...movie,
            actorIds: actorSelector.items.map(a => a.id),
            directorIds: directorSelector.items.map(d => d.id),
            genreIds: genreSelector.items.map(g => g.id)
        };

        try {
            await edit(id, updatedMovie);
            alert('Pelicula actualizada correctamente');
            navigate('/movies');
        } catch (error) {
        alert('Error al actualizar: ' + error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <EntityLayout entityName='movies'>
            <h2>Edit Movie</h2>
            <form onSubmit={handleSubmit}>
                <label>
                Title:
                <input
                    type="text"
                    value={movie.title}
                    onChange={(e) => setMovie({ ...movie, title: e.target.value })}
                />
                </label>
                <label>
                Description:
                <textarea
                    value={movie.description}
                    onChange={(e) => setMovie({ ...movie, description: e.target.value })}
                />
                </label>
                <label>
                Duration:
                <input
                    type="number"
                    value={movie.duration}
                    onChange={(e) => setMovie({ ...movie, duration: Number(e.target.value) })}
                />
                </label>
                <label>
                Release Date:
                <input
                    type="date"
                    value={formatDateForInput(movie.releaseDate)}
                    onChange={(e) => setMovie({ ...movie, releaseDate: e.target.value })}
                />
                </label>
                <label>
                End Date:
                <input
                    type="date"
                    value={formatDateForInput(movie.endDate)}
                    onChange={(e) => setMovie({ ...movie, endDate: e.target.value })}
                />
                </label>
                <label>
                Classification:
                <select
                    value={movie.classification}
                    onChange={(e) => setMovie({ ...movie, classification: e.target.value })}
                >
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="PG-13">PG-13</option>
                    <option value="R">R</option>
                    <option value="NC-17">NC-17</option>
                </select>
                </label>
                <label>
                Poster URL:
                <input
                    type="url"
                    value={movie.posterUrl}
                    onChange={(e) => setMovie({ ...movie, posterUrl: e.target.value })}
                />
                </label>

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
                {...directorSelector}
                getByName={getDirectorsByName}
                createNew={createDirector}
                />

                <EntitySelector
                title="Genres"
                placeholder="Enter a genre..."
                {...genreSelector}
                getByName={getGenresByName}
                createNew={createGenre}
                />

                <button type="submit">Save</button>
            </form>
        </EntityLayout>
    );
}

export default EditMovie;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetails } from '../../services/movies';
import EntityLayout from '../../components/layouts/EntityLayout';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDetails(id)
      .then((data) => {
        setMovie(data);  // Suponiendo que `data` es un objeto MovieDto
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al cargar la película: ' + err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <EntityLayout entityName='movies'>
      <h2>Movie Details</h2>
      <div>
        <p><strong>Title:</strong> {movie.title}</p>
        <p><strong>Description:</strong> {movie.description}</p>
        <p><strong>Duration:</strong> {movie.duration} minutes</p>
        <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(movie.endDate).toLocaleDateString()}</p>
        <p><strong>Classification:</strong> {movie.classification}</p>
        <p><strong>Poster URL:</strong> {movie.posterUrl}</p>
      </div>

      <p><strong>Actors</strong></p>
      <ul>
        {movie.actors.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>

      <p><strong>Directors</strong></p>
      <ul>
        {movie.directors.map((director) => (
          <li key={director.id}>{director.name}</li>
        ))}
      </ul>

      <p><strong>Genres</strong></p>
      <ul>
        {movie.genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </EntityLayout>
  );
}

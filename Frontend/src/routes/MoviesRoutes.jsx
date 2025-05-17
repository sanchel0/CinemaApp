import { Route } from 'react-router-dom';
import MoviesList from '../pages/movies/MoviesList';
import CreateMovie from '../pages/movies/CreateMovie';

export const MoviesRoutes = () => (
  <>
    <Route path="/movies" element={<MoviesList />} />
    <Route path="/movies/create" element={<CreateMovie />} />
  </>
);
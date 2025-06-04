import { Route } from 'react-router-dom';
import MoviesList from '../pages/movies/MoviesList';
import CreateMovie from '../pages/movies/CreateMovie';
import EditMovie from '../pages/movies/EditMovie';
import MovieDetails from '../pages/movies/MovieDetails';

export const MoviesRoutes = () => (
  <>
    <Route path="/movies" element={<MoviesList />} />
    <Route path="/movies/create" element={<CreateMovie />} />
    <Route path="/movies/:id/update" element={<EditMovie/>} />
    <Route path="/movies/:id/details" element={<MovieDetails/>} />
  </>
);
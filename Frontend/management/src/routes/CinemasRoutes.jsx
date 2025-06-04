import { Route } from 'react-router-dom';
import CinemasList from '../pages/cinemas/CinemasList';
import CreateCinema from '../pages/cinemas/CreateCinema';
import EditCinema from '../pages/cinemas/EditCinema';
import CinemaDetails from '../pages/cinemas/CinemaDetails';

export const CinemasRoutes = () => (
  <>
    <Route path="/cinemas" element={<CinemasList />} />
    <Route path="/cinemas/create" element={<CreateCinema />} />
    <Route path="/cinemas/:id/update" element={<EditCinema/>} />
    <Route path="/cinemas/:id/details" element={<CinemaDetails/>} />
  </>
);
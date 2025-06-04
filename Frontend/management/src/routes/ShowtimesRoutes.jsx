import { Route } from 'react-router-dom';
import ShowtimesList from '../pages/showtimes/ShowtimesList';
import CreateShowtime from '../pages/showtimes/CreateShowtime';
import EditShowtime from '../pages/showtimes/EditShowtime';
import ShowtimeDetails from '../pages/showtimes/ShowtimeDetails';

export const ShowtimesRoutes = () => (
  <>
    <Route path="/showtimes" element={<ShowtimesList />} />
    <Route path="/showtimes/create" element={<CreateShowtime />} />
    <Route path="/showtimes/:id/update" element={<EditShowtime/>} />
    <Route path="/showtimes/:id/details" element={<ShowtimeDetails/>} />
  </>
);
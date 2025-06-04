import { Route } from 'react-router-dom';
import AuditoriumsList from '../pages/auditoriums/AuditoriumsList';
import CreateAuditorium from '../pages/auditoriums/CreateAuditorium';
import EditAuditorium from '../pages/auditoriums/EditAuditorium';
import AuditoriumDetails from '../pages/auditoriums/AuditoriumDetails';

export const AuditoriumsRoutes = () => (
  <>
    <Route path="/auditoriums" element={<AuditoriumsList />} />
    <Route path="/auditoriums/create" element={<CreateAuditorium />} />
    <Route path="/auditoriums/:id/update" element={<EditAuditorium/>} />
    <Route path="/auditoriums/:id/details" element={<AuditoriumDetails/>} />
  </>
);
import { Route } from 'react-router-dom';
import EntityList from '../pages/entities/EntityList';
import CreateEntity from '../pages/entities/CreateEntity';
import EditEntity from '../pages/entities/EditEntity';
import EntityDetails from '../pages/entities/EntityDetails';
import {getAll, getDetails, create, edit, remove} from '../services/genres';

const ENTITY_NAME = 'genres';
const DISPLAY_NAME = 'Genre';

export const GenresRoutes = () => (
  <>
    <Route path="/genres" element={<EntityList entityName={ENTITY_NAME} displayName={DISPLAY_NAME} getAll={getAll} remove={remove} />} />
    <Route path="/genres/create" element={<CreateEntity entityName={ENTITY_NAME} displayName={DISPLAY_NAME} create={create}/>} />
    <Route path="/genres/:id/update" element={<EditEntity entityName={ENTITY_NAME} displayName={DISPLAY_NAME} getDetails={getDetails} edit={edit} />} />
    <Route path="/genres/:id/details" element={<EntityDetails entityName={ENTITY_NAME} displayName={DISPLAY_NAME} getDetails={getDetails}/>} />
  </>
);
import { Route } from 'react-router-dom';
import EntityList from '../pages/entities/EntityList';
import CreateEntity from '../pages/entities/CreateEntity';
import EditEntity from '../pages/entities/EditEntity';
import EntityDetails from '../pages/entities/EntityDetails';
import {getAll, getDetails, create, edit, remove} from '../services/directors';

const ENTITY_NAME = 'directors';
const DISPLAY_NAME = 'Director';

export const DirectorsRoutes = () => (
  <>
    <Route path="/directors" element={<EntityList entityName={ENTITY_NAME} displayName={DISPLAY_NAME} getAll={getAll} remove={remove} />} />
    <Route path="/directors/create" element={<CreateEntity entityName={ENTITY_NAME} displayName={DISPLAY_NAME} create={create}/>} />
    <Route path="/directors/:id/update" element={<EditEntity entityName={ENTITY_NAME} displayName={DISPLAY_NAME} getDetails={getDetails} edit={edit} />} />
    <Route path="/directors/:id/details" element={<EntityDetails entityName={ENTITY_NAME} displayName={DISPLAY_NAME} getDetails={getDetails}/>} />
  </>
);
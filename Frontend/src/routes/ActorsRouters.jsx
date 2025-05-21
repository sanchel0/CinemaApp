import { Route } from 'react-router-dom';
import EntityList from '../pages/entities/EntityList';
import CreateEntity from '../pages/entities/CreateEntity';
import EditEntity from '../pages/entities/EditEntity';
import EntityDetails from '../pages/entities/EntityDetails';
import {getAll, getDetails, create, edit, remove} from '../services/actors';

const ENTITY_NAME = 'actors';
const DISPLAY_NAME = 'Actor';

export const ActorsRoutes = () => (
  <>
    <Route path="/actors" element={<EntityList entityName={ENTITY_NAME} displayName={DISPLAY_NAME} getAll={getAll} remove={remove} />} />
    <Route path="/actors/create" element={<CreateEntity entityName={ENTITY_NAME} displayName={DISPLAY_NAME} create={create}/>} />
    <Route path="/actors/:id/update" element={<EditEntity entityName={ENTITY_NAME} displayName={DISPLAY_NAME} getDetails={getDetails} edit={edit} />} />
    <Route path="/actors/:id/details" element={<EntityDetails entityName={ENTITY_NAME} displayName={DISPLAY_NAME} getDetails={getDetails}/>} />
  </>
);
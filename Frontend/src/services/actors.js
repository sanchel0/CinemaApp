import {API_URL_ACTORS} from '../constants/api'
import { createEntityService } from './entityService';

export const { getAll, getDetails, getByName, create, edit, remove } = createEntityService(API_URL_ACTORS);
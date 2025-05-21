import {API_URL_GENRES} from '../constants/api'
import { createEntityService } from './entityService';

export const { getAll, getDetails, create, edit, remove } = createEntityService(API_URL_GENRES);
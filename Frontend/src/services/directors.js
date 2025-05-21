import {API_URL_DIRECTORS} from '../constants/api'
import { createEntityService } from './entityService';

export const { getAll, getDetails, create, edit, remove } = createEntityService(API_URL_DIRECTORS);
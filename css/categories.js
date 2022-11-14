import { Router } from 'express';

import * as axiosAPI from '../controllers/categories.js';

const router = Router();

router.get('/', axiosAPI.getData);

export default router;
import express from 'express';

import * as axiosAPI from '../controllers/categories.js';

const router = express.Router();

router.get('/', axiosAPI.getData);

export default router;
import express from 'express';
import  * as topicsController from '../../controllers/topics.js';

const topicsRouter = express.Router();

topicsRouter.route('/topics')
    .get(topicsController.getAllTopics);

export { topicsRouter };
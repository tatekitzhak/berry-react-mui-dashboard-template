const express = require("express");

const getAllTopics = require('../../controllers/topics');

const topicsRouter = express.Router();

topicsRouter.route('/')
    .get(getAllTopics);

module.exports = topicsRouter ;
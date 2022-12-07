const express = require("express");
const { apiRateNetworkTrafficLimiter } = require('../middlewares/rateLimiter');
/* 
var indexRouter = require("../routes/index");
var router1Router = require("../routes/router1");
var router2Router = require("../routes/router2");
 */
var bookRouter = require('./book/route');

module.exports = function (app) {
    app.use(express.json());
/* 
    app.use("/", indexRouter);
    app.use("/router1", router1Router);
    app.use("/router2", router2Router);
 */
    app.use("/", apiRateNetworkTrafficLimiter, bookRouter);
};
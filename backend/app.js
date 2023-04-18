const middleware = require("./utils/middleware");
const express = require("express");
require('express-async-errors');
const app = express();
const cors = require("cors");

const pubmedRouter = require("./controllers/Pubmed/pubmed");

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use("/api/pubmed", pubmedRouter);

app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
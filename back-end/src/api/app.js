const express = require('express');
const Router = require('../controller/routes/routes');

const app = express();
app.use(Router);


module.exports = app;

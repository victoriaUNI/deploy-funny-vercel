require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 8080;

module.exports = app;

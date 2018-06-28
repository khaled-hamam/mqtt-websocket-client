const express = require('express');
const morgan = require('morgan');
const path = require('path');

const homeController = require('./controllers/homeController');

// Making a new server
const app = express();

// Serving Views
app.set('views', path.join(__dirname, './views'));
// Setting View Template Engine
app.set('view engine', 'ejs');
// Serving Static Files
app.use(express.static('public'));
// Using Morgan for Logging
app.use(morgan('dev'));

// Firing the main controller
homeController(app);

// Setting up the Constants and Firing the Server
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || `http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Visit it here: ${URL}`);
});

const express  = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Init app
const app = express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Setup Routes
const todosRoutes = require('./routes/todos');
const appRoutes = require('./routes/app');

// View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connect to MongoDB
const dbURI = 'mongodb://localhost:27017/todos-db';
mongoose.connect(dbURI);

//Connection Events
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connetion open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {  
    console.log('Mongoose default connection error: ' + err);
}); 
  
// When the connection is disconnected
mongoose.connection.on('disconnected', () => {  
    console.log('Mongoose default connection disconnected'); 
});

app.use('/todo', todosRoutes);
app.use('/', appRoutes);

app.use((req, res, next) => {
    return res.render('index');
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server running on  port '+ PORT);
});

module.exports = app;
const express    = require('express');
const mongoose   = require('mongoose');
const path       = require('path');
const bodyParser = require('body-parser');
var helmet = require('helmet');

var config = require('./config.json');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');

mongoose.connect(config.database, 
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true})
    .then(()=>console.log('Connected to MongoDB !'))
    .catch(()=>console.log('/!\\ Cannot connect to MongoDB /!\\'));

//app
const app = express();

//security header

app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/home', homeRoutes);
module.exports = app;
    
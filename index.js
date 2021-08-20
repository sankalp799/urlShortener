const http = require('http');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const shortRouter = require('./router/index');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

// set app config
app.set('views', path.join(__dirname, './template'));
app.set('view engine', 'pug');

// use middleware
app.use('/public', express.static(path.join(__dirname, './public'), {}));
app.use(express.urlencoded({extended:false}));
app.use('/', shortRouter);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`[CONNECTION] connected to database`);
}).catch(err => {
    console.log(`[ERROR] connection error: ${err.message}`);
});

app.use((req, res, next) => {
    res.status(404).send('404 not found');
     // next();
});

server.listen(PORT, err => {
    if(!err) console.log(`listening to prot: ${PORT}`);
});

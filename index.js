const http = require('http');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// import routers
const indexRouter = require('./router/index');
const magicUrlRouter = require('./router/magicUrl');


//TEST
//
//
/******************
let urls = ['http://dashoff.herokuapp.com',
            'https://dashoff.herokuapp.com',
            'dashoff.herokuapp'];
urls.forEach(url => {
    try{
    console.log(new URL(url));
    }catch(e){
        let reg_exp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        let url_regex = new RegExp(reg_exp);
        if(url.match(url_regex)){
            console.log(url);
        }else{
            console.log('invalid url');
        }
        // console.log(new URL('http://' + url));
    }
    console.log('------------------------');
});
***/
//
//
//

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

// set app config
app.set('views', path.join(__dirname, './template'));
app.set('view engine', 'pug');

// use middleware
app.use(cors());
app.use('/public', express.static(path.join(__dirname, './public'), {}));
app.use(express.json());
app.use('/', indexRouter);
app.use('/api/urlShort', magicUrlRouter);

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

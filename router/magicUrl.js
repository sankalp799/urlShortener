const magicAPI = require('express').Router();
const shortid = require('shortid');
const shortenerModel = require('../model/shortener');

// post request to api for creating magic url
// START
magicAPI.post('/', async (req, res) => {
    let destination = req.body.destination;
    res.setHeader('Access-Control-Allow-Origin', '*');
    //TEST URL IS VALID OR NOT
    //START VALIDATION
    try{
        let parse = new URL(destination);
    }catch(e){
        let url_exp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi; 
        let urlRegex = new RegExp(url_exp);

        // check url is valid or not
        if(destination.match(urlRegex)){
            // if url is valid add protocol to url 
            destination = 'http://' + destination;

        }else{
            return res.status(400).json({
                'Error': new Error('Invalid URL'),
            });
        }
    }



    try{
        const inject = await new shortenerModel({
            destination: destination,
            magic_url: process.env.ORIGIN || req.hostname,
        });
        inject.magic_url += '/' + inject.short_id;
        // console.log(`[MONGOOSE SCHEMA INJECT]: ${inject}`);
        inject.save();

        res.status(201).json(inject);

    }catch(e){
        console.log(`[MONGOOSE INJECTION ERROR]: ${e.message}`);
        res.status(500).json({'Error': new Error('Internal Server Problem')});
    }
});


module.exports = magicAPI;

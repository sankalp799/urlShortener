const mongoose = require('mongoose');
const shortid = require('shortid');

const urlShortenerSchema = new mongoose.Schema({
    destination:{
        type: String,
        required: true,
    },
    short_id:{
        type: String,
        required: true,
        default: shortid.generate()        
    },
    magic_url:{
        type: String,
        require: true,
        default: process.env.ORIGIN + '/',
    }
});

const urlShortenerModel = mongoose.model('magicLink', urlShortenerSchema);

module.exports = urlShortenerModel;

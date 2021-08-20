const mongoose = require('mongoose');
const shortid = require('shortid');

const urlShortenerSchema = new mongoose.Schema({
    destination:{
        type: String,
        required: true,
    },
    short:{
        type: String,
        required: true,
        default: shortid.generate()        
    },
});

const urlShortenerModel = mongoose.model('url_shortener', urlShortenerSchema);

module.exports = urlShortenerModel;

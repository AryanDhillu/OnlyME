const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        required: true 
    }
})

const picture = mongoose.model('picture', pictureSchema ); // creating collection called pictures

module.exports = picture;
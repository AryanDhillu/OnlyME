const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const picture = require('./models/picture')

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/album', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Mongo Connection Successfull');
    })
    .catch((err)=>{
        console.log('Error in connecting to mongo');
        console.log(err);
    })

app.get('/gallery', async (req,res)=>{
    const pictures = await picture.find({})
    console.log(pictures)
    res.send(pictures);
})

app.post('/gallery', async (req, res) => {
    try {
        const newPic = new picture(req.body);
        await newPic.save();
        res.send(newPic);
    } catch (error) {
        console.error('Error saving picture:', error);
        res.status(500).send('Error saving picture');
    }
});


app.listen(8080,() => {
    console.log('Server started on port 8080')
})
const mongoose = require('mongoose');
const picture = require('./models/picture')

mongoose.connect('mongodb://localhost:27017/album', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Mongo Connection Successfull');
    })
    .catch((err)=>{
        console.log('Error in connecting to mongo');
        console.log(err);
    })

const seedpics = [
    {
    url: 'https://unsplash.com/photos/a-person-standing-on-top-of-a-large-rock-eOWabmCNEdg',
    tag: 'A person on a rock'
    },
    {
    url: 'https://unsplash.com/photos/woman-walking-on-street-surrounded-by-buildings-iUBgeNeyVy8',
    tag: 'A women walking on street'
    },
    {
    url: 'https://unsplash.com/photos/flat-lay-photography-of-camera-book-and-bag-qyAka7W5uMY',
    tag: 'A camera, book and bag'
    },
    {
    url: 'https://unsplash.com/photos/train-on-bridge-surrounded-with-trees-at-daytime-XVoyX7l9ocY',
    tag: 'A Train going on a bridge'
    },
    {
    url: 'https://unsplash.com/photos/photo-of-assorted-items-on-wooden-table-W_-6PWGbYaU',
    tag: 'A wooden table with some shit!'
    }
]

picture.insertMany(seedpics)
    .then(res =>{
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })


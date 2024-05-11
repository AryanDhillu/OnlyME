const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const picture = require('./models/picture');
const cors = require('cors'); // Import the cors middleware

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/album', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Mongo Connection Successful');
})
.catch((err) => {
  console.log('Error in connecting to MongoDB');
  console.error(err);
});

// Enable CORS for all origins (replace with specific origin if needed)
app.use(cors());

app.get('/gallery', async (req, res) => {
  try {
    const pictures = await picture.find({});
    console.log(pictures);
    res.send(pictures);
  } catch (error) {
    console.error('Error fetching pictures:', error);
    res.status(500).send('Error fetching pictures');
  }
});

app.post('/gallery', async (req, res) => {
  try {
    console.log(req.body)
    const { url, tag } = req.body;
    const newPic = new picture({ url, tag });
    await newPic.save();
    res.send(newPic);
  } catch (error) {
    // console.error('Error saving picture:', error);
    res.status(500).send('Error saving picture');
  }
});

app.delete('/gallery',async(req,res)=>{
  try{
    const { id } = req.body;
    const delectedpic = await picture.findByIdAndDelete(id);
    res.send("Deleted Successfully");
    console.log("Deleted successfully")
  } catch(error) {
    console.log("unsucessful")
    console.log(error);
  }
})

app.listen(8080, () => {
  console.log('Server started on port 8080');
});

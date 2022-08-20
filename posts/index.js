const express = require('express');
const { randomBytes} = require('crypto');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cors());
//Data for our project
const posts = {};

app.get('/posts',(req,res) => {
    //Send back posts that we created
    res.send(posts);
});


app.post('/posts',(req,res) => {
    const id = randomBytes(4).toString('hex');//Generates a random ID 
    //h21312h44235    
    //Take a request 
    const {title} = req.body;

    posts[id] = {
        id,title
    };

    //Send back the post that we have created
    res.status(201).send(posts[id]);

});


app.listen(4000,() => {
    console.log('Listening at 4000')
});
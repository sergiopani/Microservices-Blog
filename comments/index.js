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

//All of the comments associet with certain post
const commentsByPostId = {};


app.get('/posts/:id/comments',(req,res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments',(req,res) => {
    //Generate a new comment ID
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    //If it gives undefined, no comment associet with this post was defined before
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId, content});

    commentsByPostId[req.params.id] = comments;

    //Send back the array of comments
    res.status(201).send(comments);

})

app.listen('4001', () => {
console.log('Running at port 5000')
})
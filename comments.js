// Create a web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const comments = require('./comments.json');
const fs = require('fs');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const newComment = req.body;
    comments.push(newComment);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.json(newComment);
});

app.put
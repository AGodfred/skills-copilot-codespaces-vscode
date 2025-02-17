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

app.put('/comments/:id', (req, res) => {
    const { id } = req.params;
    const updatedComment = req.body;
    const index = comments.findIndex(comment => comment.id === id);
    
    if (index !== -1) {
        comments[index] = updatedComment;
        fs.writeFileSync('./comments.json', JSON.stringify(comments));
        res.json(updatedComment);
    } else {
        res.status(404).json({ message: "Comment not found" });
    }
});

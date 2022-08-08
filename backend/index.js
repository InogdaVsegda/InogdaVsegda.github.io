const { error } = require('console')
const { response } = require('express')
const express = require('express')
const app = express()
const port = 3002

const user_model = require('./user_model')

app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
})

app.get('/', (req, res) => {
    user_model.getPosts()
    .then(response => {
        // console.log(response)
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/posts', (req, res) => {
    user_model.createPost(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/posts/:id/update', (req, res) => {
    user_model.updatePost(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/posts/:id', (req, res) => {
    // console.log('deleting user');
    user_model.deletePost(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
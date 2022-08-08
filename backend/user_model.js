const Pool = require('pg').Pool
const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'to_do_app',
    password: 'root',
    port: 5432,
});

const getPosts = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM posts ORDER BY id ASC', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}

const createPost = (data) => {
    return new Promise(function(resolve, reject) {
        const { title, body } = data
        pool.query('INSERT INTO posts (title, body) VALUES ($1, $2) RETURNING *', [title, body], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new post has been added: ${results.rows[0]}`)
        })
    })
}

const updatePost = (newData) => {
    const {title, body, id} = newData;
    return new Promise(function(resolve, reject) {
        pool.query('UPDATE posts SET (title, body) = ($1, $2) WHERE id = $3', [title, body, id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Post updeted with ID: ${id}, new data: ${title}, ${body}`)
        })
    })
}

const deletePost = (id) => {
    return new Promise(function(resolve, reject) {
        pool.query('DELETE FROM posts WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Merchant deleted with ID: ${id}`)
        })
    })
}

const getPostByID = (id) => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM posts WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`${id}`)
        })
    })
}

module.exports = {
    getPosts,
    createPost,
    deletePost,
    updatePost,
    getPostByID
}
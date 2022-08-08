import { title } from "process";

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const result = await fetch('http://localhost:3002', {
            params: {
                _limit: limit,
                _page: page
            }
        }).then((response) => {
           return response.json();
        })
        .then((data) => {
            // console.log(data)
            return data;
        });

        return result;
    }

    // static async getById(id) {
    //     const response = await fetch(`http://localhost:3002/posts/${id}`, {
    //         method:'GET',
    //     })
    //     .then((response) => {
    //         return response.json();
    //      })
    //      .then((data) => {
    //          console.log(data)
    //          return data;
    //      });
        
    //      return response;
    // }

    static async deletePost(id) {
        await fetch(`http://localhost:3002/posts/${id}`, {
          method: 'DELETE',
        })
          .then(response => {
            return response.text();
          })
          .then(data => {
            alert(data);
          });
    }

    static async createPost(data) {
        const {title, body} = data;
        await fetch(`http://localhost:3002/posts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, body}),
        })
          .then(response => {
            return response.text();
          })
          .then(data => {
            alert(data);
          });
    }

    static async updatePost(data) {
        
        const {title, body, id} = data;
        await fetch(`http://localhost:3002/posts/${id}/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, body, id}),
        })
          .then(response => {
            return response.text();
          })
          .then(data => {
            alert(data);
          });
    }

    // static async getCommentsByPostId(id) {
    //     const response = await axios.get(`localhost:3002`);
    //     return response;
    // }   
}
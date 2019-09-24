import React, { Component } from "react";
import httpService from "./services/httpService";
import config from "./config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

// installing mongoDB and mongoDB Compass

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await httpService.get(config.apiEndPoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await httpService.post(config.apiEndPoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated";
    const updatedPost = httpService.put(
      `${config.apiEndPoint}/${post.id}`,
      post
    );
    // const updatedPost = axios.patch(`${apiEndPoint}/${post.id}`, {title: post.title});
    const posts = [...this.state.posts];
    const index = posts.indexOf(item => item.id === post.id);
    posts[index] = { ...updatedPost };
    this.setState({ posts });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(item => item.id !== post.id);
    //firstly update in applicaiton in order to not wait request
    this.setState({ posts });

    try {
      await httpService.delete(`${config.apiEndPoint}/${post.id}`);
      // throw new Error('asdf')
    } catch (error) {
      // expected errors (404: not found, 400: bad request) - client errors
      // - display a specific error message
      if (error.response && error.response.status === 404) {
        console.error("This post has already been deleted");
      }

      // if request error, push original posts
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;

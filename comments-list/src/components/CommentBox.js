import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import requireAuth from 'components/requireAuth';

class CommentBox extends Component {
    state = {
        comment: ''
    }

    handleChange = (e) => {
        const comment = e.target.value;
        this.setState({ comment });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.saveComment(this.state.comment);
        this.setState({ comment: '' });
    }

    fetchComments = () => {
        this.props.fetchComments();
    }

    render() {
        const { comment } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h4>Add a comment</h4>
                    <textarea value={comment} onChange={this.handleChange} name="comment-area" id="comment-area" cols="30" rows="10"></textarea>
                    <div></div>
                    <button>Submit comment</button>
                </form>
                <button className="fetch-comments" onClick={this.fetchComments}>Fetch comments</button>
            </div>
        );
    }
}


export default connect(null, actions)(requireAuth(CommentBox));
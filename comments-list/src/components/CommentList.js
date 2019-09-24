import React, { Component } from 'react';
import { connect } from 'react-redux';

class CommentList extends Component {
    renderComments = () => {
        return this.props.comments.map((item, index) => {
            return <li key={index}>{item}</li>
        })
    }
    render() {
        return ( <div>
            <h4>Comments list</h4>
            <ul>
                {this.renderComments()}
            </ul>
        </div> );
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

export default connect(mapStateToProps)(CommentList);
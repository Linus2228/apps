import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends Component {
        componentWillMount() {
            this.shouldNavigateAway();
        }

        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway = () => {
            if (!this.props.authenticated) {
                this.props.history.push('/');
                console.log('user needs to leave');
            }
        }

        render() {
            return (
                <ChildComponent {...this.props}/>
            )
        }
    }

    const mapStateToProps = state => {
        return {
          authenticated: state.auth.authenticated
        }
    }
    return connect(mapStateToProps)(ComposedComponent);
}
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends Component {

        componentWillMount() {
            this.shouldNavigateAway();
        }

        componentDidUpdate(prevProps, prevState) {
            this.shouldNavigateAway();
        }

        shouldNavigateAway = () => {
            if (!this.props.auth) {
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
            auth: state.auth
        }
    }
    return connect(mapStateToProps)(ComposedComponent);
}
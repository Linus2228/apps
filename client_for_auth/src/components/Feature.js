import React, { Component } from 'react';
import requireAuth from './requireAuth';

class Feature extends Component {
  render() { 
    return ( <div>This is a feature only for logged in users</div> );
  }
}
 
export default requireAuth(Feature);
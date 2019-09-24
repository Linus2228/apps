import React, { Component } from 'react';
import { Element } from 'react-scroll';

import Header from './components/Header_footer/Header';
import Featured from './components/Featured';
import VenueInfo from './components/VenueInfo/VenueInfo';
import Highlights from './components/Highlights/Highlights';
import Pricing from './components/Pricing/Pricing';
import Location from './components/Location/Location';
import './resources/styles.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Element name="featured">
          <Featured />
        </Element>
        <Header />
        <Element name="venuenfo">
          <VenueInfo />
        </Element>
        <Element name="highlights">
          <Highlights />
        </Element>
        <Element name="pricing">
          <Pricing />
        </Element>
        <Element name="location">
          <Location />
        </Element>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';

import Button from '../utils/Button';


class Discount extends Component {
  state = {
    discountStart: 0,
    discountEnd: 30
  }

  percentage = () => {
    const { discountStart, discountEnd } = this.state;
    if (discountStart < discountEnd) {
      this.setState({ discountStart: discountStart + 1 });
      setTimeout(this.percentage, 30);
    }
  };

  // or
  // percentage = () => {
  //   const { discountStart, discountEnd } = this.state;
  //   if (discountStart < discountEnd) {
  //     this.setState({ discountStart: discountStart + 1 });
  //   }
  // };

  // componentDidUpdate() {
  //   setTimeout(this.percentage, 30);
  // }

  render() {
    return (
      <div className="center_wrapper">
        <div className="discount_wrapper">
          <Fade
            onReveal={this.percentage}>
            <div className="discount_percentage">
              <span>{this.state.discountStart}%</span>
              <span>OFF</span>
            </div>
          </Fade>
          <Slide right>
            <div className="discount_description">
              <h3>Purchase tickets before 20th JUNE</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
              <Button
                text="Purchase tickets"
                bgc="#ffa800"
                color="#fff"
                link="http://google.com"
              />
            </div>
          </Slide>
        </div>
      </div>
    );
  }
}

export default Discount;
import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';

class TimeUntil extends Component {
  state = {
    deadline: 'Dec, 16, 2019',
    days: '0',
    hours: '0',
    minutes: '0',
    seconds: '0'
  }

  getTimeUntil = () => {
    const time = Date.parse(this.state.deadline) - Date.parse(new Date());
    if (time > 0) {
      const days = Math.floor(time/(1000 * 60 * 60 * 24));
      const hours = Math.floor((time/(1000 * 60 * 60 * 24)) % 24)
      const minutes = Math.floor((time/(1000 / 60)) % 60);
      const seconds = Math.floor((time/1000) % 60);

      this.setState({ days, hours, minutes, seconds });
    }
  }
  
  componentDidMount() {
    setInterval(() => this.getTimeUntil(), 1000);
  }
  
  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <Slide left delay={2000}>
        <div className="countdown_wrapper">
          <div className="countdown_top">
            Event starts in
        </div>
          <div className="countdown_bottom">
            <div className="countdown_item">
              <div className="countdown_time">
                {days}
            </div>
              <div className="countdown_tag">
                Days
            </div>
            </div>
            <div className="countdown_item">
              <div className="countdown_time">
                {hours}
            </div>
              <div className="countdown_tag">
                Hr
            </div>
            </div>
            <div className="countdown_item">
              <div className="countdown_time">
                {minutes}
            </div>
              <div className="countdown_tag">
                Min
            </div>
            </div>
            <div className="countdown_item">
              <div className="countdown_time">
                {seconds}
            </div>
              <div className="countdown_tag">
                Sec
            </div>
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}

export default TimeUntil;
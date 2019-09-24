import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Player from './Player';

class PlayerContainer extends Component {
  static propTypes = {
    trackControl: PropTypes.object.isRequired,
  };

  componentDidUpdate() {
    if (this.props.trackControl.isPlaying) {
      this.audioNode.play();
    }
  }

  render() {
    const { trackControl } = this.props;
    return (
      <div>
        {trackControl.isPlaying ? (
          <Player
            playerRef={(node) => {
              this.audioNode = node;
            }}
            trackControl={trackControl}
          />
        ) : (
          <h4 className="common-h">Hey! Search your music</h4>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trackControl: state.trackControl,
});

export default connect(mapStateToProps)(PlayerContainer);

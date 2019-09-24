import React from 'react';
import PropTypes from 'prop-types';

import * as constants from '../../data/constants';

const Player = (props) => {
  const { trackControl } = props;

  return (
    <section className="player">
      <audio
        ref={props.playerRef}
        className="audio-player"
        src={`${constants.SERVER_NAME}tracks/${trackControl.trackID}/stream?client_id=${constants.CLIENT_ID}`}
        width="100%"
        type="audio/mp3"
        controls="controls"
      >
        <track kind="captions" />
      </audio>
    </section>
  );
};

Player.propTypes = {
  trackControl: PropTypes.object.isRequired,
  playerRef: PropTypes.func.isRequired,
};

export default Player;

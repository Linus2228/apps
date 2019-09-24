import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import addList from '../../actions/addList';
import playTrack from '../../actions/trackControl';
import LabelContent from './LabelContent';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import PlayerContainer from './PlayerContainer';

class MainPage extends Component {
  static propTypes = {
    addList: PropTypes.func.isRequired,
    playTrack: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    playlist: PropTypes.array,
  };

  static defaultProps = {
    playlist: [],
  };

  render() {
    const { addList, playlist, playTrack, form } = this.props;

    return (
      <div>
        <LabelContent />
        <PlayerContainer />
        <SearchBar
          addList={addList}
          onSubmit={() => {
            addList(form.contact.values.searchTracks);
          }}
        />
        <Playlist playlist={playlist} playTrack={playTrack} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlist: state.playlist,
  form: state.form,
});

export default connect(mapStateToProps, { addList, playTrack })(MainPage);

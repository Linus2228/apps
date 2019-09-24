import React from 'react';
import PropTypes from 'prop-types';

const Playlist = (props) => {
  const { playlist, playTrack } = props;

  return (
    <section className="panel panel-default">
      {playlist.length > 0 && (
        <table className="table table-striped table-hover">
          <tbody>
            <tr>
              <th>Track</th>
              <th>User name</th>
              <th>Duration</th>
              <th>Format</th>
              <th>Play</th>
              <th>Control</th>
            </tr>
            {playlist[0].collection.map(track => (
              <tr key={track.id}>
                <td>{track.title}</td>
                <td>{track.user.username}</td>
                <td>{track.duration}</td>
                <td>{track.original_format}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => playTrack(track.id)}
                  >
                    Play
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">Add</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {playlist.length === 0 && (
        <h4 className="common-h">
          {' '}
          Here displays your search result or nothing
        </h4>
      )}
    </section>
  );
};

Playlist.propTypes = {
  playlist: PropTypes.array.isRequired,
  playTrack: PropTypes.func.isRequired,
};

export default Playlist;

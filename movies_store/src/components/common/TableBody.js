import React from 'react';
import { Link } from 'react-router-dom';
import Like from './like';
import PropTypes from 'prop-types';

const TableBody = ({ array, handleLike, handleDelete }) => {
    return (
        <tbody>
            {array.map((movie, index, arr) => (
                <tr key={movie._id}>
                    <td>
                        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                    </td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                        <Like
                            liked={movie.liked}
                            onClick={handleLike.bind(null, movie)}
                        />
                    </td>
                    <td>
                        <button
                            onClick={handleDelete.bind(
                                null,
                                movie,
                                index,
                                arr.length
                            )}
                            className="btn btn-danger btn-sm"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    array: PropTypes.array.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default TableBody;

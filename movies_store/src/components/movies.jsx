import React, { Component } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';

import { getGenres } from '../services/genreService';
import { getMovies, deleteMovie } from '../services/movieService';
import Pagination from './common/Pagination';
import ListGroup from './common/ListGroup';
import MoviesTable from './common/MoviesTable';
import { paginate } from '../utils/index';

const moviesPerPage = 4;
const columns = [
    {
        title: 'Title',
        value: 'title',
    },
    {
        title: 'Genre',
        value: 'genre.name',
    },
    {
        title: 'Stock',
        value: 'numberInStock',
    },
    {
        title: 'Rate',
        value: 'dailyRentalRate',
    },
    {},
    {},
];

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        activePage: 1,
        activeGenreId: '',
        sortColumn: { path: 'title', order: 'asc' },
    };

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{ _id: '', name: 'All Genres' }, ...data];
        const { data: movies } = await getMovies();
        this.setState({ genres, movies });
    }

    handleDelete = async (movie, index, length) => {
        const { movies, activeGenreId, activePage } = this.state;

        const originalMovies = movies;
        const originalActiveGenreId = activeGenreId;
        const originalActivePage = activePage;
        const filterdMovies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({ movies: filterdMovies });
        const isLastMovieOnPage = index === 0 && length === 1;
        if (isLastMovieOnPage) {
            const tempActivePage = activePage === 1 ? 1 : activePage - 1;
            this.setState({ activePage: tempActivePage, activeGenreId: '' });
        }

        try {
            await deleteMovie(movie._id);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error('This post has already been deleted');
            }
            this.setState({
                movies: originalMovies,
                activePage: originalActivePage,
                ctiveGenreId: originalActiveGenreId,
            });
        }
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePagination = index => {
        if (index + 1 !== this.state.activePage) {
            this.setState({ activePage: index + 1 });
        }
    };

    setActiveGenre = id => {
        const { activeGenreId } = this.state;
        if (id !== activeGenreId) {
            this.setState({ activeGenreId: id, activePage: 1 });
        }
    };

    onSort = sortColumn => {
        this.setState({ sortColumn });
    };

    render() {
        const {
            movies,
            activePage,
            activeGenreId,
            sortColumn,
            genres,
        } = this.state;
        const { user } = this.props;
        const moviesByGenre = movies.filter(movie => {
            // debugger;
            return movie.genre._id === activeGenreId || !activeGenreId;
        });
        const moviesBySort = _.orderBy(
            moviesByGenre,
            [sortColumn.path],
            [sortColumn.order]
        );
        const { length: count } = moviesByGenre;
        const sortingMovies = paginate(moviesBySort, activePage, moviesPerPage);
        if (count === 0) return <p>There are no movies in the database.</p>;

        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={genres}
                        activeGenreId={activeGenreId}
                        setActiveGenre={this.setActiveGenre}
                    />
                </div>
                <div className="col">
                    {user && <p>Showing {count} movies in the database.</p>}
                    <MoviesTable
                        array={sortingMovies}
                        handleLike={this.handleLike}
                        handleDelete={this.handleDelete}
                        onSort={this.onSort}
                        sortColumn={sortColumn}
                        columns={columns}
                    />
                    <Pagination
                        handlePagination={this.handlePagination}
                        moviesCount={moviesByGenre.length}
                        moviesPerPage={moviesPerPage}
                        activePage={activePage}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;

import http from './httpService';

const apiEndPoint = 'movies';

export function getMovies() {
    return http.get(apiEndPoint);
}

export function deleteMovie(movieId) {
    return http.delete(`${apiEndPoint}/${movieId}`);
}

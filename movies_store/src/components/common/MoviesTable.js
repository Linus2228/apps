import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

class MoviesTable extends Component {
    render() {
        const {
            array,
            handleLike,
            handleDelete,
            onSort,
            columns,
            sortColumn,
        } = this.props;
        return (
            <table className="table">
                <TableHeader
                    onSort={onSort}
                    columns={columns}
                    sortColumn={sortColumn}
                />
                <TableBody
                    array={array}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                />
            </table>
        );
    }
}

MoviesTable.propTypes = {
    array: PropTypes.array.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    sortColumn: PropTypes.object,
    onSort: PropTypes.func,
    columns: PropTypes.array
}

export default MoviesTable;

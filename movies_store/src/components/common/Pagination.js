import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Pagination = ({ handlePagination, moviesCount, moviesPerPage, activePage }) => {
    const pagesCount = Math.ceil(moviesCount / moviesPerPage);
    return (
        <div>
            {pagesCount > 1 ? (
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {Array.from(Array(pagesCount).keys()).map(item => (
                            <li
                                className={classNames('page-item', {
                                    active: item + 1 === activePage,
                                })}
                                onClick={handlePagination.bind(null, item)}
                                key={item}
                            >
                                <span className="page-link" href="">
                                    {item + 1}
                                </span>
                            </li>
                        ))}
                    </ul>
                </nav>
            ) : (
                ''
            )}
        </div>
    );
};

Pagination.propTypes = {
    handlePagination: PropTypes.func.isRequired,
    moviesCount: PropTypes.number.isRequired,
    moviesPerPage: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
};

export default Pagination;

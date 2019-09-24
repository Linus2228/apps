import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ListGroup = ({ items, text, id, activeGenreId, setActiveGenre }) => {
    return (
        <ul className="list-group">
            {items.map((item, index) => (
                <li
                    className={classNames('list-group-item', {
                        active: item[id] === activeGenreId,
                    })}
                    key={item[id]}
                    onClick={setActiveGenre.bind(null, item[id])}
                >
                    {item[text]}
                </li>
            ))}
        </ul>
    );
};

ListGroup.defaultProps = {
    text: 'name',
    id: '_id'
}

ListGroup.propTypes = {
    items: PropTypes.array.isRequired,
    text: PropTypes.string,
    id: PropTypes.string,
    activeGenreId: PropTypes.string.isRequired,
    setActiveGenre: PropTypes.func.isRequired
};

export default ListGroup;

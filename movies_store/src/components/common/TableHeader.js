import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TalbeHeader extends Component {
    raiseSort = path => {
        const { onSort, sortColumn } = this.props;
        const sortColumnCopy = { ...sortColumn };
        if (sortColumnCopy.path === path) {
            sortColumnCopy.order =
                sortColumnCopy.order === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumnCopy.path = path;
            sortColumnCopy.order = 'asc';
        }
        onSort(sortColumnCopy);
    };

    renderSortIcon = column => {
        const { sortColumn } = this.props;
        return column.value === sortColumn.path ? <i className={`fa fa-sort-${sortColumn.order}`}></i> : null;
    } 

    render() {
        const { columns } = this.props;
        return (
            <thead>
                <tr>
                    {columns.map((item, index) => (
                        <th
                            key={index}
                            onClick={
                                item.title
                                    ? this.raiseSort.bind(null, item.value)
                                    : null
                            }
                        >
                            {item.title} {this.renderSortIcon(item)}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}

TalbeHeader.propTypes = {
    sortColumn: PropTypes.object,
    onSort: PropTypes.func,
    item: PropTypes.shape({
        value: PropTypes.string,
        title: PropTypes.string
      })
}

export default TalbeHeader;

export const paginate = (itemsList, activePage, itemsPerPage) => {
    // eslint-disable-next-line
    return itemsList.filter((item, index) => {
        if (activePage === 1 && index < itemsPerPage * activePage) {
            return item;
        } else if (
            activePage > 1 &&
            index < itemsPerPage * activePage &&
            index >= itemsPerPage * (activePage - 1)
        ) {
            return item;
        }
    });
};

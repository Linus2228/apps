import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

const SearchBar = (props) => {
  const { handleSubmit, pristine, submitting } = props;

  return (
    <section className="panel panel-default">
      <div className="panel-body">
        <div className="col-md-12 pb25">
          <form onSubmit={handleSubmit}>
            <Field name="searchTracks" component="input" type="search" className="form-control" placeholder="Find music" />
            <button type="submit" disabled={pristine || submitting} className="btn btn-info">Search</button>
          </form>
        </div>
      </div>
    </section>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'contact'
})(SearchBar);

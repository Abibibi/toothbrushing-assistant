import React from 'react';

import './form.sass';

const Form = ({ search, inputModified }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    inputModified(name, value);
  };

  return (
    <form className="form">
      <div className="form-input-container">
        <label htmlFor="search" className="form-label">Subject of interest</label>
        <input
          id="search"
          name="search"
          className="form-element form-input"
          value={search}
          onChange={handleChange}
        />
      </div>
      <button className="form-element form-button">Search</button>
    </form>
  );
};

export default Form;

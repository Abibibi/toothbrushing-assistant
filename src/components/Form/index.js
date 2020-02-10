import React from 'react';
import classNames from 'classnames';

import './form.sass';

const Form = ({ search, inputModified }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    inputModified(name, value);
  };

  const labelClass = classNames({
    'form-label': true,
    'form-label-animation': search
  });

  const inputClass = classNames({
    'form-element form-input': true,
    'form-input-filled': search
  });

  return (
    <form className="form">
      <div className="form-input-container">
        <label htmlFor="search" className={labelClass}>Subject of interest</label>
        <input
          id="search"
          name="search"
          className={inputClass}
          value={search}
          onChange={handleChange}
        />
      </div>
      <button className="form-element form-button">Search</button>
    </form>
  );
};

export default Form;

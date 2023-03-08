import React from 'react';

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './CheckboxInput.module.scss';

const cn = classNames.bind(styles);

const CheckboxInput = ({
  name,
  label,
  id,
  onChange,
  checked,
  error,
  displayError,
}) => {
  return (
    <div className={cn('checkbox')}>
      <input
        type="checkbox"
        className={cn('checkbox__input')}
        id={id}
        name={name}
        onChange={onChange}
        checked={checked}
        aria-describedby={`${name}-error`}
        aria-invalid={error ? true : false}
        required
      ></input>
      <label className={cn('checkbox__label')} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  displayError: PropTypes.bool.isRequired,
};

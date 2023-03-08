import React from 'react';

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './RadioInput.module.scss';

const cn = classNames.bind(styles);

const RadioInput = ({
  name,
  value,
  id,
  onChange,
  defaultChecked,
  onClick,
  isSecondary,
}) => {
  return (
    <div className={cn('radio', { 'radio--secondary': isSecondary })}>
      <input
        type="radio"
        className={cn('radio__input')}
        id={id}
        name={name}
        onChange={onChange}
        onClick={onClick}
        value={value}
        required
        defaultChecked={defaultChecked}
      ></input>
      <label className={cn('radio__label')} htmlFor={id}>
        {value}
      </label>
    </div>
  );
};

export default RadioInput;

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultChecked: PropTypes.bool,
  onClick: PropTypes.func,
  isSecondary: PropTypes.bool,
};

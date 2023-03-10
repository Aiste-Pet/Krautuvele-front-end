import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './TextField.module.scss';

const cn = classNames.bind(styles);

const TextField = ({
  name,
  type,
  label,
  value,
  placeholder,
  onChange,
  onClick,
  disabled,
}) => {
  return (
    <div className={cn('text-input')}>
      <label className={cn('text-input__label')} htmlFor={name}>
        {label}
      </label>
      <input
        type={type ? type : 'text'}
        className={cn('text-input__field')}
        value={value}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
        maxLength={1010}
        disabled={disabled}
        required
      ></input>
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TextField;

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './TabNavItem.module.scss';

const cn = classNames.bind(styles);

const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <li
      onClick={handleClick}
      className={cn('tab-item', {
        'tab-item--active': activeTab === id,
      })}
    >
      {title}
    </li>
  );
};
export default TabNavItem;

TabNavItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

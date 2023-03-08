import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './TabContent.module.scss';

const cn = classNames.bind(styles);

const TabContent = ({ id, activeTab, children }) => {
  return activeTab === id ? (
    <div className={cn('tab-content')}>{children}</div>
  ) : null;
};

export default TabContent;

TabContent.propTypes = {
  id: PropTypes.string,
  activeTab: PropTypes.string,
  children: PropTypes.node,
};

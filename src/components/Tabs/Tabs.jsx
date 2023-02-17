import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import TabContent from '../TabContent/TabContent';
import TabNavItem from '../TabNavItem/TabNavItem';
import styles from './Tabs.module.scss';

const cn = classNames.bind(styles);

const Tabs = ({ tab_content }) => {
  const [activeTab, setActiveTab] = useState('tab0');
  return (
    <div className={cn('tabs')}>
      <ul className={cn('tabs__buttons')}>
        {tab_content.map(({ title }, index) => {
          return (
            <TabNavItem
              key={title}
              title={title}
              id={`tab${index}`}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          );
        })}
      </ul>

      <div>
        {tab_content.map(({ title, children }, index) => {
          return (
            <TabContent key={title} id={`tab${index}`} activeTab={activeTab}>
              <div>{children}</div>
            </TabContent>
          );
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tab_content: PropTypes.array,
};

export default Tabs;

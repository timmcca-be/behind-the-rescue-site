import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TabList.module.css';

export type TabDefinition<T> = {
  id: T;
  title: string;
  href: string;
};

export type TabListProps<T> = {
  tabs: TabDefinition<T>[];
  activeTabID: T;
};

export function TabList<T extends string>({
  tabs,
  activeTabID,
}: TabListProps<T>) {
  return (
    <nav className={styles.tabList}>
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          to={tab.href}
          className={[
            styles.tab,
            tab.id === activeTabID ? styles.active : '',
          ].join(' ')}
        >
          {tab.title}
        </Link>
      ))}
    </nav>
  );
}

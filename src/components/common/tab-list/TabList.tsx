import React from "react";
import { Link } from "react-router-dom";
import styles from './TabList.module.css';

export type TabDefinition = {
  id: string;
  title: string;
  href: string;
}

export type TabListProps = {
  tabs: TabDefinition[];
  activeTabID: string;
}

export const TabList = ({tabs, activeTabID}: TabListProps) => (
  <nav className={styles.tabList}>
    {tabs.map((tab) => (
      <Link
        key={tab.id}
        to={tab.href}
        className={[
          styles.tab,
          tab.id === activeTabID ? styles.active : ""
        ].join(" ")}
      >
        {tab.title}
      </Link>
    ))}
  </nav>
)

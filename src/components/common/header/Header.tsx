import saapLogo from './saap_logo.svg';
import styles from './Header.module.css'
import { Link } from 'react-router-dom';

export const Header = () => (
  <header className={styles.header}>
    <Link to="/" className={styles.logoLink}>
      <img src={saapLogo} alt="SAAP logo" className={styles.logo} />
      <h1 className={styles.title}>Behind the Rescue</h1>
    </Link>
  </header>
);

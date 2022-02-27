import saapLogo from './saap_logo.svg';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { FaCalendar, FaDog } from 'react-icons/fa';

export const Header = () => (
  <header className={styles.header}>
    <Link to="/" className={styles.logoLink}>
      <img src={saapLogo} alt="SAAP" className={styles.logo} />
      <h1 className={styles.appName}>Behind the Rescue</h1>
    </Link>
    <nav className={styles.navigation}>
      <Link to="/">
        <FaCalendar title="Adoption Events" className={styles.linkIcon} />
        <span className={styles.expanded}>Adoption Events</span>
      </Link>
      <Link to="/animals">
        <FaDog title="Animals" className={styles.linkIcon} />
        <span className={styles.expanded}>Animals</span>
      </Link>
    </nav>
  </header>
);

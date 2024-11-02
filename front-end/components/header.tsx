// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import styles from '@styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Nestfit</h1>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/workouts" className={styles.link}>Workouts</Link>
        {/* You can add more links here */}
      </nav>
    </header>
  );
};

export default Header;

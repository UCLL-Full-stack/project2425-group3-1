// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.css'; // Make sure this path is correct

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>FitNest</h1>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/workouts" className={styles.link}>Workouts</Link>
      </nav>
    </header>
  );
};

export default Header;
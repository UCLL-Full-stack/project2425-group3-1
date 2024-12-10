import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/header.module.css";

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("loggedInUser");
    if (userData) {
      setLoggedInUser(userData);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>FitNest</h1>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/workouts" className={styles.link}>
          Workouts
        </Link>
        <Link href="/schedules" className={styles.link}>
          Schedules
        </Link>
        <Link href="/bmi" className={styles.link}>
          BMI Calculator
        </Link>
        {!loggedInUser && (
          <>
            <Link href="/login" className={styles.link}>
              Login
            </Link>
            <Link href="/signup" className={styles.link}>
              Signup
            </Link>
          </>
        )}
        {loggedInUser && (
          <>
            <a onClick={handleLogout} className={styles.link}>
              Logout
            </a>
            <div className={styles.welcomeMessage}>
              Welcome, {loggedInUser}!
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

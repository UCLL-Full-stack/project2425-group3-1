import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/header.module.css"; 

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    setLoggedInUser(user);
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
        {loggedInUser ? (
      <>
        <a
          onClick={handleLogout}
          className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg cursor-pointer"
        >
          Logout
        </a>
      
        <div className={`${styles.welcomeMessage} text-white mt-2 md:mt-0 pt-1 md:pt-0`}>
          Welcome, {loggedInUser}!
        </div>
      </>
    ) : (
      <Link
        href="/login"
        className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
      >
        Login
      </Link>
    )}
      </nav>
    </header>
  );
};

export default Header;
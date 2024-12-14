import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import styles from "../styles/header.module.css";
import Language from "./language/Language"; // Import the Language component

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const { t } = useTranslation();

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
      <h1 className={styles.title}>{t("app.title")}</h1>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          {t("header.nav.home")}
        </Link>
        <Link href="/workouts" className={styles.link}>
          {t("header.nav.workouts")}
        </Link>
        <Link href="/schedules" className={styles.link}>
          {t("header.nav.schedules")}
        </Link>
        <Link href="/bmi" className={styles.link}>
          {t("header.nav.bmi")}
        </Link>
        {!loggedInUser && (
          <>
            <Link href="/login" className={styles.link}>
              {t("header.nav.login")}
            </Link>
            <Link href="/signup" className={styles.link}>
              {t("header.nav.signup")}
            </Link>
          </>
        )}
        {loggedInUser && (
          <>
            <a onClick={handleLogout} className={styles.link}>
              {t("header.nav.logout")}
            </a>
            <div className={styles.welcomeMessage}>
              {t("header.welcome")}, {loggedInUser}!
            </div>
          </>
        )}
        <div className={styles.languageSelector}>
          <Language /> 
        </div>
      </nav>
    </header>
  );
};

export default Header;

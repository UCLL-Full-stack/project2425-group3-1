import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import styles from "../styles/header.module.css";
import Language from "./language/Language";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
    const userData = sessionStorage.getItem("loggedInUser");
    if (userData) {
      setLoggedInUser(userData);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    alert("You have been logged out!");
    router.push("/login");

    // window.location.reload();
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

        {isHydrated && (
          <>
            {!loggedInUser ? (
              <>
                <Link href="/login" className={styles.link}>
                  {t("header.nav.login")}
                </Link>
                <Link href="/signup" className={styles.link}>
                  {t("header.nav.signup")}
                </Link>
              </>
            ) : (
              <>
                <a onClick={handleLogout} className={styles.link}>
                  {t("header.nav.logout")}
                </a>
                <div className={styles.welcomeMessage}>
                  {t("header.welcome")}, {loggedInUser}!
                </div>
              </>
            )}
          </>
        )}
      </nav>

      <div className={styles.languageWrapper}>
        <Language />
      </div>
    </header>
  );
};

export default Header;

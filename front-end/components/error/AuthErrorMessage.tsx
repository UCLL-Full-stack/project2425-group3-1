import React from "react";
import styles from "@/styles/workouts.module.css";

const AuthErrorMessage: React.FC = () => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>
        You must be logged in to be able to view this page.
      </p>
    </div>
  );
};

export default AuthErrorMessage;

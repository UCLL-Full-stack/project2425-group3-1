import styles from "@/styles/workouts.module.css";
import React from "react";

const RoleErrorMessage: React.FC = () => {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.h1Err}>ERROR CODE 401</h1>
      <p className={styles.errorMessage}>
        You are not authorized to view this page!
      </p>
    </div>
  );
};

export default RoleErrorMessage;

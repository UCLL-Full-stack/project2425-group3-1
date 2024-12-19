import React, { useEffect } from "react";
import styles from "@/styles/workouts.module.css";
import { useRouter } from "next/router";

const AuthErrorMessage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login"); // Redirect after a delay
    }, 1500); // 3-second delay

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [router]);

  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>
        You must be logged in to view this page. Redirecting to login...
      </p>
    </div>
  );
};

export default AuthErrorMessage;

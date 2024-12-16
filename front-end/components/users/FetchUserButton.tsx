import { useRouter } from "next/router";
import styles from "@/styles/bmi.module.css";
import React from "react";

const FetchUserButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/users");
  };

  return (
    <>
      <div>
        <button className={styles.button} onClick={handleClick}>
          fetch user data
        </button>
      </div>
    </>
  );
};

export default FetchUserButton;

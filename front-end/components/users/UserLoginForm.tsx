import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "@/styles/login.module.css";
import UserService from "@/services/UserService"; 

const UserLoginForm: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Username is required.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) return;

   
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

 
    const user = users.find(
      (user: { username: string; password: string }) =>
        user.username === name && user.password === password
    );

    if (!user) {
      setStatusMessages([
        {
          message: "User does not exist or password is incorrect.",
          type: "error",
        },
      ]);
      return;
    }

   
    setStatusMessages([
      {
        message: "Login successful!",
        type: "success",
      },
    ]);

    localStorage.setItem("loggedInUser", name);

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Login</h3>
      {statusMessages.length > 0 && (
        <div className={styles.statusMessageContainer}>
          <ul className={styles.statusMessageList}>
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  [styles.errorMessage]: type === "error",
                  [styles.successMessage]: type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="nameInput" className={styles.label}>
          Username
        </label>
        <input
          id="nameInput"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputField}
        />
        {nameError && <div className={styles.errorMessage}>{nameError}</div>}

        <label htmlFor="passwordInput" className={styles.label}>
          Password
        </label>
        <input
          id="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}

        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;

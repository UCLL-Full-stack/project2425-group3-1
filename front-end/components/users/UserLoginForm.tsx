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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) return;

    try {
        const user = { username: name, password }; // Assuming the user object is structured like this
        const response = await UserService.loginUser(user);

        // Assuming the backend returns a token or user data on successful login
        if (response.token) {
            localStorage.setItem("jwtToken", response.token);
            setStatusMessages([
                {
                    message: "Login successful!",
                    type: "success",
                },
            ]);
            localStorage.setItem("loggedInUser", name);
            setTimeout(() => {
                router.push("/"); // Redirect to the home page
            }, 2000);
        } else {
            setStatusMessages([
                {
                    message: "Login failed. Please check your credentials.",
                    type: "error",
                },
            ]);
        }
    } catch (error) {
        setStatusMessages([
            {
                message: "An error occurred during login.",
                type: "error",
            },
        ]);
    }
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

import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "@/styles/signup.module.css";
import UserService from "@/services/UserService"; 

const UserSignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role] = useState("user");

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setUsernameError(null);
    setPasswordError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setEmailError(null);
    setStatusMessages([]); 
  };

  const validate = (): boolean => {
    let result = true;

    if (!username.trim()) {
      setUsernameError("Username is required.");
      result = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      result = false;
    }

    if (!firstName.trim()) {
      setFirstNameError("First Name is required.");
      result = false;
    }

    if (!lastName.trim()) {
      setLastNameError("Last Name is required.");
      result = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required.");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
        return;
    }

    try {
        const user = {
            username,
            password,
            firstName,
            lastName,
            email,
            role,
        };

        const response = await UserService.signupUser(user);

        if (response && response.message) {
            setStatusMessages([{
                message: response.message,  
                type: "success",
            }]);

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }
    } catch (err) {
        console.error("Signup error:", err);
        setStatusMessages([{
            message: "Signup failed. Please try again.",
            type: "error",
        }]);
    }
};

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Sign Up</h3>
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
        <label htmlFor="usernameInput" className={styles.label}>Username</label>
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className={classNames(styles.inputField, {
            [styles.inputError]: usernameError,
          })}
        />
        {usernameError && <div className={styles.errorMessage}>{usernameError}</div>}

        <label htmlFor="passwordInput" className={styles.label}>Password</label>
        <input
          id="passwordInput"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={classNames(styles.inputField, {
            [styles.inputError]: passwordError,
          })}
        />
        {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}

        <label htmlFor="firstNameInput" className={styles.label}>First Name</label>
        <input
          id="firstNameInput"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className={classNames(styles.inputField, {
            [styles.inputError]: firstNameError,
          })}
        />
        {firstNameError && <div className={styles.errorMessage}>{firstNameError}</div>}

        <label htmlFor="lastNameInput" className={styles.label}>Last Name</label>
        <input
          id="lastNameInput"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className={classNames(styles.inputField, {
            [styles.inputError]: lastNameError,
          })}
        />
        {lastNameError && <div className={styles.errorMessage}>{lastNameError}</div>}

        <label htmlFor="emailInput" className={styles.label}>Email</label>
        <input
          id="emailInput"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={classNames(styles.inputField, {
            [styles.inputError]: emailError,
          })}
        />
        {emailError && <div className={styles.errorMessage}>{emailError}</div>}

        <button type="submit" className={styles.submitButton}>Sign Up</button>
      </form>
    </div>
  );
};

export default UserSignUpForm;

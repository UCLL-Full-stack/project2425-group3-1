import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import styles from "@/styles/login.module.css";
import UserService from "@/services/UserService";

const UserLoginForm: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();
  const { t } = useTranslation();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name.trim()) {
      setNameError(t("login.validate.name"));
      result = false;
    }

    if (!password.trim()) {
      setPasswordError(t("login.validate.password"));
      result = false;
    }

    return result;
  };

  const handleNoAccount = async () => {
    return router.push("/signup");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    try {
      const user = { username: name, password };
      const response = await UserService.loginUser(user);

      if (response.token) {
        sessionStorage.setItem("jwtToken", response.token);
        setStatusMessages([
          {
            message: t("login.success"),
            type: "success",
          },
        ]);
        sessionStorage.setItem("loggedInUser", name);
        sessionStorage.setItem("userId", response.userId);
        sessionStorage.setItem("userRole", response.role);

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setStatusMessages([
          {
            message: t("general.error"),
            type: "error",
          },
        ]);
      }
    } catch (error) {
      setStatusMessages([
        {
          message: t("general.error"),
          type: "error",
        },
      ]);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>{t("login.title")}</h3>
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
          {t("login.label.username")}
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
          {t("login.label.password")}
        </label>
        <input
          id="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        {passwordError && (
          <div className={styles.errorMessage}>{passwordError}</div>
        )}
        <p className={styles.pButton} onClick={handleNoAccount} role="button">
          No account yet? sign up here!{" "}
        </p>
        <button type="submit" className={styles.submitButton}>
          {t("login.button")}
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;

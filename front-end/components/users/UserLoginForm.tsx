import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/login.module.css"; 

const UserLoginForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setNameError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    clearErrors();
    let result = true;

    if (!name.trim()) {
      setNameError("Username is required.");
      result = false;
    }

    return result;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    clearErrors();

    if (!validate()) {
      return; 
    }

    setStatusMessages([ 
        ...statusMessages,
        { message: "Login successful", type: "success" },
    ]);

    sessionStorage.setItem("loggedInUser", name);

    setTimeout(() => {
      router.push("/"); 
    }, 2000);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Login</h3>
      {statusMessages.length > 0 && (
        <div className="row">
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
      <form onSubmit={handleSubmit}>
      <label htmlFor="nameInput" className={styles.label}>Username:</label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={styles.inputField} 
          />
        </div>

        {nameError && <p className={styles.errorMessage}>{nameError}</p>}

        <button
          className={styles.submitButton} 
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;

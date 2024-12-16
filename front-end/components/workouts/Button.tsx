import React from "react";
import classNames from "classnames";
import styles from "@/styles/workouts.module.css";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ onClick, disabled, isActive, children }) => (
  <button
    className={classNames(styles.button, {
      [styles.activeButton]: isActive,
      [styles.inactiveButton]: !isActive,
    })}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;

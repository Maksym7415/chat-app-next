import React from "react";
import styles from "./CustomButton.module.scss";

const CustomButton = ({ children, onClick, style }) => (
  <button onClick={onClick} className={styles.root} style={style}>
    {children}
  </button>
);

export default CustomButton;

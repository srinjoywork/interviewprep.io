import React from "react";

import styles from "./InputControl.module.css";

export default function InputControl({ label, ...props }) {
  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <input type="text" {...props} />
    </div>
  );
}



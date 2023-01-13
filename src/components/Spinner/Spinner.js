import React, { useEffect } from "react";
import BSpinner from "react-bootstrap/Spinner";
import styles from "./SpinnerStyle.module.css";

export default function Spinner() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.spinnerContainer}>
      <BSpinner animation="border" role="status" className={styles.spinner}>
        <span className="visually-hidden">Loading...</span>
      </BSpinner>
    </div>
  );
}

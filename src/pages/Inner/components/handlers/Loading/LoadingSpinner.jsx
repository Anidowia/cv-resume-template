import React from "react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
	return <div className={styles.spinner} data-testid="spinnerContainer"></div>;
};

export default LoadingSpinner;

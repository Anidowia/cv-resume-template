import LoadingSpinner from "../pages/Inner/components/LoadingSpinner";
import styles from "../pages/Inner/components/LoadingSpinner.module.scss";

export const renderSpinner = (loading) =>
	loading && (
		<div className={styles.spinnerContainer}>
			<LoadingSpinner />
		</div>
	);

export const renderError = (error) =>
	error && <div className={styles.error}>{error}</div>;

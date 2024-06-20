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

export const getTickLabel = (value) => {
	if (value === 0) return "Beginner";
	if (value === 30) return "Proficient";
	if (value === 70) return "Expert";
	if (value === 100) return "Master";
	return "";
};

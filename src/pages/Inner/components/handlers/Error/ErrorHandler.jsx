import styles from "./ErrorHandler.module.scss";

const ErrorHandler = ({ error }) => {
	return (
		<div className={styles.error} div data-testid="error">
			{error}
		</div>
	);
};

export default ErrorHandler;

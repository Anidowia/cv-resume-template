import styles from "./Input.module.scss";

import { useField } from "formik";

const Input = ({ placeholder, hasError, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<div className={styles.container}>
			<input
				placeholder={placeholder}
				{...field}
				{...props}
				className={`${styles["container-input"]} ${meta.error && styles.inputError}`}
			/>
		</div>
	);
};

export default Input;

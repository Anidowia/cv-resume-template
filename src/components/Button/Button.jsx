import styles from "./Button.module.scss";

const Button = ({ icon, text, onClick, type }) => {
	const handleClick = () => {
		onClick && onClick();
	};

	return (
		<button
			className={styles["container__button"]}
			onClick={handleClick}
			type={type}
		>
			{icon && <span className={styles.icon}>{icon}</span>}
			{text}
		</button>
	);
};

export default Button;

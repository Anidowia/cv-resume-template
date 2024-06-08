import styles from "./Button.module.scss";

const Button = ({ text, onClick }) => {
	const handleClick = () => {
		onClick && onClick();
	};

	return (
		<button className={styles["container__button"]} onClick={handleClick}>
			{text}
		</button>
	);
};

export default Button;

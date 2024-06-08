import styles from "./Navigation.module.scss";

const Navigation = ({ icon, children }) => {
	return (
		<div className={`${styles["navigation"]}`}>
			<div className={styles["navigation__icon"]}>{icon}</div>
			<div className={styles["navigation__text"]}>{children}</div>
		</div>
	);
};

export default Navigation;

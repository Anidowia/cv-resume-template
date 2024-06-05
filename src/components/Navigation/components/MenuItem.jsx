import React from "react";

import styles from "../../../assets/styles/MenuItem.module.scss";

const MenuItem = ({ icon, children }) => {
	return (
		<div className={`${styles["menu-item"]}`}>
			<div className={styles["menu-item__icon"]}>
				{React.cloneElement(icon)}
			</div>
			<div className={styles["menu-item__text"]}>{children}</div>
		</div>
	);
};

export default MenuItem;

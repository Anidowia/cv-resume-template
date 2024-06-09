import { animateScroll as scroll } from "react-scroll";

import styles from "./PanelBack.module.scss";

const scrollToTop = () => {
	scroll.scrollToTop();
};

const PanelBack = () => {
	return (
		<div className={styles["burger__back"]} onClick={scrollToTop}>
			<div className={styles["arrow"]}></div>
		</div>
	);
};

export default PanelBack;

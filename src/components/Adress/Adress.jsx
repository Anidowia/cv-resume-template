import {
	Email,
	Instagram,
	LocalPhone,
	Telegram,
	Twitter,
} from "@mui/icons-material";

import Navigation from "../Navigation/Navigation";

import styles from "./Adress.module.scss";

const Adress = ({ title, isClosed }) => {
	return (
		<div
			className={`${styles.adress} ${isClosed ? styles.adressShifted : ""}`}
			id="contacts"
		>
			<h1>{title}</h1>
			<div className={styles["adress__content"]}>
				<Navigation icon={<LocalPhone className={styles["icons-color"]} />}>
					<a href="tel:+7772659414">
						<b>777 265 9414</b>
					</a>
				</Navigation>
				<Navigation icon={<Email className={styles["icons-color"]} />}>
					<a href="mailto:d.sherubayeva@gmail.com">
						<b>d.sherubayeva@gmail.com</b>
					</a>
				</Navigation>
				<Navigation icon={<Twitter className={styles["icons-color"]} />}>
					<h6>Twitter</h6>
					<a href="https://twitter.com/anidowia">
						https://twitter.com/anidowia
					</a>
				</Navigation>
				<Navigation icon={<Instagram className={styles["icons-color"]} />}>
					<h6>Instagram</h6>
					<a href="https://www.instagram.com/jst_dn">
						https://www.instagram.com/jst_dn
					</a>
				</Navigation>
				<Navigation icon={<Telegram className={styles["icons-color"]} />}>
					<h6>Telegram</h6>
					<a href="https://t.me/anidowia">https://t.me/anidowia</a>
				</Navigation>
			</div>
		</div>
	);
};

export default Adress;

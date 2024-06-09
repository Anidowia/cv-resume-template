import styles from "./PhotoBox.module.scss";

const PhotoBox = ({ name, title, description, avatar, iconSize = "big" }) => {
	return (
		<div className={`${styles.photoBox} ${styles[iconSize]}`}>
			<div className={styles["avatar"]}>
				<img src={avatar} alt={`${name}'s avatar`} className={styles["logo"]} />
			</div>
			<h1>{name}</h1>
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	);
};

export default PhotoBox;

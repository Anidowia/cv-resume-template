import styles from "../../assets/styles/PhotoBox.module.scss";

const PhotoBox = ({ name, title, description, avatar }) => {
	return (
		<div className={styles["photo-box"]}>
			<div className={styles["photo-box__avatar"]}>
				<img
					src={avatar}
					alt={`${name}'s avatar`}
					className={styles["photo-box__avatar-logo"]}
				/>
			</div>
			<h1>{name}</h1>
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	);
};

export default PhotoBox;

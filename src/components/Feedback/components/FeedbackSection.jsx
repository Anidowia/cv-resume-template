import logo from "../../../assets/images/me.png";

import styles from "../Feedback.module.scss";

const FeedbackSection = ({ text, author }) => {
	return (
		<div>
			<div className={styles["feedback__text"]}>
				<p>{text}</p>
			</div>
			<div className={styles["feedback__author"]}>
				<div className={styles["avatar"]}>
					<img src={logo} alt={`avatar`} className={styles["logo"]} />
				</div>
				<p>
					{author.name}&nbsp;
					<a href={author.website}>{author.website}</a>
				</p>
			</div>
		</div>
	);
};

export default FeedbackSection;

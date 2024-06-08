import styles from "./Expertise.module.scss";

const Expertise = ({ title, isClosed, data }) => {
	return (
		<div
			className={`${styles.expertise} ${isClosed ? styles.expertiseShifted : ""}`}
			id="experience"
		>
			<h1>{title}</h1>
			<div className={styles["expertise__content"]}>
				{data.map((item, index) => (
					<div key={index} className={styles["item"]}>
						<div className={styles["date"]}>
							<h3>{item.info.company}</h3>
							{item.date}
						</div>
						<div className={styles["info"]}>
							<h4>{item.info.job}</h4>
							<p>{item.info.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Expertise;

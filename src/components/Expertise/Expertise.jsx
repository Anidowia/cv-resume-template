import styles from "../../assets/styles/Expertise.module.scss";

const Expertise = ({ title, isClosed, data }) => {
	return (
		<div
			className={`${styles.expertise} ${isClosed ? styles.expertiseShifted : ""}`}
		>
			<h1>{title}</h1>
			<div className={styles["expertise__content"]}>
				{data.map((item, index) => (
					<div key={index} className={styles["expertise__item"]}>
						<div className={styles["expertise__date"]}>
							<h3>{item.info.company}</h3>
							{item.date}
						</div>
						<div className={styles["expertise__info"]}>
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

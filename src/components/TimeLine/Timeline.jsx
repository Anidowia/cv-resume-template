import styles from "./Timeline.module.scss";

const Timeline = ({ title, data, isClosed }) => {
	return (
		<section
			className={`${styles.timeline} ${isClosed ? styles.timelineShifted : ""}`}
			id="education"
		>
			<h1>{title}</h1>

			{data.map((event, index) => (
				<div key={index} className={styles.timeline__event}>
					<div className={styles["date"]}>{event.date}</div>
					<div className={styles["content"]}>
						<h3>{event.title}</h3>
						<p>{event.text}</p>
					</div>
				</div>
			))}
		</section>
	);
};

export default Timeline;

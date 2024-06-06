import styles from "../../assets/styles/Timeline.module.scss";

const Timeline = ({ title, data, isClosed }) => {
	return (
		<div
			className={`${styles.timeline} ${isClosed ? styles.timelineShifted : ""}`}
		>
			<h1>{title}</h1>

			{data.map((event, index) => (
				<div key={index} className={styles.timeline__event}>
					<div className={styles["timeline__event-date"]}>{event.date}</div>
					<div className={styles["timeline__event-content"]}>
						<h3>{event.title}</h3>
						<p>{event.text}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Timeline;

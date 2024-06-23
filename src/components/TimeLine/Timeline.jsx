import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { renderError, renderSpinner } from "../../helpers/helpers";
import { fetchEducation } from "../../store/slices/educationSlice";

import styles from "./Timeline.module.scss";

const Timeline = ({ title, isClosed }) => {
	const dispatch = useDispatch();
	const { educations, loading, error } = useSelector(
		(state) => state.education
	);

	useEffect(() => {
		dispatch(fetchEducation());
	}, [dispatch]);

	const renderTimelineEvents =
		!loading &&
		!error &&
		educations.map((event, index) => (
			<div key={index} className={styles.timeline__event}>
				<div className={styles["date"]}>{event.date}</div>
				<div className={styles["content"]}>
					<h3>{event.title}</h3>
					<p>{event.text}</p>
				</div>
			</div>
		));

	return (
		<section
			className={`${styles.timeline} ${isClosed ? styles.timelineShifted : ""}`}
			id="education"
		>
			<h1>{title}</h1>

			{renderSpinner(loading)}
			{renderError(error)}
			{renderTimelineEvents}
		</section>
	);
};

export default Timeline;

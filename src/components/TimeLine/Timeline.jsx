import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchEducation } from "../../store/slices/educationSlice";

import LoadingSpinner from "../../pages/Inner/components/LoadingSpinner";

import styles from "./Timeline.module.scss";

const Timeline = ({ title, isClosed }) => {
	const dispatch = useDispatch();
	const { educations, loading, error } = useSelector(
		(state) => state.education
	);

	useEffect(() => {
		dispatch(fetchEducation());
	}, [dispatch]);

	const renderSpinner = loading && (
		<div className={styles.spinnerContainer}>
			<LoadingSpinner />
		</div>
	);

	const renderError = error && <div className={styles.error}>{error}</div>;

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

			{renderSpinner}
			{renderError}
			{renderTimelineEvents}
		</section>
	);
};

export default Timeline;

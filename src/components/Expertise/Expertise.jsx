import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchExperience } from "../../store/slices/experienceSlice";

import { renderSpinner, renderError } from "../../helpers/helpers";

import styles from "./Expertise.module.scss";

const Expertise = ({ title, isClosed }) => {
	const dispatch = useDispatch();
	const { experience, loading, error } = useSelector(
		(state) => state.experience
	);

	useEffect(() => {
		dispatch(fetchExperience());
	}, [dispatch]);

	const renderExperience = !loading && !error && (
		<div className={styles["expertise__content"]}>
			{experience.map((item, index) => (
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
	);

	return (
		<section
			className={`${styles.expertise} ${isClosed ? styles.expertiseShifted : ""}`}
			id="experience"
		>
			<h1>{title}</h1>
			{renderSpinner(loading)}
			{renderError(error)}
			{renderExperience}
		</section>
	);
};

export default Expertise;

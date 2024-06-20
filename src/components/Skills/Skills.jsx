import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSkills } from "../../store/slices/skillsSlice";
import {
	renderSpinner,
	renderError,
	getTickLabel,
} from "../../helpers/helpers";

import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { BorderColor } from "@mui/icons-material";

import Button from "../Button/Button";
import Form from "./components/Form/Form";

import styles from "./Skills.module.scss";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const Skills = ({ title, isClosed }) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const dispatch = useDispatch();
	const { chartData, loading, error, options } = useSelector(
		(state) => state.skills
	);

	useEffect(() => {
		dispatch(fetchSkills());
	}, [dispatch]);

	const handleClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleCloseForm = () => {
		setIsFormOpen(false);
	};

	const chartOptions = {
		...options,
		scales: {
			...options.scales,
			x: {
				...options.scales.x,
				ticks: {
					...options.scales.x.ticks,
					callback: getTickLabel,
				},
			},
		},
	};

	const renderContent = isFormOpen ? (
		<Form isClosed={isClosed} onCloseForm={handleCloseForm} />
	) : (
		<>
			{renderSpinner(loading)}
			{renderError(error)}
			{!loading && !error && <Bar data={chartData} options={chartOptions} />}
		</>
	);

	return (
		<section
			className={`${styles.skills} ${isClosed ? styles.skillsShifted : ""}`}
			id="skills"
		>
			<div className={styles["skills-name"]}>
				<h1>{title}</h1>
				<Button
					icon={<BorderColor />}
					text={isFormOpen ? "Close edit" : "Open edit"}
					onClick={handleClick}
				/>
			</div>
			<div className={styles.chartContainer}>{renderContent}</div>
		</section>
	);
};

export default Skills;

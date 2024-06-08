import React, { useState, useEffect } from "react";
import Info from "../Info/Info";
import styles from "./Portfolio.module.scss";

const projects = [
	{ title: "Project 1", category: "ui" },
	{ title: "Project 2", category: "code" },
	{ title: "Project 3", category: "ui" },
	{ title: "Project 4", category: "code" },
];

const Portfolio = ({ title, isClosed }) => {
	const [filterKey, setFilterKey] = useState("all");
	const [projectsToShow, setProjectsToShow] = useState([]);

	useEffect(() => {
		if (filterKey === "all") {
			setProjectsToShow(projects);
		} else {
			const filteredProjects = projects.filter(
				(project) => project.category === filterKey
			);
			setProjectsToShow(filteredProjects);
		}
	}, [filterKey]);

	const handleFilterKeyChange = (key) => {
		setFilterKey(key);
	};

	return (
		<div
			className={`${styles.portfolio} ${isClosed ? styles.portfolioShifted : ""}`}
			id="skills"
		>
			<h1>{title}</h1>
			<div className={styles["portfolio__links"]}>
				<p onClick={() => handleFilterKeyChange("all")}>All</p>
				<p> / </p>
				<p onClick={() => handleFilterKeyChange("code")}>Code</p>
				<p> / </p>
				<p onClick={() => handleFilterKeyChange("ui")}>UI</p>
			</div>
			<div className={styles["portfolio__items"]}>
				{projectsToShow.map((project, index) => (
					<div
						key={index}
						className={`${styles[`${project.category}`]} ${
							filterKey === "all" || filterKey === project.category
						}`}
					>
						<div className={styles["info"]}>
							<Info
								heading={project.title}
								text="Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis."
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Portfolio;

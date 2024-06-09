import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Info from "../Info/Info";
import styles from "./Portfolio.module.scss";

const projects = [
	{ id: uuidv4(), title: "Project 1", category: "ui" },
	{ id: uuidv4(), title: "Project 2", category: "code" },
	{ id: uuidv4(), title: "Project 3", category: "ui" },
	{ id: uuidv4(), title: "Project 4", category: "code" },
];

const filterItems = [
	{ label: "All", key: "all" },
	{ label: "Code", key: "code" },
	{ label: "UI", key: "ui" },
];

const Portfolio = ({ title, isClosed }) => {
	const [filterKey, setFilterKey] = useState("all");
	const [projectsToShow, setProjectsToShow] = useState(projects);
	const [animationClass, setAnimationClass] = useState("");
	const [initialRender, setInitialRender] = useState(true);

	useEffect(() => {
		let timeout;

		if (!initialRender) {
			setAnimationClass(styles["shrink-out"]);

			timeout = setTimeout(() => {
				const filteredProjects =
					filterKey === "all"
						? projects
						: projects.filter((project) => project.category === filterKey);
				setProjectsToShow(filteredProjects);

				setAnimationClass(styles["grow-in"]);
			}, 400);
		} else {
			const filteredProjects =
				filterKey === "all"
					? projects
					: projects.filter((project) => project.category === filterKey);
			setProjectsToShow(filteredProjects);
			setInitialRender(false);
		}

		return () => clearTimeout(timeout);
	}, [filterKey]);

	const handleFilterKeyChange = (key) => {
		setFilterKey(key);
	};

	return (
		<section
			className={`${styles.portfolio} ${isClosed ? styles.portfolioShifted : ""}`}
			id="skills"
		>
			<h1>{title}</h1>
			<div className={styles["portfolio__links"]}>
				{filterItems.map((item, index) => (
					<React.Fragment key={item.key}>
						{index > 0 && <p> / </p>}
						<p onClick={() => handleFilterKeyChange(item.key)}>{item.label}</p>
					</React.Fragment>
				))}
			</div>
			<div className={styles["portfolio__items"]}>
				{projectsToShow.map((project) => (
					<div
						key={project.id}
						className={`${styles[`${project.category}`]} ${animationClass}`}
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
		</section>
	);
};

export default Portfolio;

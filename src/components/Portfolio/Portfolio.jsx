import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
	const nodeRefs = useRef(new Map());

	useEffect(() => {
		const filteredProjects =
			filterKey === "all"
				? projects
				: projects.filter((project) => project.category === filterKey);
		setProjectsToShow(filteredProjects);
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
			<TransitionGroup className={styles["portfolio__items"]}>
				{projectsToShow.map((project) => {
					const nodeRef = React.createRef();
					nodeRefs.current.set(project.id, nodeRef);
					return (
						<CSSTransition
							key={project.id}
							nodeRef={nodeRef}
							timeout={400}
							classNames={{
								enter: styles["grow-in"],
								enterActive: styles["grow-in-active"],
								exit: styles["shrink-out"],
								exitActive: styles["shrink-out-active"],
							}}
						>
							<div ref={nodeRef} className={styles[`${project.category}`]}>
								<div className={styles["info"]}>
									<Info
										heading={project.title}
										text="Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis."
									/>
								</div>
							</div>
						</CSSTransition>
					);
				})}
			</TransitionGroup>
		</section>
	);
};

export default Portfolio;

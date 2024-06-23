import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { setFilterKey } from "../../store/slices/portfolioSlice";

import Info from "../Info/Info";
import styles from "./Portfolio.module.scss";

const Portfolio = ({ title, isClosed }) => {
	const dispatch = useDispatch();
	const { projects, filterItems, filterKey } = useSelector(
		(state) => state.portfolio
	);
	const nodeRefs = useRef(new Map());

	const projectsToShow =
		filterKey === "all"
			? projects
			: projects.filter((project) => project.category === filterKey);

	const handleFilterKeyChange = (key) => {
		dispatch(setFilterKey(key));
	};

	return (
		<section
			className={`${styles.portfolio} ${isClosed ? styles.portfolioShifted : ""}`}
			id="workExperience"
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

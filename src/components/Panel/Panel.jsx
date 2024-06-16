import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import {
	School,
	Person3,
	Create,
	Diamond,
	Work,
	NearMe,
	Chat,
	ChevronLeft,
} from "@mui/icons-material";

import Navigation from "../Navigation/Navigation";
import PhotoBox from "../PhotoBox/PhotoBox";
import PanelBack from "./components/PanelBack";

import logo from "../../assets/images/me.png";
import styles from "./Panel.module.scss";

const navItems = [
	{ to: "aboutMe", icon: <Person3 />, label: "About me" },
	{ to: "education", icon: <School />, label: "Education" },
	{ to: "experience", icon: <Create />, label: "Experience" },
	{ to: "skills", icon: <Diamond />, label: "Skills" },
	{ to: "workExperience", icon: <Work />, label: "Portfolio" },
	{ to: "contacts", icon: <NearMe />, label: "Contacts" },
	{ to: "feedbacks", icon: <Chat />, label: "Feedbacks" },
];

const Panel = ({ isClosed, toggleSidebar }) => {
	return (
		<aside>
			<PanelBack />
			<div className={`${styles.panel} ${isClosed ? styles.closed : ""}`}>
				<div className={styles["panel__burger"]} onClick={toggleSidebar}>
					<div className={styles["container"]}>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
				<div className={styles["avatar"]}>
					<PhotoBox name="Dina Sherubayeva" avatar={logo} />
				</div>
				<div className={styles["panel__content"]}>
					<nav className={styles["links"]}>
						<ul>
							{navItems.map(({ to, icon, label }) => (
								<li key={to}>
									<ScrollLink to={to} smooth={true} duration={500}>
										<Navigation icon={icon}>
											<span>{label}</span>
										</Navigation>
									</ScrollLink>
								</li>
							))}
							<li>
								<Link to="/">
									<div className={styles["panel__back"]}>
										<Navigation icon={<ChevronLeft />}>
											<p>Go back</p>
										</Navigation>
									</div>
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</aside>
	);
};

export default Panel;

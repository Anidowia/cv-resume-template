import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import PhotoBox from "../PhotoBox/PhotoBox";
import logo from "../../assets/images/me.png";
import styles from "./Panel.module.scss";
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

const scrollToTop = () => {
	scroll.scrollToTop();
};

const Panel = ({ isClosed, toggleSidebar }) => {
	return (
		<div className={`${styles.panel} ${isClosed ? styles.closed : ""}`}>
			<div className={styles["panel__burger"]} onClick={toggleSidebar}>
				<div className={styles["container"]}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div className={styles["burger__back"]} onClick={scrollToTop}>
				<div className={styles["arrow"]}></div>
			</div>
			<div className={styles["avatar"]}>
				<PhotoBox name="Dina Sherubayeva" avatar={logo} />
			</div>
			<div className={styles["panel__content"]}>
				<div className={styles["links"]}>
					<ScrollLink to="aboutMe" smooth={true} duration={500}>
						<Navigation icon={<Person3 />}>
							<span>About me</span>
						</Navigation>
					</ScrollLink>
					<ScrollLink to="education" smooth={true} duration={500}>
						<Navigation icon={<School />}>
							<span>Education</span>
						</Navigation>
					</ScrollLink>
					<ScrollLink to="experience" smooth={true} duration={500}>
						<Navigation icon={<Create />}>
							<span>Experience</span>
						</Navigation>
					</ScrollLink>
					<ScrollLink to="skills" smooth={true} duration={500}>
						<Navigation icon={<Diamond />}>
							<span>Skills</span>
						</Navigation>
					</ScrollLink>
					<ScrollLink to="workExperience" smooth={true} duration={500}>
						<Navigation icon={<Work />}>
							<span>Experience</span>
						</Navigation>
					</ScrollLink>
					<ScrollLink to="contacts" smooth={true} duration={500}>
						<Navigation icon={<NearMe />}>
							<span>Contacts</span>
						</Navigation>
					</ScrollLink>
					<ScrollLink to="feedbacks" smooth={true} duration={500}>
						<Navigation icon={<Chat />}>
							<span>Feedbacks</span>
						</Navigation>
					</ScrollLink>
					<Link to="/">
						<div className={styles["panel__back"]}>
							<Navigation icon={<ChevronLeft />}>
								<p>Go back</p>
							</Navigation>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Panel;

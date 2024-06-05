import MenuItem from "./components/MenuItem";
import PhotoBox from "../PhotoBox/PhotoBox";
import logo from "../../assets/images/me.png";

import styles from "../../assets/styles/Navigation.module.scss";
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

const Navigation = () => {
	return (
		<div className={styles["navigation"]}>
			<div className={styles["navigation__burger"]}>
				<div className={styles["navigation__burger-container"]}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div className={styles["navigation__avatar"]}>
				<PhotoBox name="Dina Sherubayeva" avatar={logo} />
			</div>
			<MenuItem icon={<Person3 />}>About me</MenuItem>
			<MenuItem icon={<School />}>Education</MenuItem>
			<MenuItem icon={<Create />}>Experience</MenuItem>
			<MenuItem icon={<Diamond />}>Skills</MenuItem>
			<MenuItem icon={<Work />}>Experience</MenuItem>
			<MenuItem icon={<NearMe />}>Contacts</MenuItem>
			<MenuItem icon={<Chat />}>Feedbacks</MenuItem>
			<div className={styles["navigation__back"]}>
				<MenuItem icon={<ChevronLeft />}>Go back</MenuItem>
			</div>
		</div>
	);
};

export default Navigation;

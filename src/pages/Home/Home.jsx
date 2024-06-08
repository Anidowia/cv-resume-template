import { useNavigate } from "react-router-dom";

import PhotoBox from "../../components/PhotoBox/PhotoBox";
import logo from "../../assets/images/me.png";
import Button from "../../components/Button/Button";

import styles from "./Home.module.scss";

const Home = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/about");
	};

	return (
		<div className={styles["home"]}>
			<PhotoBox
				name="Dina Sherubayeva"
				title="Programmer. Creative. Innovator"
				description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque"
				avatar={logo}
				iconSize="big"
			/>
			<div className={styles["home__button"]}>
				<Button text="Know more" onClick={handleClick} />
			</div>
		</div>
	);
};

export default Home;

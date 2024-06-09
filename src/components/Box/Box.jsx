import styles from "./Box.module.scss";

const Box = ({ title, content, isClosed }) => {
	return (
		<section
			className={`${styles.box} ${isClosed ? styles.boxShifted : ""}`}
			id="aboutMe"
		>
			<h1>{title}</h1>
			<p>{content}</p>
		</section>
	);
};

export default Box;

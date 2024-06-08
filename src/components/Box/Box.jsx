import styles from "./Box.module.scss";

const Box = ({ title, content, isClosed }) => {
	return (
		<div
			className={`${styles.box} ${isClosed ? styles.boxShifted : ""}`}
			id="aboutMe"
		>
			<h1>{title}</h1>
			<p>{content}</p>
		</div>
	);
};

export default Box;

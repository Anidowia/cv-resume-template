import styles from "../../assets/styles/Box.module.scss";

const Box = ({ title, content, isClosed }) => {
	return (
		<div className={`${styles.box} ${isClosed ? styles.boxShifted : ""}`}>
			<h1>{title}</h1>
			<p>{content}</p>
		</div>
	);
};

export default Box;

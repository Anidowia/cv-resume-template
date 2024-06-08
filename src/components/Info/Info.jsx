import styles from "./Info.module.scss";

const Info = ({ heading, text }) => {
	return (
		<div className={`${styles["info"]}`}>
			<h4>{heading}</h4>
			<p>{text}</p>
			<a href="https://github.com/anidowia">
				<p>View resource</p>
			</a>
		</div>
	);
};

export default Info;

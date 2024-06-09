import styles from "./Info.module.scss";

const Info = ({ heading, text }) => {
	return (
		<section className={`${styles["info"]}`}>
			<h4>{heading}</h4>
			<p>{text}</p>
			<a href="https://github.com/anidowia">
				<p>View resource</p>
			</a>
		</section>
	);
};

export default Info;

import FeedbackSection from "./components/FeedbackSection";

import styles from "./Feedback.module.scss";

const feedbackData = [
	{
		text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.",
		author: {
			name: "Dina",
			website: "https://somesite.com",
		},
	},
	{
		text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.",
		author: {
			name: "me",
			website: "https://example.com",
		},
	},
];

const Feedback = ({ title, isClosed }) => {
	return (
		<div
			className={`${styles.feedback} ${isClosed ? styles.feedbackShifted : ""}`}
			id="feedbacks"
		>
			<h1>{title}</h1>
			{feedbackData.map((feedback, index) => (
				<FeedbackSection
					key={index}
					text={feedback.text}
					author={feedback.author}
				/>
			))}
		</div>
	);
};

export default Feedback;

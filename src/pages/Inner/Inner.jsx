import { useState } from "react";

import Navigation from "../../components/Navigation/Navigation";
import Box from "../../components/Box/Box";

import styles from "../../assets/styles/Inner.module.scss";
import Timeline from "../../components/TimeLine/Timeline";
import Expertise from "../../components/Expertise/Expertise";

const Inner = () => {
	const [isClosed, setIsClosed] = useState(false);

	const toggleSidebar = () => {
		setIsClosed(!isClosed);
	};
	const timelineData = [
		{
			date: 2001,
			title: "Title",
			text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. ",
		},
		{
			date: 2000,
			title: "Title",
			text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. ",
		},
		{
			date: 2012,
			title: "Title",
			text: "Labore esse tempor nisi non mollit enim elit ullamco veniam elit duis nostrud. Enim pariatur ullamco dolor eu sunt ad velit aute eiusmod aliquip voluptate. Velit magna labore eiusmod eiusmod labore amet eiusmod. In duis eiusmod commodo duis. Exercitation Lorem sint do aliquip veniam duis elit quis culpa irure quis nulla. Reprehenderit fugiat amet sint commodo ex.\r\n",
		},
	];
	const expertiseData = [
		{
			date: "2013-2014",
			info: {
				company: "Google",
				job: "Front-end developer / PHP programmer",
				description:
					"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor",
			},
		},
		{
			date: "2012",
			info: {
				company: "Twitter",
				job: "Web developer",
				description:
					"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor",
			},
		},
	];
	return (
		<div>
			<div className={styles["inner"]}>
				<Navigation isClosed={isClosed} toggleSidebar={toggleSidebar} />
				<div className={styles["inner__content"]}>
					<Box
						title="About me"
						content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque"
						isClosed={isClosed}
					/>
					<Timeline title="Education" data={timelineData} isClosed={isClosed} />
					<Expertise
						title="Experience"
						data={expertiseData}
						isClosed={isClosed}
					/>
				</div>
			</div>
		</div>
	);
};

export default Inner;

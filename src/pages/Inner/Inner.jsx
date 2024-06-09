import { useState } from "react";

import Panel from "../../components/Panel/Panel";
import Box from "../../components/Box/Box";

import styles from "./Inner.module.scss";
import Timeline from "../../components/TimeLine/Timeline";
import Expertise from "../../components/Expertise/Expertise";
import Portfolio from "../../components/Portfolio/Portfolio";
import Adress from "../../components/Adress/Adress";
import Feedback from "../../components/Feedback/Feedback";

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
		text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. ",
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

const Inner = () => {
	const [isClosed, setIsClosed] = useState(false);

	const toggleSidebar = () => {
		setIsClosed(!isClosed);
	};
	return (
		<main>
			<div className={styles["inner"]}>
				<Panel isClosed={isClosed} toggleSidebar={toggleSidebar} />
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
					<Portfolio title="Portfolio" isClosed={isClosed} />
					<Adress title="Contacts" isClosed={isClosed} />
					<Feedback title="Feedbacks" isClosed={isClosed} />
				</div>
			</div>
		</main>
	);
};

export default Inner;

import { createServer, Model } from "miragejs";

export function makeServer() {
	createServer({
		timing: 3000,
		models: {
			skill: Model,
		},

		seeds(server) {
			const storedSkills = JSON.parse(localStorage.getItem("skills")) || [];
			storedSkills.forEach((skill) => server.create("skill", skill));

			if (storedSkills.length === 0) {
				server.create("skill", { name: "HTML", range: 100 });
				server.create("skill", { name: "CSS", range: 75 });
				server.create("skill", { name: "jQuery", range: 60 });
				server.create("skill", { name: "PHP", range: 50 });
				server.create("skill", { name: "Laravel 2", range: 30 });
			}
		},

		routes() {
			this.namespace = "api";

			this.get("/educations", () => {
				return {
					educations: [
						{
							date: 2023,
							title: "EPAM",
							text: "Frontend Development course offered by EPAM UpSkill. As a fourth-year student with a passion for technology and innovation I am eager to leverage this opportunity to gain practical expertise and become proficient in frontend technologies. I am confident that upon successful completion of the Frontend Development course, I will be well-equipped to tackle real-world projects and contribute meaningfully to the tech industry.",
						},
						{
							date: 2022,
							title: "Politechnika Śląska",
							text: "Exchange student participating in the Memorandum of Understanding program facilitated by the Kazakhstan Republic Ministry of Higher Education, I had the privilege of studying at Politechnika Śląska in Poland.",
						},
						{
							date: 2020,
							title: "Satbayev University",
							text: "Alumni of Satbayev University, Bachelor's degree in Computer Science. Throughout my academic journey, I have developed a strong foundation in computer science. I am eager to embark on a rewarding career in the dynamic field of technology.",
						},
					],
				};
			});

			this.get("/experience", () => ({
				experience: [
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
				],
			}));

			this.get("/skills", (schema) => {
				return schema.skills.all();
			});

			this.post("/skills", (schema, request) => {
				const newSkill = JSON.parse(request.requestBody);
				const createdSkill = schema.skills.create(newSkill);
				const allSkills = schema.skills.all().models;

				localStorage.setItem("skills", JSON.stringify(allSkills));

				return createdSkill;
			});
		},
	});
}

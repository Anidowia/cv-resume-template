import { makeServer } from "../services/server";

let server;

beforeEach(() => {
	server = makeServer();
});

afterEach(() => {
	server.shutdown();
	localStorage.clear();
});

describe("API Server endpoints", () => {
	it("should return all educations", async () => {
		const res = await fetch("/api/educations");
		const json = await res.json();

		expect(json.educations).toHaveLength(3);
		expect(json.educations[0].title).toBe("EPAM");
	});

	it("should return all experiences", async () => {
		const res = await fetch("/api/experience");
		const json = await res.json();

		expect(json.experience).toHaveLength(2);
		expect(json.experience[0].info.company).toBe("EPAM");
	});
	it("should return all skill models when GET /skills is called", async () => {
		const schema = server.schema;
		const skills = [
			{ id: "1", name: "HTML" },
			{ id: "2", name: "CSS" },
		];
		skills.forEach((skill) => {
			schema.skills.create(skill);
		});

		const response = await fetch("/api/skills");
		const jsonResponse = await response.json();

		expect(jsonResponse.skills).toEqual(skills);
	});

	it("creates a new skill and updates localStorage", async () => {
		const newSkill = { name: "JavaScript", range: 85 };

		const response = await fetch("/api/skills", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newSkill),
		});

		expect(response.status).toBe(201);

		const responseData = await response.json();
		const createdSkill = responseData.skill;

		expect(createdSkill).toBeDefined();
		expect(createdSkill.name).toBe(newSkill.name);
		expect(createdSkill.range).toBe(newSkill.range);
	});

	it("does not override existing skills in server when localStorage has data", () => {
		const existingSkills = [
			{ id: "1", name: "Angular", range: 80 },
			{ id: "2", name: "Vue", range: 75 },
		];
		localStorage.setItem("skills", JSON.stringify(existingSkills));

		//apply seeds function
		server.shutdown();
		server = makeServer({ environment: "test" });

		const allSkills = server.schema.skills.all().models;
		expect(allSkills).toHaveLength(existingSkills.length);

		expect(allSkills[0].name).toBe("Angular");
		expect(allSkills[0].range).toBe(80);

		expect(allSkills[1].name).toBe("Vue");
		expect(allSkills[1].range).toBe(75);
	});
});

import { makeServer } from "../services/server";

let server;

beforeEach(() => {
	server = makeServer();
});

afterEach(() => {
	server.shutdown();
	localStorage.clear();
});

describe("API Endpoints", () => {
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
		expect(json.experience[0].info.company).toBe("Google");
	});

	it("should return all skills", async () => {
		const res = await fetch("/api/skills");
		const json = await res.json();

		expect(json.skills).toHaveLength(3);
		expect(json.skills[0].name).toBe("HTML");
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

	it("initializes server with initial skills when localStorage is empty", () => {
		expect(localStorage.getItem("skills")).toBe(null);

		//initial skills created by seeds function
		const allSkills = server.schema.skills.all().models;
		expect(allSkills).toHaveLength(3);

		expect(allSkills[0].name).toBe("HTML");
		expect(allSkills[0].range).toBe(100);

		expect(allSkills[1].name).toBe("CSS");
		expect(allSkills[1].range).toBe(95);

		expect(allSkills[2].name).toBe("React");
		expect(allSkills[2].range).toBe(70);
	});

	it("does not override existing skills in server when localStorage has data", () => {
		//example of existing skills in localStorage
		const existingSkills = [
			{ id: "1", name: "Angular", range: 80 },
			{ id: "2", name: "Vue", range: 75 },
		];
		localStorage.setItem("skills", JSON.stringify(existingSkills));

		//apply seeds function
		server.shutdown();
		server = makeServer({ environment: "test" });

		//skills from localStorage are not overridden
		const allSkills = server.schema.skills.all().models;
		expect(allSkills).toHaveLength(existingSkills.length);

		expect(allSkills[0].name).toBe("Angular");
		expect(allSkills[0].range).toBe(80);

		expect(allSkills[1].name).toBe("Vue");
		expect(allSkills[1].range).toBe(75);
	});
});

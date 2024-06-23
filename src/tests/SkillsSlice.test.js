import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import fetchMock from "jest-fetch-mock";

import skillsReducer, {
	addSkill,
	fetchSkills,
	initializeSkills,
} from "../store/slices/skillsSlice";

fetchMock.enableMocks();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("fetchSkills async action", () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it("should fetch skills and update state on success", async () => {
		const mockSkills = [{ name: "JavaScript", range: 90 }];
		fetchMock.mockResponseOnce(JSON.stringify({ skills: mockSkills }));

		const store = mockStore({
			skills: { skills: [], loading: false, error: null },
		});

		await store.dispatch(fetchSkills());
		const actions = store.getActions();

		expect(actions[0].type).toEqual(fetchSkills.pending.type);
		expect(actions[1].type).toEqual(fetchSkills.fulfilled.type);
		expect(actions[1].payload).toEqual(mockSkills);
	});

	it("should handle fetch error and update state on failure", async () => {
		const errorMessage = "Failed to fetch skills";
		fetchMock.mockRejectOnce(new Error(errorMessage));

		const store = mockStore({
			skills: { skills: [], loading: false, error: null },
		});

		await store.dispatch(fetchSkills());
		const actions = store.getActions();

		expect(actions[0].type).toEqual(fetchSkills.pending.type);
		expect(actions[1].type).toEqual(fetchSkills.rejected.type);
		expect(actions[1].error.message).toEqual(errorMessage);
	});
});

describe("skills reducer", () => {
	it("should handle initial state", () => {
		const initialState = {
			skills: [],
			loading: false,
			error: null,
		};
		expect(skillsReducer(undefined, {})).toEqual(initialState);
	});

	it("should handle initializeSkills with no stored skills", () => {
		localStorage.removeItem("skills");

		const initialState = {
			skills: [],
			loading: false,
			error: null,
		};
		const expectedState = {
			skills: [
				{ name: "HTML", range: 100 },
				{ name: "CSS", range: 95 },
				{ name: "React", range: 70 },
			],
			loading: false,
			error: null,
		};

		const newState = skillsReducer(initialState, initializeSkills());
		expect(newState.skills).toEqual(expectedState.skills);
		expect(JSON.parse(localStorage.getItem("skills"))).toEqual(
			expectedState.skills
		);
	});

	it("should handle initializeSkills with stored skills", () => {
		const storedSkills = [{ name: "JavaScript", range: 90 }];
		localStorage.setItem("skills", JSON.stringify(storedSkills));

		const initialState = {
			skills: [],
			loading: false,
			error: null,
		};

		const newState = skillsReducer(initialState, initializeSkills());
		expect(newState.skills).toEqual(storedSkills);
	});

	it("should add a new skill to the state", () => {
		const initialState = {
			skills: [],
			loading: false,
			error: null,
		};
		const skillToAdd = { name: "Redux", range: 80 };
		const newState = skillsReducer(initialState, addSkill(skillToAdd));
		expect(newState.skills).toContainEqual(skillToAdd);
	});

	it("should handle fetchSkills.pending", () => {
		const initialState = {
			skills: [],
			loading: false,
			error: null,
		};
		const action = { type: fetchSkills.pending.type };
		const newState = skillsReducer(initialState, action);
		expect(newState).toEqual({
			skills: [],
			loading: true,
			error: null,
		});
	});

	it("should handle fetchSkills.fulfilled", () => {
		const initialState = {
			skills: [],
			loading: false,
			error: null,
		};
		const mockSkills = [{ name: "JavaScript", range: 90 }];
		const action = { type: fetchSkills.fulfilled.type, payload: mockSkills };
		const newState = skillsReducer(initialState, action);
		expect(newState).toEqual({
			skills: mockSkills,
			loading: false,
			error: null,
		});
	});

	it("should handle fetchSkills.rejected", () => {
		const initialState = {
			skills: [],
			loading: false,
			error: null,
		};
		const errorMessage = "Failed to fetch skills";
		const action = {
			type: fetchSkills.rejected.type,
			error: { message: errorMessage },
		};
		const newState = skillsReducer(initialState, action);
		expect(newState).toEqual({
			skills: [],
			loading: false,
			error: errorMessage,
		});
	});
});

describe("addSkill action", () => {
	it("should add a new skill to the state", () => {
		const initialState = {
			skills: [],
			loading: false,
			error: null,
		};
		const skillToAdd = { name: "Redux", range: 80 };
		const newState = skillsReducer(initialState, addSkill(skillToAdd));
		expect(newState.skills).toContainEqual(skillToAdd);
	});
});

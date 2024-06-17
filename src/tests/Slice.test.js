import { configureStore } from "@reduxjs/toolkit";
import skillsReducer, { fetchSkills } from "../store/slices/skillsSlice";

describe("skills slice", () => {
	let store;

	beforeEach(() => {
		store = configureStore({
			reducer: {
				skills: skillsReducer,
			},
		});
	});

	it("should handle fetchSkills.fulfilled with correct data", async () => {
		const mockData = {
			skills: [
				{ name: "Skill 1", range: 80 },
				{ name: "Skill 2", range: 60 },
			],
		};

		jest.spyOn(global, "fetch").mockResolvedValue({
			json: jest.fn().mockResolvedValue(mockData),
		});

		await store.dispatch(fetchSkills());

		expect(store.getState().skills.chartData.labels).toEqual([
			"Skill 1",
			"Skill 2",
		]);
		expect(store.getState().skills.chartData.datasets[0].data).toEqual([
			80, 60,
		]);
		expect(store.getState().skills.loading).toBe(false);
		expect(store.getState().skills.error).toBeNull();

		global.fetch.mockRestore();
	});

	it("should handle fetchSkills.rejected with error message", async () => {
		const errorMessage = "Network Error";

		jest.spyOn(global, "fetch").mockRejectedValueOnce(new Error(errorMessage));

		await store.dispatch(fetchSkills());

		expect(store.getState().skills.loading).toBe(false);
		expect(store.getState().skills.error).toBe(errorMessage);

		global.fetch.mockRestore();
	});
});

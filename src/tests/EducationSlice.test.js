import { configureStore } from "@reduxjs/toolkit";
import educationReducer, {
	fetchEducation,
} from "../store/slices/educationSlice";

// Mock fetch function
global.fetch = jest.fn();

const mockResponse = (status, responseData) =>
	Promise.resolve({
		status,
		json: () => Promise.resolve(responseData),
	});

const store = configureStore({
	reducer: {
		education: educationReducer,
	},
});

describe("fetchEducation async thunk", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should fetch educations correctly", async () => {
		const educationsData = [{ id: 1, title: "Degree" }];
		global.fetch.mockImplementationOnce(() =>
			mockResponse(200, { educations: educationsData })
		);

		await store.dispatch(fetchEducation());

		const state = store.getState().education;
		expect(state.loading).toBe(false);
		expect(state.error).toBe(null);
		expect(state.educations).toEqual(educationsData);
	});

	it("should handle fetch error correctly", async () => {
		const errorMessage = "Failed to fetch educations";
		global.fetch.mockImplementationOnce(() =>
			Promise.reject(new Error(errorMessage))
		);

		await store.dispatch(fetchEducation());

		const state = store.getState().education;
		expect(state.loading).toBe(false);
		expect(state.error).toBe(errorMessage);
	});
});

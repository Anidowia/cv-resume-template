import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchExperience = createAsyncThunk(
	"experience/fetchExperience",
	async () => {
		const response = await fetch("/api/experience");
		return response.json();
	}
);

const experienceSlice = createSlice({
	name: "experience",
	initialState: {
		experience: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchExperience.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchExperience.fulfilled, (state, action) => {
				state.loading = false;
				state.experience = action.payload.experience;
			})
			.addCase(fetchExperience.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default experienceSlice.reducer;

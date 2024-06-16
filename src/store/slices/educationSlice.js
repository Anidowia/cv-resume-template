import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEducation = createAsyncThunk(
	"education/fetchEducation",
	async () => {
		const response = await fetch("/api/educations");
		return response.json();
	}
);

const educationSlice = createSlice({
	name: "education",
	initialState: {
		educations: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEducation.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchEducation.fulfilled, (state, action) => {
				state.loading = false;
				state.educations = action.payload.educations;
			})
			.addCase(fetchEducation.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default educationSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSkills = createAsyncThunk("skills/fetchSkills", async () => {
	const response = await fetch("/api/skills");
	const data = await response.json();
	return data.skills;
});

const skillsSlice = createSlice({
	name: "skills",
	initialState: {
		chartData: {
			labels: [],
			datasets: [
				{
					label: "Skill Level",
					data: [],
					backgroundColor: "rgba(38, 193, 126, 1)",
					borderColor: "rgba(38, 193, 126, 1)",
					borderWidth: 1,
					borderRadius: 4,
					borderSkipped: false,
				},
			],
		},
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSkills.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchSkills.fulfilled, (state, action) => {
				const labels = action.payload.map((skill) => skill.name);
				const skillLevels = action.payload.map((skill) => skill.range);
				state.chartData.labels = labels;
				state.chartData.datasets[0].data = skillLevels;
				state.loading = false;
			})
			.addCase(fetchSkills.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default skillsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSkills = createAsyncThunk("skills/fetchSkills", async () => {
	const response = await fetch("/api/skills");
	const data = await response.json();
	return data.skills;
});

const initialState = {
	skills: [],
	loading: false,
	error: null,
};

const skillsSlice = createSlice({
	name: "skills",
	initialState,
	reducers: {
		initializeSkills: (state) => {
			const storedSkills = JSON.parse(localStorage.getItem("skills")) || [];
			if (storedSkills.length === 0) {
				storedSkills.push({ name: "HTML", range: 100 });
				storedSkills.push({ name: "CSS", range: 95 });
				storedSkills.push({ name: "React", range: 70 });
				localStorage.setItem("skills", JSON.stringify(storedSkills));
			}
			state.skills = storedSkills;
		},
		addSkill: (state, action) => {
			state.skills.push(action.payload);
			localStorage.setItem("skills", JSON.stringify(state.skills));
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSkills.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchSkills.fulfilled, (state, action) => {
				state.skills = action.payload;
				state.loading = false;
			})
			.addCase(fetchSkills.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { initializeSkills, addSkill } = skillsSlice.actions;

export default skillsSlice.reducer;

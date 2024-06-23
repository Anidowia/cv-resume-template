import { createSlice } from "@reduxjs/toolkit";
import initialState from "../../components/Portfolio/projectsData";

const portfolioSlice = createSlice({
	name: "portfolio",
	initialState,
	reducers: {
		setFilterKey: (state, action) => {
			state.filterKey = action.payload;
		},
	},
});

export const { setFilterKey } = portfolioSlice.actions;
export default portfolioSlice.reducer;

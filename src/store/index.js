import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import educationReducer from "./slices/educationSlice";
import experienceReducer from "./slices/experienceSlice";
import skillsReducer from "./slices/skillsSlice";

const store = configureStore({
	reducer: {
		education: educationReducer,
		experience: experienceReducer,
		skills: skillsReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

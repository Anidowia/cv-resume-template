import { v4 as uuidv4 } from "uuid";

const initialState = {
	projects: [
		{ id: uuidv4(), title: "Project 1", category: "ui" },
		{ id: uuidv4(), title: "Project 2", category: "code" },
		{ id: uuidv4(), title: "Project 3", category: "ui" },
		{ id: uuidv4(), title: "Project 4", category: "code" },
	],
	filterItems: [
		{ label: "All", key: "all" },
		{ label: "Code", key: "code" },
		{ label: "UI", key: "ui" },
	],
	filterKey: "all",
};

export default initialState;

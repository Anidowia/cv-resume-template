import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Skills from "../components/Skills/Skills";
import { thunk } from "redux-thunk";

// Mock Redux store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Skills Component", () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			skills: {
				skills: [],
				loading: false,
				error: null,
			},
		});
	});

	test("toggle form open/close", () => {
		const { getByText } = render(
			<Provider store={store}>
				<Skills title="Test Skills" />
			</Provider>
		);

		expect(getByText("Open edit")).toBeInTheDocument();
		expect(() => getByText("Close edit")).toThrow();

		fireEvent.click(getByText("Open edit"));
		expect(getByText("Close edit")).toBeInTheDocument();

		fireEvent.click(getByText("Close edit"));
		expect(getByText("Open edit")).toBeInTheDocument();
	});
});

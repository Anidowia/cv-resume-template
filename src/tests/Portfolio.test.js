import { thunk } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import Portfolio from "../components/Portfolio/Portfolio";
import portfolioReducer, { setFilterKey } from "../store/slices/portfolioSlice";

import styles from "../components/Portfolio/Portfolio.module.scss";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
	portfolio: {
		projects: [
			{ id: "1", title: "Project 1", category: "ui" },
			{ id: "2", title: "Project 2", category: "code" },
			{ id: "3", title: "Project 3", category: "ui" },
			{ id: "4", title: "Project 4", category: "code" },
		],
		filterItems: [
			{ label: "All", key: "all" },
			{ label: "Code", key: "code" },
			{ label: "UI", key: "ui" },
		],
		filterKey: "all",
	},
};

const renderWithStore = (component, store) => {
	return render(<Provider store={store}>{component}</Provider>);
};

describe("Portfolio Component", () => {
	let store;

	beforeEach(() => {
		store = mockStore(initialState);
		store.dispatch = jest.fn();
	});

	test("renders Portfolio component with projects", () => {
		renderWithStore(<Portfolio title="My Portfolio" isClosed={false} />, store);

		expect(screen.getByText("My Portfolio")).toBeInTheDocument();
		expect(screen.getByText("Project 1")).toBeInTheDocument();
		expect(screen.getByText("Project 2")).toBeInTheDocument();
		expect(screen.getByText("Project 3")).toBeInTheDocument();
		expect(screen.getByText("Project 4")).toBeInTheDocument();
	});

	test("filters projects by category", () => {
		const { rerender } = renderWithStore(
			<Portfolio title="My Portfolio" isClosed={false} />,
			store
		);

		fireEvent.click(screen.getByText("Code"));

		expect(store.dispatch).toHaveBeenCalledWith(setFilterKey("code"));

		const stateWithCodeFilter = {
			...initialState,
			portfolio: {
				...initialState.portfolio,
				filterKey: "code",
			},
		};

		store = mockStore(stateWithCodeFilter);

		rerender(
			<Provider store={store}>
				<Portfolio title="My Portfolio" isClosed={false} />
			</Provider>
		);

		expect(screen.getByText("Project 2")).toBeInTheDocument();
		expect(screen.getByText("Project 4")).toBeInTheDocument();
	});

	test("applies 'portfolioShifted' class when isClosed is true", () => {
		const { container } = renderWithStore(
			<Portfolio title="My Portfolio" isClosed={true} />,
			store
		);
		expect(container.firstChild).toHaveClass(styles.portfolioShifted);
	});

	test("does not apply 'portfolioShifted' class when isClosed is false", () => {
		const { container } = renderWithStore(
			<Portfolio title="My Portfolio" isClosed={false} />,
			store
		);
		expect(container.firstChild).not.toHaveClass(styles.portfolioShifted);
	});

	it("should handle setFilterKey", () => {
		const newState = portfolioReducer(initialState, setFilterKey("code"));
		expect(newState.filterKey).toEqual("code");
	});
});

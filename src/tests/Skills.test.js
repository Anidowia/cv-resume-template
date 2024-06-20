import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import Skills from "../components/Skills/Skills";
import { fetchSkills } from "../store/slices/skillsSlice";

jest.mock("../store/slices/skillsSlice", () => ({
	fetchSkills: jest.fn(),
}));

jest.mock("react-chartjs-2", () => ({
	Bar: () => <div>Bar Chart</div>,
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
	skills: {
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
		options: {
			indexAxis: "y",
			elements: {
				bar: {
					borderWidth: 2,
				},
			},
			responsive: true,
			plugins: {
				legend: {
					display: false,
				},
				title: {
					display: true,
				},
			},
			scales: {
				x: {
					beginAtZero: true,
					max: 100,
					ticks: {},
					grid: {
						display: false,
					},
				},
				y: {
					grid: {
						display: false,
					},
				},
			},
			barPercentage: 0.7,
		},
	},
};

const renderWithStore = (state = initialState) => {
	const store = mockStore(state);
	store.dispatch = jest.fn(); // Mock the dispatch method
	return render(
		<Provider store={store}>
			<Skills title="Skills" isClosed={false} />
		</Provider>
	);
};

describe("Skills component", () => {
	beforeEach(() => {
		fetchSkills.mockClear();
		fetchSkills.mockReturnValue(() => Promise.resolve()); // Mock the return of fetchSkills as a function
	});

	it("should render correctly with initial state", () => {
		renderWithStore();
		expect(screen.getByText("Skills")).toBeInTheDocument();
		expect(screen.getByText("Open edit")).toBeInTheDocument();
	});

	it("should display the chart when data is fetched successfully", async () => {
		const fetchedState = {
			...initialState,
			skills: {
				...initialState.skills,
				chartData: {
					labels: ["Skill 1", "Skill 2"],
					datasets: [
						{ ...initialState.skills.chartData.datasets[0], data: [80, 60] },
					],
				},
			},
		};
		renderWithStore(fetchedState);
		expect(screen.getByText("Bar Chart")).toBeInTheDocument();
	});

	it("should toggle form visibility when button is clicked", () => {
		renderWithStore();
		const button = screen.getByText("Open edit");
		fireEvent.click(button);
		expect(screen.getByTestId("form")).toBeInTheDocument();
		expect(screen.getByText("Close edit")).toBeInTheDocument();
		const closeButton = screen.getByText("Close edit");
		fireEvent.click(closeButton);
		expect(screen.queryByTestId("form")).not.toBeInTheDocument();
		expect(screen.getByText("Open edit")).toBeInTheDocument();
	});
});

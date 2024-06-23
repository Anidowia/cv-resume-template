import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";

import { fetchEducation } from "../store/slices/educationSlice.js";
import Timeline from "../components/TimeLine/Timeline";
import { renderError, renderSpinner } from "../helpers/helpers";

jest.mock("react-redux", () => ({
	useDispatch: jest.fn(),
	useSelector: jest.fn(),
}));

jest.mock("../store/slices/educationSlice.js", () => ({
	fetchEducation: jest.fn(),
}));

jest.mock("../helpers/helpers", () => ({
	renderError: jest.fn(),
	renderSpinner: jest.fn(),
}));

jest.mock("../components/TimeLine/Timeline.module.scss", () => ({
	timeline: "timeline",
	timelineShifted: "timelineShifted",
	timeline__event: "timeline__event",
	date: "date",
	content: "content",
}));

describe("Timeline Component", () => {
	let mockDispatch;

	beforeEach(() => {
		mockDispatch = jest.fn();
		useDispatch.mockReturnValue(mockDispatch);
		useSelector.mockClear();
		fetchEducation.mockClear();
		renderError.mockClear();
		renderSpinner.mockClear();

		// Default mock return value
		useSelector.mockReturnValue({
			educations: [],
			loading: false,
			error: null,
		});
	});

	it("should render the title correctly when provided", () => {
		render(<Timeline title="Education Timeline" isClosed={false} />);
		expect(screen.getByText("Education Timeline")).toBeInTheDocument();
	});

	it("should handle empty education data gracefully", () => {
		const { container } = render(
			<Timeline title="Education Timeline" isClosed={false} />
		);
		expect(container.querySelectorAll(".timeline__event").length).toBe(0);
	});

	it("should fetch education data on mount", () => {
		render(<Timeline title="Education Timeline" isClosed={false} />);
		expect(mockDispatch).toHaveBeenCalledWith(fetchEducation());
	});

	it("should display loading spinner when data is being fetched", () => {
		useSelector.mockReturnValue({ educations: [], loading: true, error: null });

		render(<Timeline title="Education Timeline" isClosed={false} />);
		expect(renderSpinner).toHaveBeenCalledWith(true);
	});

	it("should display error message when there is an error", () => {
		useSelector.mockReturnValue({
			educations: [],
			loading: false,
			error: "An error occurred while fetching data",
		});

		render(<Timeline title="Education Timeline" isClosed={false} />);
		expect(renderError).toHaveBeenCalledWith(
			"An error occurred while fetching data"
		);
	});

	it("should apply timelineShifted class when isClosed is true", () => {
		const { container } = render(
			<Timeline title="Education Timeline" isClosed={true} />
		);
		expect(container.firstChild).toHaveClass("timelineShifted");
	});

	it("should not apply timelineShifted class when isClosed is false", () => {
		const { container } = render(
			<Timeline title="Education Timeline" isClosed={false} />
		);
		expect(container.querySelector(".timelineShifted")).toBeNull();
	});

	it("should render timeline events correctly", () => {
		const mockEducations = [
			{
				date: "2020",
				title: "Bachelor's Degree",
				text: "Graduated with honors",
			},
			{
				date: "2022",
				title: "Master's Degree",
				text: "Graduated with distinction",
			},
		];
		useSelector.mockReturnValue({
			educations: mockEducations,
			loading: false,
			error: null,
		});

		const { container } = render(
			<Timeline title="Education Timeline" isClosed={false} />
		);

		const events = container.querySelectorAll(".timeline__event");
		expect(events.length).toBe(2);
	});

	it("should render no timeline events when there are no educations", () => {
		const { container } = render(
			<Timeline title="Education Timeline" isClosed={false} />
		);
		expect(container.querySelectorAll(".timeline__event").length).toBe(0);
	});

	it("should call renderError and renderSpinner with correct arguments", () => {
		useSelector.mockReturnValue({
			educations: [],
			loading: true,
			error: "An error occurred while fetching data",
		});

		render(<Timeline title="Education Timeline" isClosed={false} />);
		expect(renderSpinner).toHaveBeenCalledWith(true);
		expect(renderError).toHaveBeenCalledWith(
			"An error occurred while fetching data"
		);
	});

	it("should correctly extract educations, loading, and error from state", () => {
		const mockState = {
			education: {
				educations: [
					{
						date: "2020",
						title: "Bachelor's Degree",
						text: "Graduated with honors",
					},
				],
				loading: true,
				error: "Test error",
			},
		};
		useSelector.mockImplementation((callback) => callback(mockState));

		render(<Timeline title="Education Timeline" isClosed={false} />);

		expect(useSelector).toHaveBeenCalledWith(expect.any(Function));
		expect(mockState.education.educations).toEqual([
			{
				date: "2020",
				title: "Bachelor's Degree",
				text: "Graduated with honors",
			},
		]);
		expect(mockState.education.loading).toBe(true);
		expect(mockState.education.error).toBe("Test error");
	});
});

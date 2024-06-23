import { Provider } from "react-redux";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { act } from "react";

import Form from "../components/Skills/components/Form/Form";

import { fetchSkills } from "../store/slices/skillsSlice";
import store from "../store";

fetchMock.enableMocks();

jest.mock("react-redux", () => ({
	...jest.requireActual("react-redux"),
	useDispatch: jest.fn(),
}));

jest.mock("../store/slices/skillsSlice", () => ({
	fetchSkills: jest.fn(),
}));

const renderWithRedux = (component) => {
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store,
	};
};

describe("Form Component", () => {
	let useDispatchMock;
	let dispatchMock;

	beforeEach(() => {
		useDispatchMock = require("react-redux").useDispatch;
		dispatchMock = jest.fn();
		useDispatchMock.mockReturnValue(dispatchMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("renders form correctly", () => {
		renderWithRedux(<Form isClosed={false} onCloseForm={jest.fn()} />);
		expect(screen.getByLabelText(/skill name:/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/skill range:/i)).toBeInTheDocument();
		expect(screen.getByText(/add skill/i)).toBeInTheDocument();
	});

	test("shows validation errors on submit with empty fields", async () => {
		renderWithRedux(<Form isClosed={false} onCloseForm={jest.fn()} />);

		fireEvent.click(screen.getByText(/add skill/i));

		await waitFor(() => {
			expect(screen.getByText(/name is required/i)).toBeInTheDocument();
			expect(screen.getByText(/range is required/i)).toBeInTheDocument();
		});
	});

	test("submits form successfully", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({}),
			})
		);

		const onCloseFormMock = jest.fn();
		renderWithRedux(<Form isClosed={false} onCloseForm={onCloseFormMock} />);

		await act(async () => {
			fireEvent.change(screen.getByLabelText(/skill name:/i), {
				target: { value: "JavaScript" },
			});
			fireEvent.change(screen.getByLabelText(/skill range:/i), {
				target: { value: "50" },
			});

			fireEvent.click(screen.getByText(/add skill/i));
			await waitFor(() => {
				expect(dispatchMock).toHaveBeenCalledWith(fetchSkills());
				expect(onCloseFormMock).toHaveBeenCalled();
				expect(global.fetch).toHaveBeenCalledWith(
					"/api/skills",
					expect.objectContaining({
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ name: "JavaScript", range: "50" }),
					})
				);
			});
		});
	});

	test("shows server error on failed form submission", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
			})
		);

		renderWithRedux(<Form isClosed={false} onCloseForm={jest.fn()} />);

		fireEvent.change(screen.getByLabelText(/skill name:/i), {
			target: { value: "JavaScript" },
		});
		fireEvent.change(screen.getByLabelText(/skill range:/i), {
			target: { value: "50" },
		});

		fireEvent.click(screen.getByText(/add skill/i));

		await waitFor(() => {
			expect(screen.getByText(/failed to add skill/i)).toBeInTheDocument();
		});
	});

	test("renders spinner during loading state", async () => {
		let resolveFetch;
		global.fetch = jest.fn(
			() =>
				new Promise((resolve) => {
					resolveFetch = resolve;
				})
		);

		renderWithRedux(<Form isClosed={false} onCloseForm={jest.fn()} />);

		fireEvent.change(screen.getByLabelText(/skill name:/i), {
			target: { value: "JavaScript" },
		});
		fireEvent.change(screen.getByLabelText(/skill range:/i), {
			target: { value: "50" },
		});

		fireEvent.click(screen.getByText(/add skill/i));

		await waitFor(() => {
			expect(screen.getByTestId("spinnerContainer")).toBeInTheDocument();
		});

		resolveFetch({ ok: true });
	});

	test("applies 'formShifted' class when isClosed is true", () => {
		const { container } = renderWithRedux(
			<Form isClosed={true} onCloseForm={jest.fn()} />
		);
		expect(container.firstChild).toHaveClass("formShifted");
	});

	test("does not apply 'formShifted' class when isClosed is false", () => {
		const { container } = renderWithRedux(
			<Form isClosed={false} onCloseForm={jest.fn()} />
		);
		expect(container.firstChild).not.toHaveClass("formShifted");
	});
});

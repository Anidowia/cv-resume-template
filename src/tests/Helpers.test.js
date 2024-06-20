import { render } from "@testing-library/react";
import { getTickLabel, renderError } from "../helpers/helpers";

import styles from "../pages/Inner/components/LoadingSpinner.module.scss";

describe("getTickLabel", () => {
	it('should return "Beginner" for value 0', () => {
		expect(getTickLabel(0)).toBe("Beginner");
	});

	it('should return "Proficient" for value 30', () => {
		expect(getTickLabel(30)).toBe("Proficient");
	});

	it('should return "Expert" for value 70', () => {
		expect(getTickLabel(70)).toBe("Expert");
	});

	it('should return "Master" for value 100', () => {
		expect(getTickLabel(100)).toBe("Master");
	});

	it("should return an empty string for values other than 0, 30, 70, and 100", () => {
		expect(getTickLabel(10)).toBe("");
		expect(getTickLabel(40)).toBe("");
		expect(getTickLabel(60)).toBe("");
		expect(getTickLabel(90)).toBe("");
	});

	it("should return an empty string for non-numeric values", () => {
		expect(getTickLabel("text")).toBe("");
		expect(getTickLabel(null)).toBe("");
		expect(getTickLabel(undefined)).toBe("");
	});
});

describe("renderError", () => {
	it("should return null when there is no error", () => {
		const { container } = render(renderError(null));
		expect(container).toBeEmptyDOMElement();
	});

	it("should return an error message div when there is an error", () => {
		const errorMessage = "Network Error";
		const { getByText } = render(renderError(errorMessage));
		const errorElement = getByText(errorMessage);

		expect(errorElement).toBeInTheDocument();
		expect(errorElement).toHaveClass("error");
	});

	it("should apply the correct className", () => {
		const errorMessage = "Network Error";
		const { getByText } = render(renderError(errorMessage));
		const errorElement = getByText(errorMessage);

		expect(errorElement).toHaveClass(styles.error);
	});
});

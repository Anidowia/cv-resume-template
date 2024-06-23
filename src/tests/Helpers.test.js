import { render } from "@testing-library/react";
import { renderError } from "../helpers/helpers";

import styles from "../pages/Inner/components/LoadingSpinner.module.scss";

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

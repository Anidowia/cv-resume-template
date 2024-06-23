import {
	ChartData,
	chartOptions,
	getTickLabel,
} from "../components/Skills/chartData";

describe("getTickLabel", () => {
	it('should return "Beginner" when value is 0', () => {
		const result = getTickLabel(0);
		expect(result).toBe("Beginner");
	});
	it('should return "Proficient" when value is 30', () => {
		const result = getTickLabel(30);
		expect(result).toBe("Proficient");
	});
	it('should return "Expert" when value is 70', () => {
		const result = getTickLabel(70);
		expect(result).toBe("Expert");
	});
	it('should return "Master" when value is 100', () => {
		const result = getTickLabel(100);
		expect(result).toBe("Master");
	});
	it("should return empty string when value is negative", () => {
		const result = getTickLabel(-10);
		expect(result).toBe("");
	});

	it("should return empty string when value is greater than 100", () => {
		const result = getTickLabel(110);
		expect(result).toBe("");
	});

	it("should return empty string when value is a floating-point number not explicitly handled", () => {
		const result = getTickLabel(50.5);
		expect(result).toBe("");
	});

	it("should return correct label for boundary values", () => {
		let result = getTickLabel(29.99);
		expect(result).toBe("");
		result = getTickLabel(30.01);
		expect(result).toBe("");
		result = getTickLabel(69.99);
		expect(result).toBe("");
		result = getTickLabel(70.01);
		expect(result).toBe("");
		result = getTickLabel(99.99);
		expect(result).toBe("");
	});
});

describe("ChartData check", () => {
	it("should return an empty labels array and empty datasets when no skills are provided", () => {
		const result = ChartData([]);
		expect(result.labels).toEqual([]);
		expect(result.datasets[0].data).toEqual([]);
	});

	it("should correctly handle a single skill in the skills array", () => {
		const skills = [{ name: "JavaScript", range: 90 }];
		const result = ChartData(skills);
		expect(result.labels).toEqual(["JavaScript"]);
		expect(result.datasets[0].data).toEqual([90]);
	});

	it("should correctly handle skills with duplicate names", () => {
		const skills = [
			{ name: "JavaScript", range: 50 },
			{ name: "JavaScript", range: 75 },
		];
		const result = ChartData(skills);
		expect(result.labels).toEqual(["JavaScript", "JavaScript"]);
		expect(result.datasets[0].data).toEqual([50, 75]);
	});

	it("should correctly handle skills with negative ranges", () => {
		const skills = [
			{ name: "JavaScript", range: -10 },
			{ name: "Python", range: -20 },
		];
		const result = ChartData(skills);
		expect(result.labels).toEqual(["JavaScript", "Python"]);
		expect(result.datasets[0].data).toEqual([-10, -20]);
	});

	it("should correctly handle skills with ranges greater than 100", () => {
		const skills = [
			{ name: "JavaScript", range: 110 },
			{ name: "Python", range: 150 },
		];
		const result = ChartData(skills);
		expect(result.labels).toEqual(["JavaScript", "Python"]);
		expect(result.datasets[0].data).toEqual([110, 150]);
	});

	it("should set the correct chart options for horizontal bar chart", () => {
		const options = chartOptions;
		expect(options.indexAxis).toBe("y");
		expect(options.elements.bar.borderWidth).toBe(2);
		expect(options.responsive).toBe(true);
		expect(options.plugins.legend.display).toBe(false);
		expect(options.plugins.title.display).toBe(true);
		expect(options.scales.x.beginAtZero).toBe(true);
		expect(options.scales.x.max).toBe(100);
		expect(typeof options.scales.x.ticks.callback).toBe("function");
		expect(options.scales.x.grid.display).toBe(false);
		expect(options.scales.y.grid.display).toBe(false);
		expect(options.barPercentage).toBe(0.7);
	});
});

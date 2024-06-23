export const getTickLabel = (value) => {
	if (value === 0) return "Beginner";
	if (value === 30) return "Proficient";
	if (value === 70) return "Expert";
	if (value === 100) return "Master";
	return "";
};

export const ChartData = (skills) => ({
	labels: skills.map((skill) => skill.name),
	datasets: [
		{
			label: "Skill Level",
			data: skills.map((skill) => skill.range),
			backgroundColor: "rgba(38, 193, 126, 1)",
			borderColor: "rgba(38, 193, 126, 1)",
			borderWidth: 1,
			borderRadius: 4,
			borderSkipped: false,
		},
	],
});

export const chartOptions = {
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
			ticks: {
				callback: getTickLabel,
			},
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
};

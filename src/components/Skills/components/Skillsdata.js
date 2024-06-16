export const options = {
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
				callback: (value) => {
					if (value === 0) return "Beginner";
					if (value === 30) return "Proficient";
					if (value === 70) return "Expert";
					if (value === 100) return "Master";
					return "";
				},
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

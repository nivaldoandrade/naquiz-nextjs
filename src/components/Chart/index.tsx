import dynamic from 'next/dynamic';
const Charts = dynamic(() => import('react-apexcharts'), {
	ssr: false,
});

const options = {
	plotOptions: {
		pie: {
			dataLabels: {
				offset: -10,
			},
			expandOnClick: false,
		},

	},
	labels: ['Certas', 'Erradas'],
	colors: ['rgb(0, 71, 186)', '#ff0000'],
	responsive: [{
		breakpoint: 480,
		options: {
			chart: {
				width: 200
			},
			legend: {
				position: 'bottom'
			}
		}
	}]
} as ApexCharts.ApexOptions;


interface ChartProps {
	correct: number;
	wrong: number
}


export function Chart({ correct, wrong }: ChartProps) {
	return (
		<Charts
			options={options}
			series={[correct, wrong]}
			type="pie"
			height="150px"
		/>
	);
}
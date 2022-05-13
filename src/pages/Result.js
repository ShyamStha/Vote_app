import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const Result = () => {
	const [results, setResults] = useState([]);

	useEffect(() => {
		axios.get('https://627e31ec271f386ceff3366e.mockapi.io/vote').then(
			response => {
				console.log(response.data);
				setResults(response.data);
			},
			error => {
				console.log(error);
			},
		);
	}, []);

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	const totalVotesA = results
		.map(item => item.partyA)
		.reduce((prev, curr) => prev + curr, 0);

	const totalVotesB = results
		.map(item => item.partyB)
		.reduce((prev, curr) => prev + curr, 0);

	const totalVotesC = results
		.map(item => item.partyC)
		.reduce((prev, curr) => prev + curr, 0);

	const totalVotesD = results
		.map(item => item.partyD)
		.reduce((prev, curr) => prev + curr, 0);

	const totalVotesE = results
		.map(item => item.partyE)
		.reduce((prev, curr) => prev + curr, 0);

	const totalVotesF = results
		.map(item => item.partyF)
		.reduce((prev, curr) => prev + curr, 0);

	const data = {
		labels: [
			'UCPN Maiost',
			'Nepali Congress',
			'UML Yamale',
			'Rastrya Prajatrantrik Party',
			'Nepal Comunist Party',
			'Nepal Samajbadi Party',
		],
		datasets: [
			{
				label: '# of Votes',
				data: [
					totalVotesA,
					totalVotesB,
					totalVotesC,
					totalVotesD,
					totalVotesE,
					totalVotesF,
				],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
				avatar: [
					'https://upload.wikimedia.org/wikipedia/commons/5/5f/Election_logo_Maoist.jpg',
				],
			},
		],
	};

	return (
		<>
			<Bar options={options} data={data} />
		</>
	);
};

export default Result;

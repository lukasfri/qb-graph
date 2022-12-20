<script lang="ts">
	import { Category, colors } from '$lib/controllers/rawData';
	import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
	import { onMount } from 'svelte';

	export let countPerYear: [number, Record<Category, number>][];

	let canvas: HTMLCanvasElement;

	let chart;

	const data: {
		labels: string[];
		datasets: {
			label: Category;
			data: number[];
			backgroundColor: string;
		}[];
	} = {
		labels: countPerYear.map(([year]) => year.toString()),
		datasets: Object.entries(Category).map(([key, label]) => ({
			label,
			data: countPerYear.map(([year, value]) => value[label as Category]),
			backgroundColor: colors[label as Category]
		}))
	};

	onMount(() => {
		Chart.register(BarController, BarElement, CategoryScale, LinearScale);

		chart = new Chart(canvas, {
			type: 'bar',
			data,

			options: {
				plugins: {
					title: {
						display: true,
						text: 'Chart.js Bar Chart - Stacked'
					}
				},
				responsive: true,
				showTooltips: true,
				scales: {
					x: {
						stacked: true
					},
					y: {
						stacked: true
					}
				}
			}
		});
	});
</script>

<canvas bind:this={canvas} />

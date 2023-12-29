<script lang="ts">
	import { PremiumCategory, colors } from '$lib/controllers/rawData';
	import { BarController, BarElement, CategoryScale, Chart, LinearScale, Tooltip } from 'chart.js';
	import { onMount } from 'svelte';

	export let countPerYear: [number, Record<PremiumCategory, number>][];

	let canvas: HTMLCanvasElement;

	let chart;

	const data: {
		labels: string[];
		datasets: {
			label: PremiumCategory;
			data: number[];
			backgroundColor: string;
		}[];
	} = {
		labels: countPerYear.map(([year]) => year.toString()),
		datasets: Object.entries(PremiumCategory).map(([key, label]) => ({
			label,
			data: countPerYear.map(([year, value]) => value[label as PremiumCategory]),
			backgroundColor: colors[label as PremiumCategory]
		}))
	};

	onMount(() => {
		Chart.register(Tooltip, BarController, BarElement, CategoryScale, LinearScale);

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

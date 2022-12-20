<script lang="ts">
	import { colors, type Category } from '$lib/controllers/rawData';
	import { ArcElement, Chart, DoughnutController } from 'chart.js';
	import { onMount } from 'svelte';

	export let countPerCategory: Record<Category, number>;

	let canvas: HTMLCanvasElement;

	let chart;

	onMount(() => {
		Chart.register(DoughnutController, ArcElement);

		chart = new Chart(canvas, {
			type: 'doughnut',
			data: {
				labels: Object.keys(countPerCategory),
				datasets: [
					{
						data: Object.values(countPerCategory),
						backgroundColor: Object.keys(countPerCategory).map(
							(category) => colors[category as Category]
						)
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				plugins: {
					legend: {
						position: 'top'
					},
					title: {
						display: true,
						text: 'Chart.js Pie Chart'
					}
				},
				cutout: '50%'
			}
		});
	});
</script>

<canvas bind:this={canvas} />

<style lang="scss">
	canvas {
		width: 100% !important;
		height: unset !important;
		aspect-ratio: 1 / 1 !important;
	}
</style>

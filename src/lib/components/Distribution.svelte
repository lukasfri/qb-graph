<script lang="ts">
	import { colors, type PremiumCategory } from '$lib/controllers/rawData';
	import { ArcElement, Chart, DoughnutController, Tooltip } from 'chart.js';
	import { onMount } from 'svelte';

	export let countPerCategory: Record<PremiumCategory, number>;

	let canvas: HTMLCanvasElement;

	let chart;

	onMount(() => {
		Chart.register(Tooltip, DoughnutController, ArcElement);

		chart = new Chart(canvas, {
			type: 'doughnut',
			data: {
				labels: Object.keys(countPerCategory),
				datasets: [
					{
						data: Object.values(countPerCategory),
						backgroundColor: Object.keys(countPerCategory).map(
							(category) => colors[category as PremiumCategory]
						)
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				showTooltips: true,
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

<script lang="ts">
	import type { flowData, FlowLabel } from '$lib/controllers/flowData';
	import { PremiumCategory, colors } from '$lib/controllers/rawData';
	import { Chart, Tooltip } from 'chart.js';

	import { Flow, SankeyController } from 'chartjs-chart-sankey';
	import { onMount } from 'svelte';

	export let data: typeof flowData;

	let canvas: HTMLCanvasElement;
	let chart;

	function getColor(label: FlowLabel) {
		const [year, category] = label.split('-');

		return colors[category as PremiumCategory] ?? 'lightgray';
	}

	onMount(() => {
		Chart.register(Tooltip, SankeyController, Flow);

		chart = new Chart(canvas, {
			type: 'sankey',
			data: {
				datasets: [
					{
						label: 'My sankey',
						data: data.data,
						colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from as FlowLabel),
						colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to as FlowLabel),
						colorMode: 'gradient', // or 'from' or 'to'
						/* optional labels */
						labels: {
							a: 'Label A',
							b: 'Label B',
							c: 'Label C',
							d: 'Label D'
						},
						/* optional priority */
						priority: data.priority,
						/* optional column overrides */
						column: data.column,
						size: 'max' // or 'min' if flow overlap is preferred
					}
				]
			},
			options: {
				showTooltips: true
			}
		});
	});
</script>

<canvas bind:this={canvas} />

<script lang="ts">
	import { browser } from '$app/environment';
	import { ratingsPerYearFlat } from '$lib/controllers/data';
	import { PremiumCategory, tanksList, type PremiumTank, type Year } from '$lib/controllers/rawData';
	import { Chart, LineController, LineElement, PointElement, Tooltip } from 'chart.js';

	let canvas: HTMLCanvasElement;

	let selectedTanks: Partial<Record<string, boolean>> = {};
	let selectedTankColors: Partial<Record<string, string>> = {};
	$: {
		selectedTankColors = Object.fromEntries(
			Object.entries(selectedTanks)
				.filter(([tankName, active]) => active)
				.map(([tankName, active]) => [
					tankName,
					selectedTankColors[tankName] ?? `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
				])
		);
	}

	const years = Object.keys(ratingsPerYearFlat);

	let chart: Chart<'line', (PremiumCategory | undefined)[], string>;

	if (browser) Chart.register(Tooltip, LineController, LineElement, PointElement);

	function generateDataset(selectedTanks: Partial<Record<string, boolean>>) {
		return Object.entries(selectedTanks)
			.filter(([tankName, selectedTank]) => selectedTank)
			.map(([tankName], i) => ({
				label: tankName,
				tension: 0.1,
				fill: false,
				borderDash: [5, 15],
				borderDashOffset: i,
				borderColor: selectedTankColors[tankName],
				data: years.map(
					(year) => ratingsPerYearFlat[parseInt(year) as Year]?.[tankName as PremiumTank]
				) as any[]
			}));
	}

	$: {
		if (browser && canvas) {
			if (chart) chart.destroy();

			chart = new Chart(canvas, {
				type: 'line',
				data: {
					labels: years,
					datasets: generateDataset(selectedTanks)
				},
				options: {
					responsive: true,
					showTooltips: true,
					scales: {
						y: {
							type: 'category',
							labels: Object.values(PremiumCategory)
						}
					}
				}
			});
		}
	}
</script>

<div class="flex flex-col flex-wrap">
	<p class="font-bold">
		This playground is a bit experimental. Points overlap, and lines sometimes overlap. Colors are
		random so sometimes you might get a similar color. Trial and error!
	</p>
	<button
		class="mt-2 rounded border bg-blue-100 p-1 hover:bg-blue-300"
		on:click={() => (selectedTanks = {})}>Clear</button
	>
	<ul
		class="flex max-h-80 w-full flex-shrink-0 flex-row flex-wrap overflow-x-hidden overflow-y-scroll"
	>
		{#each Object.keys(tanksList) as tank}
			<li
				class="inline-flex flex-1 flex-nowrap whitespace-nowrap p-2"
				style:color={selectedTankColors[tank] ?? 'black'}
			>
				<input class="mr-2" type="checkbox" bind:checked={selectedTanks[tank]} />
				{tank}
			</li>
			<!-- content here -->
		{/each}
	</ul>
	<canvas class="flex-grow" bind:this={canvas} />
</div>

<style lang="scss">
</style>

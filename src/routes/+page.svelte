<script lang="ts">
	import '../app.css';
	import { Category, ratingsPerYear } from '$lib/controllers/rawData';
	import Changes from './Changes.svelte';
	import Distribution from './Distribution.svelte';
	import Playground from './Playground.svelte';
	import Reviewed from './Reviewed.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data}
	<!-- else content here -->

	<div class="wrapper">
		<div class="container mx-auto p-5">
			<div>
				<h1 class="text-3xl font-bold">Analysis of Quickybaby Tier Lists over the years</h1>
				<p class="text-lg">
					This website contains an analysis with graphs of how Quickybabys tier lists (and World of
					Tanks overall) has changed as time passes. I made this over two days using data from
					timestamp comments. Credits are given at the end.
				</p>
			</div>
			<div>
				<h2 class="mt-4 text-2xl font-bold">Total included per year</h2>
				<Reviewed countPerYear={data.countPerYear} />
				<p class="text-lg">
					The amount of premium tanks keeps increasing at an exponential rate. This is even with a
					few previous tanks being skipped in the tier list each year. This increase is especially
					noticable for 2022.
				</p>
			</div>

			<div>
				<h2 class="mt-4 text-2xl font-bold">Distribution per year</h2>
				<div class="flex flex-row flex-wrap ">
					{#each data.countPerYear as [year, countPerCategory]}
						<div class="overflow-hidden p-4 md:flex-1">
							<h3 class="text-1xl font-bold">{year}</h3>
							<Distribution {countPerCategory} />
						</div>
					{/each}
				</div>
				<ul class="list-disc pl-5">
					<li class="text-lg">
						Compared to the earlier years, the categories "Decent choices" and "Great performers"
						now take up half or more than half of the distribution.
					</li>
					<li class="text-lg">"Avoid" and "Pay to lose" have both shrunk compared to the rest.</li>
					<li class="text-lg">Pay to win have had a significant increase in 2022.</li>
				</ul>
			</div>

			<div>
				<h2 class="mt-4 text-2xl font-bold">Power creep is getting worse and worse</h2>
				<!-- Insert images of the 4 new pay to win tanks -->
				<div class="flex flex-row flex-wrap">
					{#each [['/bz-176.jpg', 'BZ-176'], ['/iron-arnie.jpg', 'Iron Arnie'], ['/udarniy.png', 'Udarniy'], ['/vipera.png', 'Vipera']] as [src, tankName]}
						<div class="flex w-full flex-col md:w-1/2">
							<img class="flex flex-1" {src} alt={tankName} />
						</div>
					{/each}
				</div>
				<ul class="list-disc pl-5">
					<li class="text-lg">
						In 2022, 4/9 pay to win tanks were completely new, beating all previous years.
					</li>
					<li class="text-lg">
						Nearly half of all new tanks in 2022 were either pay to win or super competitive, far
						higher than any previous year.
					</li>
				</ul>
			</div>

			<div>
				<h2 class="mt-4 text-2xl font-bold">Changes overall</h2>
				<Changes data={data.flowData} />
				<p class="text-lg">
					In general, the data trends down, as old tanks go down in rating and new tanks replace
					them at the top. Tanks are getting more and more powerful, powercreep.
				</p>
			</div>

			<div>
				<h2 class="mt-4 text-2xl font-bold">Playground - Compare changes between tanks!</h2>
				<Playground />
			</div>

			<div>
				<h2 class="mt-4 text-2xl font-bold">Credits</h2>
				<img src="/logo.png" class="m-auto w-1/2 rounded-xl" />
				<h3 class="text-1xl mt-4 font-bold">Data Sources</h3>
				<p class="text-lg">Data taken from timestamp comments on YouTube</p>
				<ul class="list-disc pl-5">
					<li class="text-lg">2019: Guima Channel</li>
					<li class="text-lg">2020: Shryquill</li>
					<li class="text-lg">2021: Greg Brown</li>
					<li class="text-lg">2022: Me/Dreamplay</li>
				</ul>
				<h3 class="text-1xl mt-4 font-bold">Technical/Made with</h3>
				<p class="text-lg">
					This website was made in "Svelte"/"SvelteKit" using "chart.js" for charts and the
					"chartjs-chart-sankey" plugin for the overall changes graph.
				</p>
				<h3 class="text-1xl mt-4 font-bold">Images</h3>
				© Wargaming
			</div>

			<div>
				<h2 class="mt-4 text-2xl font-bold">Final notes</h2>
				<p class="text-lg">
					Huge thanks for the free content QuickyBaby, I don't really play World of Tanks anymore
					because of this very document, but I still watch all of your videos as I really like your
					analytical side. If you want to include an updated version of this analysis next year,
					reach out to me at lukas@dreamplay.net and I'll sort out a new one.
				</p>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.wrapper {
		width: 100vw;
		min-height: 100vh;
		max-width: 100vw;
		overflow: hidden;
	}
</style>

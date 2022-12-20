import { ratingsPerYear, type Category } from '$lib/controllers/rawData';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { flowData } from '$lib/controllers/flowData';


const countPerYear: Record<number, Record<Category, number>> = Object.fromEntries(
  Object.entries(ratingsPerYear).map(([year, value]) => [
    parseInt(year),
    Object.fromEntries(
      Object.entries(value).map(([category, value]) => [category as Category, value.length])
    ) as Record<Category, number>
  ])
);

export const load = (async ({ params }) => {
  return {
    countPerYear: Object.entries(countPerYear)
      .map<[number, Record<Category, number>]>(([year, data]) => ([parseInt(year), data])),
    flowData,
  };
}) satisfies PageServerLoad;

export const prerender = true;
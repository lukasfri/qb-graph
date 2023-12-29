import { premiumTankTierList, type PremiumCategory } from '$lib/controllers/rawData';
import type { PageServerLoad } from '../$types';
import { flowData } from '$lib/controllers/flowData';


const countPerYear: Record<number, Record<PremiumCategory, number>> = Object.fromEntries(
  Object.entries(premiumTankTierList).map(([year, value]) => [
    parseInt(year),
    Object.fromEntries(
      Object.entries(value).map(([category, value]) => [category as PremiumCategory, value.length])
    ) as Record<PremiumCategory, number>
  ])
);

export const load = (async ({ params }) => {
  return {
    countPerYear: Object.entries(countPerYear)
      .map<[number, Record<PremiumCategory, number>]>(([year, data]) => ([parseInt(year), data])),
    flowData,
  };
}) satisfies PageServerLoad;

export const prerender = true;
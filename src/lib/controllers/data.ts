import { premiumTankTierList, type PremiumCategory, type IncompleteRecord, type RatingsList, type PremiumTank } from "./rawData";


function ratingsListToFlat(yearData: RatingsList): IncompleteRecord<PremiumTank, PremiumCategory> {
  return Object.fromEntries(
    Object.entries(yearData)
    .map(([category, data]) =>
      data.map<[PremiumTank, PremiumCategory]>(tank => [tank, category as PremiumCategory]))
      .flat(1)
  );
}

export const ratingsPerYearFlat: IncompleteRecord<number, IncompleteRecord<PremiumTank, PremiumCategory>> = Object.fromEntries(Object.entries(premiumTankTierList)
  .map(([year, ratings]) => [year, ratingsListToFlat(ratings)]));

export const yearTanks = Object.entries(premiumTankTierList)
  .map(([yearNumber, yearData]) => Object.values(yearData)
    .reduce((previousValue, currentValue) => previousValue.concat(currentValue), []))
    .map(tankArray => new Set(tankArray));


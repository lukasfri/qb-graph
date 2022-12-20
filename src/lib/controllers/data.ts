import { ratingsPerYear, type Category, type IncompleteRecord, type RatingsList, type TankName } from "./rawData";


function ratingsListToFlat(yearData: RatingsList): IncompleteRecord<TankName, Category> {
  return Object.fromEntries(
    Object.entries(yearData)
    .map(([category, data]) =>
      data.map<[TankName, Category]>(tank => [tank, category as Category]))
      .flat(1)
  );
}

export const ratingsPerYearFlat: IncompleteRecord<number, IncompleteRecord<TankName, Category>> = Object.fromEntries(Object.entries(ratingsPerYear)
  .map(([year, ratings]) => [year, ratingsListToFlat(ratings)]));

export const yearTanks = Object.entries(ratingsPerYear)
  .map(([yearNumber, yearData]) => Object.values(yearData)
    .reduce((previousValue, currentValue) => previousValue.concat(currentValue), []))
    .map(tankArray => new Set(tankArray));


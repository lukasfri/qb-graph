/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ratingsPerYearFlat } from "./data";
import { PremiumCategory, tanksList, type IncompleteRecord, type PremiumTank } from "./rawData";

export type GoingToDestination = PremiumCategory | "Ignored";
type GoingTo = IncompleteRecord<GoingToDestination, GoingFrom>;

export type GoingFromDestination = PremiumCategory | "New" | "Brought back";
type GoingFrom = IncompleteRecord<GoingFromDestination, number>;

export type FlowLabel = `${number}-${GoingFromDestination | GoingToDestination}`;

function incrementFlow(flowStats: Record<number, GoingTo>, yearNumber: number, from: GoingFromDestination, to: GoingToDestination) {
  const flowStat = flowStats[yearNumber];
  flowStat[to] ??= {};
  flowStat[to]![from] ??= 0;
  flowStat[to]![from]! += 1;
}

function generateFlowStats(): Record<number, GoingTo> {
  const hasBeenSeen = new Set<PremiumTank>();
  const flowStats: Record<number, GoingTo> = {};

  for (const [yearNumberUntyped, yearData] of Object.entries(ratingsPerYearFlat)) {
    if (!yearData) continue;
    
    const yearNumber = parseInt(yearNumberUntyped);
    flowStats[yearNumber] = {};
    const previousYearData = ratingsPerYearFlat[yearNumber - 1];
  
    if (!previousYearData) continue;
  
    
    for (const untypedTankName of Object.keys(tanksList)) {
      const tankName = untypedTankName as PremiumTank;
  
      const currentYearTank = yearData[tankName];
      const previousYearTank = previousYearData[tankName];
  
      if (!currentYearTank && !previousYearTank) continue;
  
      if (!currentYearTank && previousYearTank) {
        incrementFlow(flowStats, yearNumber, previousYearTank, "Ignored");
        continue;
      }
  
      if (!previousYearTank && currentYearTank) {
        incrementFlow(flowStats, yearNumber, hasBeenSeen.has(tankName) ? "Brought back" : "New", currentYearTank);
        hasBeenSeen.add(tankName);
        continue;
      }
  
      if (previousYearTank && currentYearTank)
        incrementFlow(flowStats, yearNumber, previousYearTank, currentYearTank);
    }
  }

  return flowStats;
}

export const flowStats: Record<number, GoingTo> = generateFlowStats();

export interface FlowData {
  from: FlowLabel;
  to: FlowLabel;
  flow: number;
}

export const categoryPriorities: Record<GoingFromDestination | GoingToDestination, number> = {
  [PremiumCategory.PayToWin]: 1,
  [PremiumCategory.SuperCompetitive]: 2,
  [PremiumCategory.GreatPerformers]: 3,
  [PremiumCategory.DecentChoices]: 4,
  [PremiumCategory.AlrightSituational]: 5,
  [PremiumCategory.Avoid]: 6,
  [PremiumCategory.IHateIt]: 7,
  [PremiumCategory.PayToLose]: 8,
  Ignored: 10,
  New: 0,
  "Brought back": 9
}

function generatePriority(year: number, type: GoingFromDestination | GoingToDestination): number {
  return year * 20 + categoryPriorities[type];
}

function generateFlowDataFromStats(flowStats: Record<number, GoingTo>): {
  data: FlowData[];
  priority: IncompleteRecord<FlowLabel, number>,
  column: IncompleteRecord<FlowLabel, number>,
} {
  const flows: FlowData[] = [];
  const priority: IncompleteRecord<FlowLabel, number> = {};
  const column: IncompleteRecord<FlowLabel, number> = {};
  const lowestYear = parseInt(
    Object.entries(flowStats)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .shift()?.[0]
    ?? "0");

  for (const [yearNumberUntyped, flowStat] of Object.entries(flowStats)) {
    for (const [to, fromStats] of Object.entries(flowStat)) {
      for (const [from, value] of Object.entries(fromStats)) {
        if (value === 0) continue;

        const toYear = parseInt(yearNumberUntyped);
        const fromYear = toYear - 1;

        const fromType = from as GoingFromDestination;
        const toType = to as GoingToDestination;

        const fromLabel: FlowLabel = `${fromYear}-${fromType}`;
        const toLabel: FlowLabel = `${toYear}-${toType}`;

        flows.push({
          flow: value,
          from: fromLabel,
          to: toLabel,
        });

        priority[fromLabel] = generatePriority(fromYear, fromType);
        priority[toLabel] = generatePriority(toYear, toType);
        column[fromLabel] = fromYear - lowestYear;
        column[toLabel] = toYear - lowestYear;
      }
    }
  }
  return {data: flows, priority, column};
}

export const flowData = generateFlowDataFromStats(flowStats);
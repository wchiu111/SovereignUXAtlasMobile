import {
  EXPERIMENTS_COLLECTION,
  MOBILE_EXPERIMENTS,
} from "./experimentsContent";
import {
  EXPERIMENTS_OVERVIEW_LAYOUT,
  EXPERIMENTS_PARENT_CORE,
  EXPERIMENTS_RELATIONS,
} from "./experimentsGeometry";
import { defineConstellationTemplate } from "../template/constellationTypes";

export const EXPERIMENTS_TEMPLATE = defineConstellationTemplate({
  parent: {
    ...EXPERIMENTS_COLLECTION,
    ...EXPERIMENTS_PARENT_CORE,
  },
  items: MOBILE_EXPERIMENTS,
  geometry: EXPERIMENTS_OVERVIEW_LAYOUT,
  relations: EXPERIMENTS_RELATIONS,
});

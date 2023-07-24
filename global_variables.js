import * as Constants from "./constants.js";

// global variables used throughout
export let heights = document.getElementById(Constants.HEIGHTS_ID);
export let weights = document.getElementById(Constants.WEIGHTS_ID);
export let playerTypes = document.getElementById(Constants.PLAYERTYPE_ID);
export let attributeValues = document.getElementsByClassName(Constants.ATTRIBUTE_VALUES_CLASSNAME);
export let upgradeValues = document.getElementsByClassName(Constants.UPGRADE_VALUES_CLASSNAME);

export let globalPreviousHeight;
export let globalPreviousWeight;
export let globalCurrentHeight;
export let globalCurrentWeight;

export let availableUpgradePoints = [0, 0, 0, 0, 0];
export let previousUpgradeModifier = new Array(23).fill(0);

// SETTERS
export function setGlobalPreviousHeight(newValue) {
  globalPreviousHeight = newValue;
}

export function setGlobalPreviousWeight(newValue) {
  globalPreviousWeight = newValue;
}

export function setGlobalCurrentHeight(newValue) {
  globalCurrentHeight = newValue;
}

export function setGlobalCurrentWeight(newValue) {
  globalCurrentWeight = newValue;
}

					

/**
 * 2022-2023
 * Anthony Liscio
 * 
 * global_variables.js
 * 
 *    Used to store variables which are used and changed throughout the other js files.
 */

import * as Constants from "./constants.js";

// global variables used throughout
export let heights = document.getElementById(Constants.HEIGHTS_ID);
export let weights = document.getElementById(Constants.WEIGHTS_ID);
export let playerTypes = document.getElementById(Constants.PLAYERTYPE_ID);

export let attributeValues = document.getElementsByClassName(Constants.ATTRIBUTE_VALUES_CLASSNAME);
export let upgradeValues = document.getElementsByClassName(Constants.UPGRADE_VALUES_CLASSNAME);
export let boostValues = document.getElementsByClassName(Constants.BOOST_VALUE_CLASSNAME);
export let boostRequirements = document.getElementsByClassName(Constants.BOOST_REQ_CLASSNAME);

export let boostSection = document.getElementById(Constants.BOOST_SECTION_ID);
export let boostDisplayItems = document.getElementsByClassName(Constants.BOOST_DISPLAY_ITEM_CLASSNAME);

export let mainAbilityNames = document.getElementsByClassName(Constants.MAIN_ABILITY_NAME_CLASSNAME);
export let mainAbilityDescriptions = document.getElementsByClassName(Constants.MAIN_ABILITY_DESCRIPTION_CLASSNAME);
export let mainAbilityIcons = document.getElementById(Constants.MAIN_ABILITY_SECTION_ID).getElementsByClassName(Constants.ICONS_CLASSNAME);
export let mainAbilityItems = document.getElementsByClassName(Constants.MAIN_ABILITY_ITEM_CLASSNAME);

export let abilityItems = document.getElementsByClassName(Constants.ABILITY_ITEM_CLASSNAME);
export let abilityNames = document.getElementsByClassName(Constants.ABILITY_NAME_CLASSNAME);
export let abilityDescriptions = document.getElementsByClassName(Constants.ABILITY_DESCRIPTION_CLASSNAME);
export let abilityRequirements = document.getElementsByClassName(Constants.ABILITY_REQ_CLASSNAME);

export let boostItems = document.getElementsByClassName(Constants.BOOST_ITEM_CLASSNAME);

export let abilityDisplayItems = document.getElementsByClassName(Constants.ABILITY_DISPLAY_ITEM_CLASSNAME);
export let mainAbilityDisplayItem = document.getElementsByClassName(Constants.MAIN_ABILITY_DISPLAY_ITEM_CLASSNAME)[0];

export let unselectButtons = document.getElementsByClassName(Constants.UNSELECT_BUTTON_CLASSNAME);
export let boostUpgradeValues = document.getElementsByClassName(Constants.BOOST_UPGRADE_VALUES_CLASSNAME);

export let attributeMeters = document.getElementsByClassName(Constants.ATTRIBUTE_METER_CLASSNAME);



export let buildPosition;



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

export function resetAvailableUpgradePoints() {
  availableUpgradePoints = [0, 0, 0, 0, 0];
}

export function resetPreviousUpgradeModifier() {
  previousUpgradeModifier = Array(23).fill(0);
}
					

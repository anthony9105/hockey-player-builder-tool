/**
 * 2022-2023
 * Anthony Liscio
 * 
 * utility_functions.js
 * 
 *    Used for other functions that are useful and are used throughout the other js files
 *    but don't specifically fit with the other js files.
 */


import * as Variables from "../variables/global_variables.js"; 
import * as Constants from "../variables/constants.js";

/**
 * isElementNode function used to return the node only if
 * the node is an element node.  (The purpose of this is to
 * not include #text childNodes).
 * 
 * Used with the filter function.
 * @param {Object} node 
 * @returns node or nothing
 */
export function isElementNode(node) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    return node;
  }
  else {
    return;
  }
}

/**
 * convertFeetandInchesToInches function.
 * Used to convert imperial height (feet and inches) to just inches.
 * @param {string} imperialHeight height in feet and inches
 * @returns height in inches
 */
export function convertFeetandInchesToInches(imperialHeight) {
  var feet = parseInt(imperialHeight[0]);

  var inches = "";
  for (var i = 2; i < imperialHeight.length; i++) {
    inches += imperialHeight[i];
  }
  inches = parseInt(inches);

  return (12 * feet) + inches;
}

/**
 * fetchFromXMLFile function used to fetch and return the "Document"
 * from the specific XML file provided.  This way the needed information
 * can be used from the XML file in various different areas.
 * @param {String} filePath 
 * @returns Document (or undefined if fetch was unsuccessful)
 */
export async function fetchFromXMLFile(filePath) {
  try {
    const response = await fetch(filePath);
    const xmlString = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");
    
    return xmlDoc;
  }
  catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * getUpgradePointChange function.
 * Used to get the upgrade point change, so that the available upgrade points
 * can be updated.
 * @param {number} i - index of the current attribute 
 * @returns upgradePointChange
 */
export async function getUpgradePointChange(i) {
  let upgradePointChange = 0;

  try {
    const xmlDoc = await fetchFromXMLFile(Constants.UPGRADE_POINTS_XML);
    const attributeCosts = xmlDoc.querySelector(Constants.XML_ATT_COSTS_NODE);

    let indexModifier = 0;
    let currentUpgradeModifier = parseInt(Variables.upgradeValues[i].innerHTML);

    if (currentUpgradeModifier > 0) {
      indexModifier = 4;
    }
    else {
      indexModifier = 5;
    }

    // upgradeDowngradeIndex.  For example plus1 upgrade starts at index 4, so that is why the + 4 is there.
    // upgradeDowngradeIndex + (upgradeDowngradeIndex + 1) because there are childnodes which are #text so this will account for
    // this and avoid them.
    let upgradeDowngradeIndex = currentUpgradeModifier + indexModifier;
    upgradeDowngradeIndex = upgradeDowngradeIndex + (upgradeDowngradeIndex + 1);

    // childnodes index
    let j = i + (i + 1);
    if (j == 0) {
      j = 1;
    }

    upgradePointChange = parseInt(attributeCosts.childNodes[j].childNodes[upgradeDowngradeIndex].textContent);

    if (Variables.previousUpgradeModifier[i] > 0 && currentUpgradeModifier < Variables.previousUpgradeModifier[i]) {
      upgradeDowngradeIndex = Variables.previousUpgradeModifier[i] + indexModifier;
      upgradeDowngradeIndex = upgradeDowngradeIndex + (upgradeDowngradeIndex + 1);
      upgradePointChange = parseInt(attributeCosts.childNodes[j].childNodes[upgradeDowngradeIndex].textContent);
      upgradePointChange *= -1;
    }
    else if (Variables.previousUpgradeModifier[i] < 0 && currentUpgradeModifier > Variables.previousUpgradeModifier[i] && currentUpgradeModifier != 0) {
      upgradeDowngradeIndex = Variables.previousUpgradeModifier[i] + indexModifier;
      upgradeDowngradeIndex = upgradeDowngradeIndex + (upgradeDowngradeIndex + 1);
      upgradePointChange = parseInt(attributeCosts.childNodes[j].childNodes[upgradeDowngradeIndex].textContent);
      upgradePointChange *= -1;
    }

    Variables.previousUpgradeModifier[i] = currentUpgradeModifier;
  }
  catch (error) {
    console.error(error);
  }

  return upgradePointChange;
}

export function meetsRequirement(requirementMessage) {
  const temp1 = requirementMessage.split("(requires minimum ").pop();
  const temp2 = temp1.replace(")", "");

  // split by the first space only
  const requirement = temp2.split(/ (.*)/);

  const currentAttributeValue = Variables.attributeValues[Constants.ALL_ATTRIBUTES_INORDER_FULLSPELLING.indexOf(requirement[1])];
  
  if (currentAttributeValue.textContent >= requirement[0]) {
    return true;
  }
  else {
    return false;
  }
}
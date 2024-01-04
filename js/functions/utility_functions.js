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
// import {kdTree, BinaryHeap } from "../../kd-tree-javascript-master/kdTree.js";

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
 * convertInchesToFeetAndInches function used to convert
 * height in inches to height in feet and inches.
 * @param {number} totalInches height in inches (ex: 71)
 * @returns height in feet and inches (ex: 5'11)
 */
export function convertInchesToFeetAndInches(totalInches) {
  console.log(typeof(totalInches));
  let feet = Math.floor(totalInches / 12);
  let inches = totalInches - (feet * 12);

  return `${feet}'${inches}`;
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

/**
 * getRequirementValueAndAttributeName function used to take a full
 * requirement message and return a list with the minimum value and 
 * name of the attribute required
 * @param {string} requirementMessage full requirement message.  Example: (requires minimum 80 Hand-Eye) 
 * @returns a list with the minimum attribute value and attribute name.  Example: ['80', 'Hand-Eye']
 */
export function getRequirementValueAndAttributeName(requirementMessage) {
  const temp1 = requirementMessage.split("(requires minimum ").pop();
  const temp2 = temp1.replace(")", "");

  // split by the first space only
  return temp2.split(/ (.*)/);
}

/**
 * meetsRequirement function used to return a boolean for if an individual requirement is met.
 * @param {string} requirementMessage the full requirement message (ex: (requires minimum 80 Hand-Eye))
 * @param {number} upgradeAmount the upgrade that is about to be applied (default is 0)
 * @returns if the requirement is met (true or false)
 */
export function meetsRequirement(requirementMessage, upgradeAmount) {
  const requirement = getRequirementValueAndAttributeName(requirementMessage);

  if (upgradeAmount == undefined) {
    upgradeAmount = 0;
  }

  const currentAttributeValue = parseInt(Variables.attributeValues[Constants.ALL_ATTRIBUTES_INORDER_FULLSPELLING.indexOf(requirement[1])].textContent) + upgradeAmount;

  if (currentAttributeValue >= requirement[0]) {
    return true;
  }
  else {
    return false;
  }
}

/**
 * checkSelectedRequirementsIfAttributeChangeDone function used to check if the reqiurements for each
 * selected ability is met or not, as a result of the upgradeAmount being added to the current attribute
 * @param {number} upgradeAmount the upgrade that is about to be applied (should be 1 or -1)
 * @param {number} indexOfAttribute index of the attribute that is to be modified 
 * @returns true if the attribute change is to be done with or false if the attribute change is not to be done.
 * (default is true)
 */
export function checkSelectedRequirementsIfAttributeChangeDone(upgradeAmount, indexOfAttribute) {
  let continueWithAttributeChange;
  Object.values(Variables.abilityDisplayItems).forEach(abilityDisplayItem => {
    let requirements = abilityDisplayItem.getElementsByClassName(Constants.ABILITY_DISPLAY_REQ_CLASSNAME);

    Object.values(requirements).forEach(requirement => {
      const requirementInfo = getRequirementValueAndAttributeName(requirement.textContent);

      // if the requirement is not empty (unused display slots will have empty requirements) and if the current requirement is the same
      // as the attribute to be modified
      if (requirement.textContent != "" && requirementInfo[1] == Constants.ALL_ATTRIBUTES_INORDER_FULLSPELLING[indexOfAttribute]) {
        const reqValid = meetsRequirement(requirement.textContent, upgradeAmount);

        // if requirements are not met
        if (!reqValid) {
          // so that the window pop-up is not constantly repeatedly
          if (continueWithAttributeChange == undefined && abilityDisplayItem.style.backgroundColor != Constants.INVALID_BOOST_OR_ABILITY_RGBA) {
            continueWithAttributeChange = window.confirm("This attribute changes causes 1 or more selected abilities to no longer meet minimum requirement(s).  Continue with attribute change or cancel?");
          }

          // if continuing with attribute change set the selected ability to be a red shade so it is clear that ability is now invalid
          if (continueWithAttributeChange != false) {
            abilityDisplayItem.style.backgroundColor = Constants.INVALID_BOOST_OR_ABILITY_RGBA;
            requirement.style.color = "red";
          }
        }
      }
    });
  });

  Object.values(Variables.boostDisplayItems).forEach(boostDisplayItem => {
    let requirements = boostDisplayItem.getElementsByClassName(Constants.BOOST_DISPLAY_REQ_CLASSNAME);

    Object.values(requirements).forEach(requirement => {
      const requirementInfo = getRequirementValueAndAttributeName(requirement.textContent);
      if (requirement.textContent != "" && requirementInfo[1] == Constants.ALL_ATTRIBUTES_INORDER_FULLSPELLING[indexOfAttribute]) {
        const reqValid = meetsRequirement(requirement.textContent, upgradeAmount);

        // if requirements are not met
        if (!reqValid) {
          if (continueWithAttributeChange == undefined && boostDisplayItem.style.backgroundColor != Constants.INVALID_BOOST_OR_ABILITY_RGBA) {
            continueWithAttributeChange = window.confirm("This attribute changes causes 1 or more selected abilities to no longer meet minimum requirement(s).  Continue with attribute change or cancel?");
          }

          // if continuing with attribute change set the selected ability to be a red shade so it is clear that ability is now invalid
          if (continueWithAttributeChange != false) {
            boostDisplayItem.style.backgroundColor = Constants.INVALID_BOOST_OR_ABILITY_RGBA;
            requirement.style.color = "red";
          }
        }
      }
    });
  });

  continueWithAttributeChange = continueWithAttributeChange == undefined ? true : continueWithAttributeChange;

  return continueWithAttributeChange;
}

/**
 * checkIfInvalidBoostOrAbilityIsNowValid function used to set a display slot which is previously invalid
 * to valid again if an attribute upgrade meets the minimum requirement once again
 */
export function checkIfInvalidBoostOrAbilityIsNowValid() {
  Object.values(Variables.abilityDisplayItems).forEach(abilityDisplayItem => {
    let requirements = abilityDisplayItem.getElementsByClassName(Constants.ABILITY_DISPLAY_REQ_CLASSNAME);

    Object.values(requirements).forEach((requirement, index) => {
      if (requirement.textContent != "") {
        const reqValid = meetsRequirement(requirement.textContent);

        requirement.style.color = reqValid ? "green" : "red";

        // if requirements are met and it formerly didn't (because the background is a red shade)
        if (reqValid && abilityDisplayItem.style.backgroundColor == Constants.INVALID_BOOST_OR_ABILITY_RGBA) {
          const otherIndex = index == 0 ? 1 : 0;

          // if the other requirement is also valid then set the background colour back to normal (since abilities have 2 requirements)
          if (meetsRequirement(requirements[otherIndex].textContent)) {
            abilityDisplayItem.style.backgroundColor = Constants.DISPLAY_SLOT_BACKGROUND_RGBA;
          }
        }
      }
    });
  });

  Object.values(Variables.boostDisplayItems).forEach(boostDisplayItem => {
    let requirements = boostDisplayItem.getElementsByClassName(Constants.BOOST_DISPLAY_REQ_CLASSNAME);

    Object.values(requirements).forEach((requirement) => {
      if (requirement.textContent != "") {
        const reqValid = meetsRequirement(requirement.textContent);

        requirement.style.color = reqValid ? "green" : "red";

        // if requirements are met and it formerly didn't (because the background is a red shade)
        if (reqValid && boostDisplayItem.style.backgroundColor == Constants.INVALID_BOOST_OR_ABILITY_RGBA) {
          boostDisplayItem.style.backgroundColor = Constants.DISPLAY_SLOT_BACKGROUND_RGBA;
        }
      }
    });
  });
}

/**
 * getBoostUpgradeInfo function used to get the upgrade info
 * (upgrade amount and the attribute to be upgraded).
 * @param {string} boostName full name of the boost.  Example: +4 shot blocking.
 * @returns upgrade amount and name of the attribute to be upgraded.  Example: ["4", "Shot Blocking"].
 */
export function getBoostUpgradeInfo(boostName) {
  const temp = boostName.replace("+", "");
  return temp.split(/ (.*)/);
}

export function getColourForMeterValue(value) {
  // extremely excellent attribute
  if (value >= 94) {
    return Constants.VERY_EXCELLENT_ATTRIBUTE_COLOUR;
  }
  // excellent attribute
  else if (value >= 88) {
    return "green";
  }
  // very good attribute
  else if (value >= 85) {
    return Constants.GOOD_ATTRIBUTE_COLOUR;
  }
  // solid attribute
  else if (value >= 82) {
    return Constants.SOLID_ATTRIBUTE_COLOUR;
  }
  // average attribute
  else if (value >= 78) {
    return Constants.AVG_ATTRIBUTE_COLOUR;
  }
  // below average attribute
  else if (value >= 75) {
    return Constants.BELOW_AVG_ATTRIBUTE_COLOUR;
  }
  // weak attribute
  else {
    return "red";
  }
}

/**
 * getTopAttributes function used to get the top attributes of the current build
 * @param {number} amountOfAttributes the amount of top attributes that you wanted returned
 * @returns the top attribute values
 */
export function getTopAttributes(amountOfAttributes) {
  if (amountOfAttributes >= Variables.attributeValues.length) {
    console.warn("amountOfAttributes is the same or more than the total amount of attributes");
    return Variables.attributeValues;
  }

  // initialize the topAttributes with the first x amount of attribute values, sorted in descending order. Also map is used to include both the index and the value
  let topAttributes = Object.values(Variables.attributeValues)
                                                              .map((value, index) => ({index, value: parseInt(value.textContent)}))
                                                              .slice(0, amountOfAttributes).sort((a, b) => b.value - a.value);
  
  // if the build position is not "C" (Centre), then add the index of "Faceoffs" to excludeIndices, since it is an attribute that only matters for centres
  let excludeIndices = Variables.buildPosition !== "C" ? [Constants.ALL_ATTRIBUTES_INORDER_FULLSPELLING.indexOf("Faceoffs")] : [];

  for (let i = amountOfAttributes; i < Variables.attributeValues.length; i++) {
    // if the current attribute is greater than the last value in topAttributes (this is being compared
    // to the last value in topAttributes since it is sorted in descending order, so the last value is the smallest)
    if (!excludeIndices.includes(i) && parseInt(Variables.attributeValues[i].textContent) > topAttributes[amountOfAttributes - 1].value) {
      topAttributes.pop(); // remove the smallest of the current topAttributes
      topAttributes.push({index: i, value: parseInt(Variables.attributeValues[i].textContent)}); // add the new value
      topAttributes.sort((a, b) => b.value - a.value); // sort in descending order again
    }
  }

  return topAttributes;
}

/**
 * getWorstAttributes function used to get the worst attributes of the current build
 * @param {number} amountOfAttributes the amount of top attributes that you wanted returned
 * @returns the worst attribute values
 */
export function getWorstAttributes(amountOfAttributes) {
  if (amountOfAttributes >= Variables.attributeValues.length) {
    console.warn("amountOfAttributes is the same or more than the total amount of attributes");
    return Variables.attributeValues;
  }

  // initialize the worstAttributes with the first x amount of attribute values, sorted in ascending order
  let worstAttributes = Object.values(Variables.attributeValues)
                                                              .map((value, index) => ({index, value: parseInt(value.textContent)}))
                                                              .slice(0, amountOfAttributes).sort((a, b) => a.value - b.value);

  // if the build position is not "C" (Centre), then add the index of "Faceoffs" to excludeIndices, since it is an attribute that only matters for centres
  let excludeIndices = Variables.buildPosition !== "C" ? [Constants.ALL_ATTRIBUTES_INORDER_FULLSPELLING.indexOf("Faceoffs")] : [];

  for (let i = amountOfAttributes; i < Variables.attributeValues.length; i++) {
    // if the current attribute is less than the last value in topAttributes (this is being compared
    // to the last value in topAttributes since it is sorted in descending order, so the last value is the largest)
    if (!excludeIndices.includes(i) && parseInt(Variables.attributeValues[i].textContent) < worstAttributes[amountOfAttributes - 1]) {
      worstAttributes.pop(); // remove the largest of the current worstAttributes
      worstAttributes.push({index: i, value: parseInt(Variables.attributeValues[i].textContent)}); // add the new value
      worstAttributes.sort((a, b) => a.value - b.value); // sort in ascending order again
    }
  }

  return worstAttributes;
}

/**
 * getAttributeObject function used to get the attribute object from the player builder
 * @returns {object} the attributes object for the current player build
 */
export function getAttributeObject() {
  // converting html collection to array
  const attributeValuesArray = Array.from(Variables.attributeValues);

  const attributeObject = {};

  attributeValuesArray.forEach((attributeValue, index) => {
    // attribute names in order array used for the object keys, and attributeValue for the object values
    attributeObject[Constants.ALL_ATTRIBUTES_INORDER_FULLSPELLING_NOSPACES[index]] = parseInt(attributeValue.textContent);
  });

  return attributeObject;
}


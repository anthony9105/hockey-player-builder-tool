/**
 * 2022-2023
 * Anthony Liscio
 * 
 * update_functions.js
 * 
 *    Used for functions that update or change parts of the website.
 */


import * as Variables from "../variables/global_variables.js";
import * as Constants from "../variables/constants.js";
import * as UtilityFunctions from "./utility_functions.js";


/**
 * applyAttributeChangesFromPhysicalChanges function.
 * Used to apply the necessary attribute changes when a new build is created and whenever
 * the height is changed.
 * @param {string} buildName name of the build
 * @param {number} previous previous height in inches or previous weight in lbs
 * @param {number} current current height in inches or current weight in lbs
 * @param {string} physicalAspect string keyword which is either "Height" or "Weight"
 */
export async function applyAttributeChangesFromPhysicalChanges(buildName, previous, current, physicalAspect) {
  try {
    const xmlDoc = await UtilityFunctions.fetchFromXMLFile(Constants.PHYS_UPGRADE_DOWNGRADE_XML);
    const builds = xmlDoc.querySelectorAll(Constants.XML_BUILD_NODE);
    // console.log(document.getElementsByClassName('attribute-value').length);

    // for each build
    for (const build of builds) {

      // get the name of the current build
      const nameValue = build.querySelector(Constants.XML_NAME_NODE).textContent;

      // if the name of the current build matches with the paramater value, buildName
      if (nameValue === buildName) {
        var physicals = build.querySelectorAll(physicalAspect);

        for (var i = 0; i < physicals.length; i++) {

          var currentXmlAmount = physicals[i].querySelector(Constants.XML_VALUE_NODE).textContent;

          if (physicalAspect == "Height") {
            currentXmlAmount = UtilityFunctions.convertFeetandInchesToInches(physicals[i].querySelector(Constants.XML_VALUE_NODE).textContent);
          }

          // going up height/weight
          if (current > previous) {
            if (current >= currentXmlAmount && previous <= currentXmlAmount) {

              // var isValid = false;
              // if (previous < currentXmlAmount && current >= currentXmlAmount) {isValid = true;}
              let isValid = previous < currentXmlAmount && current >= currentXmlAmount ? true : false;

              if (isValid) {
                // apply upgrades/downgrades
                for (var j = 3; j < physicals[i].childNodes.length; j += 2) {
                  var attributeIndex = Constants.ALL_ATTRIBUTES_INORDER.indexOf(physicals[i].childNodes[j].nodeName);
                  Variables.attributeValues[attributeIndex].innerHTML = parseInt(Variables.attributeValues[attributeIndex].innerHTML) + parseInt(physicals[i].childNodes[j].textContent);
                  console.log(physicals[i].childNodes[j].nodeName + "  -> " + parseInt(physicals[i].childNodes[j].textContent));

                }
              }
            }
          }
          // going down height/weight
          else if (current < previous) {
            if (current <= currentXmlAmount && previous >= currentXmlAmount) {
              // var isValid = false;
              // if (previous >= currentXmlAmount && current < currentXmlAmount) {isValid = true;}
              let isValid = previous >= currentXmlAmount && current < currentXmlAmount ? true : false;

              if (isValid) {
                // apply upgrades/downgrades
                for (var j = 3; j < physicals[i].childNodes.length; j+=2) {
                  var attributeIndex = Constants.ALL_ATTRIBUTES_INORDER.indexOf(physicals[i].childNodes[j].nodeName);
                  Variables.attributeValues[attributeIndex].innerHTML = parseInt(Variables.attributeValues[attributeIndex].innerHTML) + parseInt(physicals[i].childNodes[j].textContent) * -1;
                  console.log(physicals[i].childNodes[j].nodeName + "  -> " + parseInt(physicals[i].childNodes[j].textContent) * -1);
                }
              }

            }
          } // end of else if (current < previous)

        }
      }
    }
  }
  catch (error) {
    console.error(error);
  }
}

/**
 * increaseOrDecreaseAttribute function.
 * Used to increase or decrease (depending on the upgradeType provided)
 * the selected attribute.
 * @param {string} upgradeType the upgrade type (must be either "increase" or "decrease")
 * @param {number} i the index of the attribute selected
 */
export async function increaseOrDecreaseAttribute(upgradeType, i) {
  var upgradeAmount = 0;

  if (upgradeType == "increase") {
    upgradeAmount = 1;
  }
  else if (upgradeType == "decrease") {
    upgradeAmount = -1;
  }
  else {
    console.error("Invalid value for variable: upgradeType");
  }

  // increase/decrease the attribute and the current upgrade modifier
  Variables.attributeValues[i].innerHTML = parseInt(Variables.attributeValues[i].innerHTML) + upgradeAmount;
  Variables.upgradeValues[i].innerHTML = parseInt(Variables.upgradeValues[i].innerHTML) + upgradeAmount;
  
  // change the upgrade modifier colour
  changeUpgradeOptionColour(i);

  // getting the index for the attribute section (0-4)
  var j = 0;
  if (i < 5) {
    j = 0;
  }
  else if (i < 10) {
    j = 1;
  }
  else if (i < 15) {
    j = 2;
  }
  else if (i < 19) {
    j = 3;
  }
  else {
    j = 4;
  }

  // update available upgrade points
  Variables.availableUpgradePoints[j] += await UtilityFunctions.getUpgradePointChange(i);
  updateAvailableUpgradePoints(Variables.availableUpgradePoints[j], j); 
}

/**
 * changeUpgradeOptionColour function.
 * Used to change upgrade display colour based on if it is positive (green), negative (red),
 * or zero (lightgray).
 * @param {number} i the index of the attribute
 */
function changeUpgradeOptionColour(i) {
  if (Variables.upgradeValues[i].innerHTML > 0) {
    Variables.upgradeValues[i].style.color = 'green';
  }
  else if (Variables.upgradeValues[i].innerHTML == 0) {
    Variables.upgradeValues[i].style.color = '#3a379c';
  }
  else {
    Variables.upgradeValues[i].style.color = 'red';
  }
}

/**
 * updateAvailableUpgradePoints function.
 * Used to update the available upgrade points for the appropriate attribute section.
 * @param {number} availUpgradePts the new available attribute points
 * @param {number} i the index of the available upgrade points to update
 */
function updateAvailableUpgradePoints(availUpgradePts, i) {
  let availablePointsValues = document.getElementsByClassName(Constants.POINTS_AVAIL_CLASSNAME);

  availablePointsValues[i].innerHTML = availUpgradePts;
}



/**
 * HIDING / REVEALING DROPDOWNS
 */
/**
 * hideOrRevealDropdown function which hides or reveals the dropdown (whichever is appropriate)
 * @param {Object} dropdownContent the dropdown content to hide/reveal
 * @param {Number} i the index of the dropdownContent Object to hide/reveal
 */
export function hideOrRevealDropdown(dropdownContent, i) {
  if (dropdownContent[i].style.display === "none" || dropdownContent[i].style.display == "") {
    dropdownContent[i].style.display = "flex";
    dropdownContent[i].style.overflow = "hidden";
  }
  else {
    dropdownContent[i].style.display = "none";
  }
}

/**
 * hideDropdown function which hides the dropdown
 * @param {Object} dropdownContent the dropdown content to hide
 * @param {Number} i the index of the dropdownContent to hide
 */
export function hideDropdown(dropdownContent, i) {
  dropdownContent[i].style.display = "none";
}

/**
 * revealDropdown function which reveals the dropdown
 * @param {Object} dropdownContent the dropdown content to reveal
 * @param {Number} i the index of the dropdownContent to reveal
 */
export function revealDropdown(dropdownContent, i) {
  dropdownContent[i].style.display = "flex";
  dropdownContent[i].style.overflow = "hidden";
}



/**
 * resetUpgrades function.
 * Used to reset the upgrades that may have been previously done to a build.
 * @param {Object} upgradeValues all the upgrade values
 */
export function resetUpgrades(upgradeValues) {
  for (var i = 0; i < Variables.upgradeValues.length; i++) {
    Variables.upgradeValues[i].innerHTML = 0;
    Variables.upgradeValues[i].style.color = '#3a379c';
  }
}




export function setSelectedAbilityValues(displayItemIndex, abilityName, abilityDescription, abilityRequirements, abilityIcon) {
  let displayAbilityName = Variables.abilityDisplayItems[displayItemIndex].getElementsByClassName(Constants.ABILITY_DISPLAY_NAME_CLASSNAME)[0];
  displayAbilityName.textContent = abilityName;
  displayAbilityName.style.fontStyle = "bold";

  let displayAbilityDescription = Variables.abilityDisplayItems[displayItemIndex].getElementsByClassName(Constants.ABILITY_DISPLAY_DESC_CLASSNAME)[0];
  displayAbilityDescription.textContent = abilityDescription;

  let displayAbilityRequirements = Variables.abilityDisplayItems[displayItemIndex].getElementsByClassName(Constants.ABILITY_DISPLAY_REQ_CLASSNAME);
  Object.values(displayAbilityRequirements).forEach((displayAbilityRequirement, index) => {
    displayAbilityRequirement.textContent = abilityRequirements[index].textContent;
  });

  let displayAbilityIcon = Variables.abilityDisplayItems[displayItemIndex].getElementsByClassName(Constants.ICONS_CLASSNAME)[0];
  displayAbilityIcon.textContent = abilityIcon;
}
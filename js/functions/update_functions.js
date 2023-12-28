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

                  updateAttributeMeter(Variables.attributeValues[attributeIndex].textContent, attributeIndex);
                  // Variables.attributeMeters[attributeIndex].value += parseInt(physicals[i].childNodes[j].textContent);
                  // console.log(physicals[i].childNodes[j].nodeName + "  -> " + parseInt(physicals[i].childNodes[j].textContent));

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
                  updateAttributeMeter(Variables.attributeValues[attributeIndex].textContent, attributeIndex);
                  // Variables.attributeMeters[attributeIndex].value += parseInt(physicals[i].childNodes[j].textContent);
                  // console.log(physicals[i].childNodes[j].nodeName + "  -> " + parseInt(physicals[i].childNodes[j].textContent) * -1);
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
 * updateAttributeMeter function used to update the attribute meter of the specified attribute
 * @param {number} newAttributeValue the new attribute value
 * @param {number} attributeIndex the index of the attribute being updated
 */
export function updateAttributeMeter(newAttributeValue, attributeIndex) {
  const attributeMeter = Variables.attributeMeters[attributeIndex];

  // update attribute meter value
  attributeMeter.value = newAttributeValue;

  // update attribute meter fill
  const attributeMeterFill = document.getElementsByClassName(Constants.ATTRIBUTE_METER_FILL_CLASSNAME)[attributeIndex];
  const meterColour = UtilityFunctions.getColourForMeterValue(attributeMeter.value);
  const range = attributeMeter.max - attributeMeter.min;
  const ratio = (attributeMeter.value - attributeMeter.min) / range;

  attributeMeterFill.style.width = `${ratio * 100}%`;
  attributeMeterFill.style.backgroundColor = meterColour;
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

  const continueWithAttributeChange = UtilityFunctions.checkSelectedRequirementsIfAttributeChangeDone(upgradeAmount, i);

  if (continueWithAttributeChange) {
    // increase/decrease the attribute and the current upgrade modifier
    Variables.attributeValues[i].innerHTML = parseInt(Variables.attributeValues[i].innerHTML) + upgradeAmount;
    Variables.upgradeValues[i].innerHTML = parseInt(Variables.upgradeValues[i].innerHTML) + upgradeAmount;

    // increase/decrease the attribute meter value
    updateAttributeMeter(Variables.attributeValues[i].textContent, i);
    
    // used to check if an increase in attribute will make a previously 
    //invalid selected ability or boost to now be valid
    if (upgradeType == "increase") {
      UtilityFunctions.checkIfInvalidBoostOrAbilityIsNowValid();
    }

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
 * resetUpgradePoints function used to reset the upgrade points to 0
 */
export function resetUpgradePoints() {
  let availablePointsValues = document.getElementsByClassName(Constants.POINTS_AVAIL_CLASSNAME);
  Object.values(availablePointsValues).forEach(availablePointsValue => {
    availablePointsValue.textContent = 0;
    Variables.resetAvailableUpgradePoints();
    Variables.resetPreviousUpgradeModifier();
  });  
}

/**
 * applyBoostUpgradeOrDowngrade function used for applying or unapplying a boost.
 * @param {string} attributeAffected the name of the attribute being changed by the boost
 * @param {number} boostUpgradeAmount the amount of attribute points that the boost effects
 */
export function applyBoostUpgradeOrDowngrade(attributeAffected, boostUpgradeAmount) {
  const attributeIndex = Constants.ALL_ATTRIBUTES_INORDER_FULLSPELLING.indexOf(attributeAffected);

  // boost upgrade changes
  if (Variables.boostUpgradeValues[attributeIndex] != undefined) {
    Variables.boostUpgradeValues[attributeIndex].textContent = parseInt(Variables.boostUpgradeValues[attributeIndex].textContent) + boostUpgradeAmount;
    const boostUpgradeColour = boostUpgradeAmount > 0 ? Constants.BOOST_UPGRADE_VALUE_COLOUR : Constants.ZERO_UPGRADE_VALUE_COLOUR;
    Variables.boostUpgradeValues[attributeIndex].style.color = boostUpgradeColour;
  }

  if (Variables.attributeValues[attributeIndex] != undefined) {
    // attribute value changes
    Variables.attributeValues[attributeIndex].textContent = parseInt(Variables.attributeValues[attributeIndex].textContent) + boostUpgradeAmount;

    // attribute meter changes
    updateAttributeMeter(parseInt(Variables.attributeValues[attributeIndex].textContent), attributeIndex);
  }
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


/**
 * setDisplayItems function used to set/update a display slot for an ability, boost, or main ability
 * @param {number} k index of the unselect button to set/update
 * @param {*} displayName old name of the ability/boost to be updated
 * @param {*} newName name of the new ability/boost that displayName will be set to
 * @param {*} displayDescription old description of the ability to set (will be undefined for boosts since they do not have descriptions)
 * @param {*} newDescription description of the new ability that displayDescription will be set to (will be undefined for boosts since they do not have descriptions)
 * @param {*} displayIcon old icon of the ability/boost to be updated 
 * @param {*} newIcon new icon of the ability/boost that displayIcon will be set to
 * @param {*} displayRequirements old requirement(s) of the ability/boost to be updated (will be undefined for main ability since it does not have requirements as it is build specific already)
 * @param {*} newRequirements new requirement(s) of the ability/boost that displayRequirements will be set to (will be undefined for main ability since it does not have requirements as it is build specific already)
 */
export function setDisplayItem(k, displayName, newName, displayDescription, newDescription, displayIcon, newIcon, displayRequirements, newRequirements) {
  displayName.textContent = newName.textContent;
  displayName.style.fontStyle = "normal";
  displayName.style.fontWeight = "bold";

  if (newDescription != undefined && displayDescription != undefined) {
    displayDescription.textContent = newDescription.textContent;
  }

  displayIcon.textContent = newIcon.textContent;
  displayIcon.style.color = newIcon.style.color;

  if (newRequirements != undefined && displayRequirements != undefined) {
    Object.values(newRequirements).forEach((newRequirement, j) => {
      displayRequirements[j].textContent = newRequirement.textContent;
      displayRequirements[j].style.color = "green";
    });
  }

  Variables.unselectButtons[k].style.display = "inline-block";
}
/**
 * 2022-2023
 * Anthony Liscio
 * 
 * initializers.js
 * 
 *    Used for the functions that "initialize" or set-up parts of the website.
 */

import * as UtilityFunctions from "./utility_functions.js";
import * as Constants from "../variables/constants.js";
import * as Variables from "../variables/global_variables.js";
import * as UpdateFunctions from "./update_functions.js";


/**
 * setMainAbilityOptions function used to set the main abilities based off which build is selected
 * @param {String} buildName the name of the selected build
 */
async function setMainAbilityOptions(buildName) {
  try {
    // for the main_abilities.xml file
    const mainAbilitiesXmlDoc = await UtilityFunctions.fetchFromXMLFile(Constants.MAIN_ABILITIES_XML);
    const builds = mainAbilitiesXmlDoc.childNodes[0];

    let mainBuildsAbilityInfo = Object.values(builds.childNodes).filter(UtilityFunctions.isElementNode);

    // for the abilities.xml file
    const abilitiesXmlDoc = await UtilityFunctions.fetchFromXMLFile(Constants.ABILITIES_XML);
    const abilityGroups = abilitiesXmlDoc.querySelectorAll(Constants.XML_ABILITYGROUP_NODE);

    // main ability names, and ability group names for the selected/current build
    let currentBuildMainAbilityNames, currentBuildMainAbilityGroups;

    // for each main ability
    mainBuildsAbilityInfo.forEach( (build) => {
      // if the current/selected build name is the same as the current build element
      if (buildName == build.querySelector(Constants.XML_BUILDNAME_NODE).textContent) {
        currentBuildMainAbilityNames = build.querySelectorAll(Constants.XML_ABILITY_NAME_NODE);
        currentBuildMainAbilityGroups = build.querySelectorAll(Constants.XML_ABILITYGROUP_NODE);

        // break/return out of the forEach function
        return;
      }
    });

    // if currentBuildMainAbilityNames is not empty (since the previous forEach, shouldn't but could
    // end up never running the code inside the if statement)
    if (currentBuildMainAbilityNames != undefined) {

      // for each ability group
      abilityGroups.forEach(currentAbilityGroup => {
        
        currentBuildMainAbilityNames.forEach((currentMainAbilityName, index) => {
          // set main ability name
          Variables.mainAbilityNames[index].textContent = currentMainAbilityName.textContent;
          Variables.mainAbilityNames[index].style.fontWeight = "bold";

          const currentAbilityGroupName = currentAbilityGroup.querySelector(Constants.XML_GROUPNAME_NODE).textContent;

          // if the current ability's ability group is the same as the currentBuildMainAbilityGroups
          if (currentAbilityGroupName == currentBuildMainAbilityGroups[index].textContent) {

            // each ability from the abilities.xml file
            const abilitiesInfo = currentAbilityGroup.querySelectorAll(Constants.XML_ABILITY_NODE);

            // for each ability
            abilitiesInfo.forEach(currentAbilityInfo => {
              const currentAbilityName = currentAbilityInfo.querySelector(Constants.XML_ABILITY_NAME_NODE).textContent;

              if (currentAbilityName == currentMainAbilityName.textContent) {
                // set main ability icon
                const currentAbilityIcon = currentAbilityInfo.querySelector(Constants.XML_ICON_NAME_NODE).textContent;
                Variables.mainAbilityIcons[index + 1].textContent = currentAbilityIcon;
                Variables.mainAbilityIcons[index + 1].style.color = "rgb(190, 171, 0)";

                // set main ability description
                const currentAbilityDescription = currentAbilityInfo.querySelector(Constants.XML_DESCRIP_NODE).textContent;
                Variables.mainAbilityDescriptions[index].textContent = currentAbilityDescription;
                
                // break/return out of the forEach function 
                return;
              }
            });
          }
        });
      });
    }
  }
  catch (error) {
    console.error(error);
  }
}

/**
 * setAbilityOptions function used to set all the regular ability options with the correct values recieved from the
 * appropriate xml file.
 */
async function setAbilityOptions() {
  try {
    const xmlDoc = await UtilityFunctions.fetchFromXMLFile(Constants.ABILITIES_XML);
    const abilityGroups = xmlDoc.querySelectorAll(Constants.XML_ABILITYGROUP_NODE);

    // indices
    let j = 0;
    let i = 0;

    // values to change
    let abilityIconsSectionOne = document.getElementsByClassName(Constants.ABILITY_SECTION_CLASSNAME)[0].getElementsByClassName(Constants.ICONS_CLASSNAME);
    let abilityIconsSectionTwo = document.getElementsByClassName(Constants.ABILITY_SECTION_CLASSNAME)[1].getElementsByClassName(Constants.ICONS_CLASSNAME);

    const totalAmountOfAbilities = Variables.abilityNames.length;
    const totalAmountOfAbilityRequirements = Variables.abilityRequirements.length;

    // ability info
    const allAbilityInfo = xmlDoc.querySelectorAll(Constants.XML_ABILITY_NODE);

    // filter used to remove the ability "Back At Ya" from this because that ability is only used as a main ability and not a regular ability,
    // like the rest of the abilities are.
    const abilityInfo = Object.values(allAbilityInfo).filter(ability => {
      const validRegularAbility = ability.querySelector(Constants.XML_ABILITY_NAME_NODE).textContent != Constants.XML_BACKATYA_NODE;
      return validRegularAbility;
    });

    // for each ability
    abilityInfo.forEach(currentAbility => {
      // set ability name
      const currentAbilityName = currentAbility.querySelector(Constants.XML_ABILITY_NAME_NODE).textContent;
      Variables.abilityNames[i].textContent = currentAbilityName;
      Variables.abilityNames[i + totalAmountOfAbilities / 2].textContent = currentAbilityName;
      Variables.abilityNames[i].style.fontWeight = "bold";
      Variables.abilityNames[i + totalAmountOfAbilities / 2].style.fontWeight = "bold";

      // set ability icon
      const currentAbilityIcon = currentAbility.querySelector(Constants.XML_ICON_NAME_NODE).textContent;
      abilityIconsSectionOne[i + 1].textContent = currentAbilityIcon;
      abilityIconsSectionTwo[i + 1].textContent = currentAbilityIcon;

      // set ability requirements
      const currentAbilityRequirementsAttributeNames = currentAbility.querySelectorAll(Constants.XML_ATT_NAME_NODE);
      const currentAbilityRequirementsMinimumValues = currentAbility.querySelectorAll(Constants.XML_MIN_VAL_NODE);
      Variables.abilityRequirements[j].textContent = 
        "(requires minimum " + currentAbilityRequirementsMinimumValues[0].textContent + " " + currentAbilityRequirementsAttributeNames[0].textContent + ")";
      Variables.abilityRequirements[j + totalAmountOfAbilityRequirements / 2].textContent = 
        "(requires minimum " + currentAbilityRequirementsMinimumValues[0].textContent + " " + currentAbilityRequirementsAttributeNames[0].textContent + ")";
      Variables.abilityRequirements[j + 1].textContent = 
        "(requires minimum " + currentAbilityRequirementsMinimumValues[1].textContent + " " + currentAbilityRequirementsAttributeNames[1].textContent + ")";
      Variables.abilityRequirements[j + 1 + totalAmountOfAbilityRequirements / 2].textContent = 
        "(requires minimum " + currentAbilityRequirementsMinimumValues[1].textContent + " " + currentAbilityRequirementsAttributeNames[1].textContent + ")";

      // set ability description
      const currentAbilityDescription = currentAbility.querySelector(Constants.XML_DESCRIP_NODE).textContent;
      Variables.abilityDescriptions[i].textContent = currentAbilityDescription;
      Variables.abilityDescriptions[i + totalAmountOfAbilities / 2].textContent = currentAbilityDescription;

      // increment indices
      j += 2;
      i++;
    });
  }
  catch (error) {
    console.error(error);
  }
}

/**
 * setDefaultAttributes function.
 * Used to set the default attributes of the specified buildName on the html attributes table.
 * It fetches the data found in the build_data.xml file.
 * @param {string} buildName 
 */
export async function setupNewBuild(buildName) {
  try {
    const xmlDoc = await UtilityFunctions.fetchFromXMLFile(Constants.BUILD_DATA_XML);
    const builds = xmlDoc.querySelectorAll(Constants.XML_BUILD_NODE);

    // for each build
    for (var build of builds) {

      // get the name of the current build
      const nameValue = build.querySelector(Constants.XML_NAME_NODE).textContent;

      // if the name of the current build matches with the paramaer value, buildName
      if (nameValue === buildName) {

        setDefaultAttributes(build, nameValue);

        // reset the heights
        removeAllHeights();
        addAllHeights();

        setBuildHeights(build);

        setBuildWeights(build);

        setMainAbilityOptions(nameValue);

        setAbilityOptions();
      }
    }

    // apply the necessary changes from the minimum weight and heights to the default weight and height
    UpdateFunctions.applyAttributeChangesFromPhysicalChanges(buildName, Variables.globalPreviousHeight, Variables.globalCurrentHeight, "Height");
    UpdateFunctions.applyAttributeChangesFromPhysicalChanges(buildName, Variables.globalPreviousWeight, Variables.globalCurrentWeight, "Weight");
  }
  catch (error) {
    console.error(error);
  }
}

/**
 * setDefaultAttributes function.
 * Used to set all the default attributes for the specific build
 * @param {node} build the build node
 * @param {string} nameValue the name of the build
 */
function setDefaultAttributes(build, nameValue) {
  console.log(nameValue);
  let attributeIndex = 0;

  // get the default attributes of this build
  const defaultAttributes = build.querySelector(Constants.XML_DEFAULTATT_NODE);

  // attribute sections of this build
  const attributeSections = Object.values(defaultAttributes.childNodes).filter(UtilityFunctions.isElementNode);

  // for each attribute section
  attributeSections.forEach(attributeSection => {
    // the attribute values in the current attribute section
    const attributes = Object.values(attributeSection.childNodes).filter(UtilityFunctions.isElementNode);
    
    // for each attribute
    attributes.forEach(attribute => {
      // set the attribute values
      Variables.attributeValues[attributeIndex].innerHTML = attribute.textContent;
      attributeIndex++;
    });

  });
}

/**
 * fillBoostOptions function used to fill the boost options using the information in the 
 * boosts.xml file.
 */
export async function fillBoostOptions() {
  try {
    const xmlDoc = await UtilityFunctions.fetchFromXMLFile(Constants.BOOSTS_XML);

    // indices
    let j = 0;
    let k = 1;

    // boost icons
    let boostIcons = Variables.boostSection.getElementsByClassName(Constants.ICONS_CLASSNAME);

    // all the boosts
    const boosts = xmlDoc.querySelectorAll(Constants.XML_BOOST_NODE);
    
    // for each boost
    boosts.forEach(boost => {
      const boostInfo = Object.values(boost.childNodes).filter(UtilityFunctions.isElementNode);

      // remove the AttributeMinimum value because it has several more childnodes inside of it
      // so it would be easier/make more sense to remove it from here and include it in its own variable
      const attributeMinimumInfo = boostInfo.splice(3, 1);
      const minimumRequirements = Object.values(attributeMinimumInfo[0].childNodes).filter(UtilityFunctions.isElementNode);

      // fill the boost values (the attribute to upgrade and by how much)
      Variables.boostValues[j].textContent = "+" + boostInfo[1].textContent + " " + boostInfo[0].textContent;   // for the left boost section
      Variables.boostValues[j + Variables.boostValues.length / 2].textContent = "+" + boostInfo[1].textContent + " " + boostInfo[0].textContent;  // for the right boost section

      // fill the boost requirements
      Variables.boostRequirements[j].textContent = "(requires a minimum of " + minimumRequirements[1].textContent + " " + minimumRequirements[0].textContent + ")";
      Variables.boostRequirements[j + Variables.boostValues.length / 2].textContent = "(requires a minimum of " + minimumRequirements[1].textContent + " " + minimumRequirements[0].textContent + ")";

      // fill the boost icons
      boostIcons[k].textContent = boostInfo[3].textContent;
      boostIcons[k + Variables.boostValues.length / 2 + 1].textContent = boostInfo[3].textContent;

      // fill the boost icons colours
      boostIcons[k].style.color = boostInfo[2].textContent;
      boostIcons[k + Variables.boostValues.length / 2 + 1].style.color = boostInfo[2].textContent;

      // increment indices
      j++;
      k++;
    });
  }
  catch (error) {
    console.error(error);
  }
}

/**
 * setBuildWeights function.
 * Used to set the default weight as well as the minimum and maximum values allowed for the
 * specific build.
 * @param {node} build 
 */
function setBuildWeights(build) {
  // set default weight
  var defaultWeight = build.querySelector(Constants.XML_WEIGHT_NODE).querySelector(Constants.XML_DEFAULT_NODE).textContent;
  Variables.weights.value = defaultWeight;

  // minimum and maximum weights
  var minWeight = build.querySelector(Constants.XML_WEIGHT_NODE).querySelector(Constants.XML_MIN_NODE).textContent;
  var maxWeight = build.querySelector(Constants.XML_WEIGHT_NODE).querySelector(Constants.XML_MAX_NODE).textContent;

  // set the minimum and maximum weights for the html input box 
  Variables.weights.min = minWeight;
  Variables.weights.max = maxWeight;

  // make the attribute changes from the minimum weight to the default weight
  Variables.setGlobalPreviousWeight(minWeight);
  Variables.setGlobalCurrentWeight(defaultWeight);
}

/**
 * setBuildHeights function.
 * Used to set the default height for specific build, and only include the height options that are allowed
 * for the specific build.  For example: a sniper can be 5'7, 5'8, 5'9, 5'10, 5'11, 6'0, or 6'1, while the 
 * allowed heights for a power forward are 6'2, 6'3, 6'4, 6'5, 6'6, 6'7.
 * @param {node} build the build node
 */
function setBuildHeights(build) {
  // set default height
  var defaultHeight = build.querySelector(Constants.XML_HEIGHT_NODE).querySelector(Constants.XML_DEFAULT_NODE).textContent;
  Variables.heights.value = defaultHeight;

  // minimum and maximum heights
  var minHeight = UtilityFunctions.convertFeetandInchesToInches(build.querySelector(Constants.XML_HEIGHT_NODE).querySelector(Constants.XML_MIN_NODE).textContent);
  var maxHeight = UtilityFunctions.convertFeetandInchesToInches(build.querySelector(Constants.XML_HEIGHT_NODE).querySelector(Constants.XML_MAX_NODE).textContent);

  // set global weight variables
  Variables.setGlobalPreviousHeight(minHeight);
  Variables.setGlobalCurrentHeight(UtilityFunctions.convertFeetandInchesToInches(defaultHeight));

  // for each height
  Object.values(Variables.heights).forEach((height, index) => {
    const currentHeight = UtilityFunctions.convertFeetandInchesToInches(height.value);
    
    // if the current height is less than the minimum height for the current build then remove it
    // from the options
    if (currentHeight < minHeight) {
      height.remove(index);
    }
    // if the current height is greater than the maximum height for the current build then remove it
    // from the options
    else if (currentHeight > maxHeight) {
      height.remove(index);
    }
  });
}

/**
 * addAllHeights function.
 * Used to add every possible height to the html option select.
 */
function addAllHeights() {
  Constants.ALL_HEIGHTS.forEach(currentHeight => {
    const heightOption = new Option(currentHeight, currentHeight);
    Variables.heights.add(heightOption, undefined);
  });
}

/**
 * removeAllHeights function.
 * Used to remove all the height options in the html option select.
 */
function removeAllHeights() {
  while (Variables.heights.options.length > 0) {
    Variables.heights.remove(0);
  }
}
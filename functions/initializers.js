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
      abilityGroups.forEach( (currentAbilityGroup) => {
        
        currentBuildMainAbilityNames.forEach( (currentMainAbilityName, index) => {
          // set main ability name
          Variables.mainAbilityNames[index].textContent = currentMainAbilityName.textContent;
          Variables.mainAbilityNames[index].style.fontWeight = "bold";

          const currentAbilityGroupName = currentAbilityGroup.querySelector(Constants.XML_GROUPNAME_NODE).textContent;

          // if the current ability's ability group is the same as the currentBuildMainAbilityGroups
          if (currentAbilityGroupName == currentBuildMainAbilityGroups[index].textContent) {

            // each ability from the abilities.xml file
            const abilitiesInfo = currentAbilityGroup.querySelectorAll(Constants.XML_ABILITY_NODE);

            // for each ability
            abilitiesInfo.forEach( (currentAbilityInfo) => {
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

    // for each ability group
    abilityGroups.forEach( (currentAbilityGroup) => {
      let currentAbilityGroupName = currentAbilityGroup.querySelector(Constants.XML_GROUPNAME_NODE).textContent;

      const totalAmountOfAbilities = Variables.abilityNames.length;
      const totalAmountOfAbilityRequirements = Variables.abilityRequirements.length;

      const abilityInfo = currentAbilityGroup.querySelectorAll(Constants.XML_ABILITY_NODE);

      // for each ability
      abilityInfo.forEach( (currentAbility) => {

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
        Variables.abilityRequirements[j].textContent = "(requires minimum " + currentAbilityRequirementsMinimumValues[0].textContent + " " + currentAbilityRequirementsAttributeNames[0].textContent + ")";
        Variables.abilityRequirements[j + totalAmountOfAbilityRequirements / 2].textContent = "(requires minimum " + currentAbilityRequirementsMinimumValues[0].textContent + " " + currentAbilityRequirementsAttributeNames[0].textContent + ")";
        Variables.abilityRequirements[j + 1].textContent = "(requires minimum " + currentAbilityRequirementsMinimumValues[1].textContent + " " + currentAbilityRequirementsAttributeNames[1].textContent + ")";
        Variables.abilityRequirements[j + 1 + totalAmountOfAbilityRequirements / 2].textContent = "(requires minimum " + currentAbilityRequirementsMinimumValues[1].textContent + " " + currentAbilityRequirementsAttributeNames[1].textContent + ")";

        // set ability description
        const currentAbilityDescription = currentAbility.querySelector(Constants.XML_DESCRIP_NODE).textContent;
        Variables.abilityDescriptions[i].textContent = currentAbilityDescription;
        Variables.abilityDescriptions[i + totalAmountOfAbilities / 2].textContent = currentAbilityDescription;

        // increment indices
        j += 2;
        i++;
      });
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
  var attributeIndex = 0;

  // get the default attributes of this build
  var defaultAttributes = build.querySelector(Constants.XML_DEFAULTATT_NODE);

  // amount of child nodes in defaultAttributes (divided by 2 since I am not including all the "text" child nodes)
  var amountOfAttributeSections = Math.floor(defaultAttributes.childNodes.length / 2);

  // for loop for each necessary child node in defaultAttributes (not looping over the "text" nodes which is why j starts
  // at 1 and increments by 2 until it reaches amountOfAttributeSections multiplied by 2)
  for (var j = 1; j < amountOfAttributeSections * 2; j += 2) {

    // get the current attribute section ("Technique", "Power", "Playstyle", "Tenacity", or "Tactics")
    var attributeSection = defaultAttributes.childNodes[j];

    // amount of child nodes in attributeSecton (divided by 2 since I am not including all the "text" child nodes)
    var amountOfAttributesInSection = Math.floor(attributeSection.childNodes.length / 2);

    // for loop for each necessary child node in attributeSection (not looping over the "text" nodes which is why i starts
    // at 1 and increments by 2 until it reaches amountOfAttributesInSection multiplied by 2)
    for (var i = 1; i < amountOfAttributesInSection * 2; i += 2) {

      // set the attribute values
      Variables.attributeValues[attributeIndex].innerHTML = attributeSection.childNodes[i].textContent;

      // increment the attribute index
      attributeIndex++;
    }
  }
}

/**
 * fillBoostOptions function used to fill the boost options using the information in the 
 * boosts.xml file.
 */
export async function fillBoostOptions() {
  try {
    const xmlDoc = await UtilityFunctions.fetchFromXMLFile(Constants.BOOSTS_XML);
    const attributeSections = xmlDoc.childNodes[0];

    var j = 0;
    var k = 1;

    // icons
    var boostsAndAbilityIcons = Variables.boostSection.getElementsByClassName(Constants.ICONS_CLASSNAME);

    // for each attribute section
    for (var i = 1; i < attributeSections.childNodes.length; i+=2) {
      var boosts = attributeSections.childNodes[i].querySelectorAll(Constants.XML_BOOST_NODE);

      // for each boost
      for (var boost of boosts) {
        var boostInfo = Object.values(boost.childNodes).filter(UtilityFunctions.isElementNode);

        // remove the AttributeMinimum value because it has several more childnodes inside of it
        // so it would be easier/make more sense to remove it from here and include it in its own
        // var
        var attributeMinimumInfo = boostInfo.splice(3, 1);
        var minimumRequirements = Object.values(attributeMinimumInfo[0].childNodes).filter(UtilityFunctions.isElementNode);

        // fill the boost values (the attribute to upgrade and by how much)
        Variables.boostValues[j].textContent = "+" + boostInfo[1].textContent + " " + boostInfo[0].textContent;   // for the left boost section
        Variables.boostValues[j + Variables.boostValues.length / 2].textContent = "+" + boostInfo[1].textContent + " " + boostInfo[0].textContent;  // for the right boost section

        // fill the boost requirements
        Variables.boostRequirements[j].textContent = "(requires a minimum of " + minimumRequirements[1].textContent + " " + minimumRequirements[0].textContent + ")";
        Variables.boostRequirements[j + Variables.boostValues.length / 2].textContent = "(requires a minimum of " + minimumRequirements[1].textContent + " " + minimumRequirements[0].textContent + ")";

        // fill the boost icons
        boostsAndAbilityIcons[k].textContent = boostInfo[3].textContent;
        boostsAndAbilityIcons[k + Variables.boostValues.length / 2 + 1].textContent = boostInfo[3].textContent;

        // fill the boost icons colours
        boostsAndAbilityIcons[k].style.color = boostInfo[2].textContent;
        boostsAndAbilityIcons[k + Variables.boostValues.length / 2 + 1].style.color = boostInfo[2].textContent;

        j++;
        k++;
      }

    }

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

  // for each height option
  for (var i = 0; i < Variables.heights.length; i++) {
    var currentHeight = UtilityFunctions.convertFeetandInchesToInches(Variables.heights[i].value);

    // if the current height is less than the minimum height for the current build then remove it
    // from the options
    if (currentHeight < minHeight) {
      Variables.heights[i].remove(i);
      i--;
    }
    // if the current height is greater than the maximum height for the current build then remove it
    // from the options
    else if (currentHeight > maxHeight) {
      Variables.heights[i].remove(i);
      i--;
    }
  }
}

/**
 * addAllHeights function.
 * Used to add every possible height to the html option select.
 */
function addAllHeights() {
  for (var i = 0; i < Constants.ALL_HEIGHTS.length; i++) {
    var heightOption = new Option(Constants.ALL_HEIGHTS[i], Constants.ALL_HEIGHTS[i]);
    Variables.heights.add(heightOption, undefined);
  }
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
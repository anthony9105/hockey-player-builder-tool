import * as UtilityFunctions from "./utility_functions.js";
import * as Constants from "./constants.js";
import * as Variables from "./global_variables.js";
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
    const abilityGroups = abilitiesXmlDoc.querySelectorAll("AbilityGroup");

    // main ability names, and ability group names for the selected/current build
    let currentBuildMainAbilityNames, currentBuildMainAbilityGroups;

    // values to change
    let abilityNames = document.getElementsByClassName("main-ability-name");
    let mainAbilityIcons = document.getElementById("main-ability-section").getElementsByClassName("material-icons");
    let mainAbilityDescriptions = document.getElementsByClassName("main-ability-description");

    // for each main ability
    mainBuildsAbilityInfo.forEach( (build) => {
      // if the current/selected build name is the same as the current build element
      if (buildName == build.querySelector("BuildName").textContent) {
        currentBuildMainAbilityNames = build.querySelectorAll("AbilityName");
        currentBuildMainAbilityGroups = build.querySelectorAll("AbilityGroup");

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
          abilityNames[index].textContent = currentMainAbilityName.textContent;
          abilityNames[index].style.fontWeight = "bold";

          const currentAbilityGroupName = currentAbilityGroup.querySelector("GroupName").textContent;

          // if the current ability's ability group is the same as the currentBuildMainAbilityGroups
          if (currentAbilityGroupName == currentBuildMainAbilityGroups[index].textContent) {

            // each ability from the abilities.xml file
            const abilitiesInfo = currentAbilityGroup.querySelectorAll("Ability");

            // for each ability
            abilitiesInfo.forEach( (currentAbilityInfo) => {
              const currentAbilityName = currentAbilityInfo.querySelector("AbilityName").textContent;

              if (currentAbilityName == currentMainAbilityName.textContent) {
                // set main ability icon
                const currentAbilityIcon = currentAbilityInfo.querySelector("IconName").textContent;
                mainAbilityIcons[index + 1].textContent = currentAbilityIcon;
                mainAbilityIcons[index + 1].style.color = "rgb(190, 171, 0)";

                // set main ability description
                const currentAbilityDescription = currentAbilityInfo.querySelector("Description").textContent;
                mainAbilityDescriptions[index].textContent = currentAbilityDescription;
                
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
    const abilityGroups = xmlDoc.querySelectorAll("AbilityGroup");

    // indices
    let j = 0;
    let i = 0;

    // values to change
    let abilityNames = document.getElementsByClassName("ability-name");
    let abilityIconsSectionOne = document.getElementsByClassName("ability-section")[0].getElementsByClassName("material-icons");
    let abilityIconsSectionTwo = document.getElementsByClassName("ability-section")[1].getElementsByClassName("material-icons");
    let abilityDescriptions = document.getElementsByClassName("ability-description");
    let abilityRequirements = document.getElementsByClassName("ability-requirement");

    // for each ability group
    abilityGroups.forEach( (currentAbilityGroup) => {
      let currentAbilityGroupName = currentAbilityGroup.querySelector("GroupName").textContent;

      const totalAmountOfAbilities = abilityNames.length;
      const totalAmountOfAbilityRequirements = abilityRequirements.length;

      const abilityInfo = currentAbilityGroup.querySelectorAll("Ability");

      // for each ability
      abilityInfo.forEach( (currentAbility) => {

        // set ability name
        const currentAbilityName = currentAbility.querySelector("AbilityName").textContent;
        abilityNames[i].textContent = currentAbilityName;
        abilityNames[i + totalAmountOfAbilities / 2].textContent = currentAbilityName;
        abilityNames[i].style.fontWeight = "bold";
        abilityNames[i + totalAmountOfAbilities / 2].style.fontWeight = "bold";

        // set ability icon
        const currentAbilityIcon = currentAbility.querySelector("IconName").textContent;
        abilityIconsSectionOne[i + 1].textContent = currentAbilityIcon;
        abilityIconsSectionTwo[i + 1].textContent = currentAbilityIcon;

        // set ability requirements
        const currentAbilityRequirementsAttributeNames = currentAbility.querySelectorAll("AttributeName");
        const currentAbilityRequirementsMinimumValues = currentAbility.querySelectorAll("MinimumValue");
        abilityRequirements[j].textContent = "(requires minimum " + currentAbilityRequirementsMinimumValues[0].textContent + " " + currentAbilityRequirementsAttributeNames[0].textContent + ")";
        abilityRequirements[j + totalAmountOfAbilityRequirements / 2].textContent = "(requires minimum " + currentAbilityRequirementsMinimumValues[0].textContent + " " + currentAbilityRequirementsAttributeNames[0].textContent + ")";
        abilityRequirements[j + 1].textContent = "(requires minimum " + currentAbilityRequirementsMinimumValues[1].textContent + " " + currentAbilityRequirementsAttributeNames[1].textContent + ")";
        abilityRequirements[j + 1 + totalAmountOfAbilityRequirements / 2].textContent = "(requires minimum " + currentAbilityRequirementsMinimumValues[1].textContent + " " + currentAbilityRequirementsAttributeNames[1].textContent + ")";

        // set ability description
        const currentAbilityDescription = currentAbility.querySelector("Description").textContent;
        abilityDescriptions[i].textContent = currentAbilityDescription;
        abilityDescriptions[i + totalAmountOfAbilities / 2].textContent = currentAbilityDescription;

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
    const builds = xmlDoc.querySelectorAll("Build");

    // for each build
    for (var build of builds) {

      // get the name of the current build
      const nameValue = build.querySelector("Name").textContent;

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
  var defaultAttributes = build.querySelector("DefaultAttributes");

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
 * setBuildWeights function.
 * Used to set the default weight as well as the minimum and maximum values allowed for the
 * specific build.
 * @param {node} build 
 */
function setBuildWeights(build) {
  // set default weight
  var defaultWeight = build.querySelector("Weight").querySelector("default").textContent;
  Variables.weights.value = defaultWeight;

  // minimum and maximum weights
  var minWeight = build.querySelector("Weight").querySelector("minimum").textContent;
  var maxWeight = build.querySelector("Weight").querySelector("maximum").textContent;

  // set the minimum and maximum weights for the html input box 
  Variables.weights.min = minWeight;
  Variables.weights.max = maxWeight;

  // make the attribute changes from the minimum weight to the default weight
  Variables.setGlobalPreviousWeight(minWeight);
  Variables.setGlobalCurrentWeight(defaultWeight);
}


/**
 * getUpgradePointChange function.
 * Used to get the upgrade point change, so that the available upgrade points
 * can be updated.
 * @param {number} i - index of the current attribute 
 * @returns upgradePointChange
 */
async function getUpgradePointChange(i) {
  var upgradePointChange = 0;

  try {
    const response = await fetch(Constants.UPGRADE_POINTS_XML);
    const xmlString = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");
    const attributeCosts = xmlDoc.querySelector("AttributeCosts");

    var indexModifier = 0;
    var currentUpgradeModifier = parseInt(Variables.upgradeValues[i].innerHTML);

    if (currentUpgradeModifier > 0) {
      indexModifier = 4;
    }
    else {
      indexModifier = 5;
    }

    // upgradeDowngradeIndex.  For example plus1 upgrade starts at index 4, so that is why the + 4 is there.
    // upgradeDowngradeIndex + (upgradeDowngradeIndex + 1) because there are childnodes which are #text so this will account for
    // this and avoid them.
    var upgradeDowngradeIndex = currentUpgradeModifier + indexModifier;
    upgradeDowngradeIndex = upgradeDowngradeIndex + (upgradeDowngradeIndex + 1);

    // childnodes index
    var j = i + (i + 1);
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
  }
  catch (error) {
    console.error(error);
  }

  Variables.previousUpgradeModifier[i] = currentUpgradeModifier;
  return upgradePointChange;
}

/**
 * fillBoostOptions function used to fill the boost options using the information in the 
 * boosts.xml file.
 */
export async function fillBoostOptions() {
  try {
    const response = await fetch(Constants.BOOSTS_XML);
    const xmlString = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");
    const attributeSections = xmlDoc.childNodes[0];

    var j = 0;
    //var k = indexOfFirstRegularBoostIcon;
    var k = 1;

    // all html boost values, boost requirements, and icons
    var boostValues = document.getElementsByClassName("boost-item-value");
    var boostRequirements = document.getElementsByClassName("boost-item-requirement");

    var boostSection = document.getElementById("boosts-row");
    var boostsAndAbilityIcons = boostSection.getElementsByClassName("material-icons");

    // for each attribute section
    for (var i = 1; i < attributeSections.childNodes.length; i+=2) {
      var boosts = attributeSections.childNodes[i].querySelectorAll("Boost");

      // for each boost
      for (var boost of boosts) {
        var boostInfo = Object.values(boost.childNodes).filter(UtilityFunctions.isElementNode);

        // remove the AttributeMinimum value because it has several more childnodes inside of it
        // so it would be easier/make more sense to remove it from here and include it in its own
        // var
        var attributeMinimumInfo = boostInfo.splice(3, 1);
        var minimumRequirements = Object.values(attributeMinimumInfo[0].childNodes).filter(UtilityFunctions.isElementNode);

        // fill the boost values (the attribute to upgrade and by how much)
        boostValues[j].textContent = "+" + boostInfo[1].textContent + " " + boostInfo[0].textContent;   // for the left boost section
        boostValues[j + boostValues.length / 2].textContent = "+" + boostInfo[1].textContent + " " + boostInfo[0].textContent;  // for the right boost section

        // fill the boost requirements
        boostRequirements[j].textContent = "(requires a minimum of " + minimumRequirements[1].textContent + " " + minimumRequirements[0].textContent + ")";
        boostRequirements[j + boostValues.length / 2].textContent = "(requires a minimum of " + minimumRequirements[1].textContent + " " + minimumRequirements[0].textContent + ")";

        // fill the boost icons
        boostsAndAbilityIcons[k].textContent = boostInfo[3].textContent;
        boostsAndAbilityIcons[k + boostValues.length / 2 + 1].textContent = boostInfo[3].textContent;

        // fill the boost icons colours
        boostsAndAbilityIcons[k].style.color = boostInfo[2].textContent;
        boostsAndAbilityIcons[k + boostValues.length / 2 + 1].style.color = boostInfo[2].textContent;

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
 * HEIGHT FUNCTIONS
 */
/**
 * setBuildHeights function.
 * Used to set the default height for specific build, and only include the height options that are allowed
 * for the specific build.  For example: a sniper can be 5'7, 5'8, 5'9, 5'10, 5'11, 6'0, or 6'1, while the 
 * allowed heights for a power forward are 6'2, 6'3, 6'4, 6'5, 6'6, 6'7.
 * @param {node} build the build node
 */
function setBuildHeights(build) {
  // set default height
  var defaultHeight = build.querySelector("Height").querySelector("default").textContent;
  Variables.heights.value = defaultHeight;

  // minimum and maximum heights
  var minHeight = UtilityFunctions.convertFeetandInchesToInches(build.querySelector("Height").querySelector("minimum").textContent);
  var maxHeight = UtilityFunctions.convertFeetandInchesToInches(build.querySelector("Height").querySelector("maximum").textContent);

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
/**
 * 2022-2023
 * Anthony Liscio
 */

import {buildDataXMLFileName, upgradePointsXMLFileName, physUpgradeDowngradeFileName, 
  boostsXMLFileName, allHeights, allAttributeNamesInOrder, numOfAttributeSections, pointsAvailValueClassName,
  boostInfoNodeNames, indexOfFirstRegularBoostIcon, mainAbilitiesXMLFileName, abilitiesXMLFileName, abilityOptionSectionIdNames} from "./constants.js";

var availableUpgradePoints = [0, 0, 0, 0, 0];
var previousUpgradeModifier = new Array(23).fill(0);

var globalPreviousHeight;
var globalPreviousWeight;
var globalCurrentHeight;
var globalCurrentWeight;


var boostPreviousDropdown = [false];
var boostButtonSelected = [false];
var abilityPreviousDropdown = {
  previousDropdownOpen: false,
  dropdownSectionIndex: -1,
}

/**
 * hideOrRevealDropdown function which hides or reveals the dropdown (whichever is appropriate)
 * @param {Object} dropdownContent the dropdown content to hide/reveal
 * @param {Number} i the index of the dropdownContent Object to hide/reveal
 */
function hideOrRevealDropdown(dropdownContent, i) {
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
function hideDropdown(dropdownContent, i) {
  dropdownContent[i].style.display = "none";
}

/**
 * revealDropdown function which reveals the dropdown
 * @param {Object} dropdownContent the dropdown content to reveal
 * @param {Number} i the index of the dropdownContent to reveal 
 */
function revealDropdown(dropdownContent, i) {
  dropdownContent[i].style.display = "flex";
  dropdownContent[i].style.overflow = "hidden";
}

/**
 * boostDropdownButtonListeners function used to add event listeners for each "Boost" button.
 * The event listener here is used to hide/reveal the next dropdown section (with the 5 attribute
 * section buttons below) when the "Boost" button is clicked.
 * @param {Object} boostDropdownButtons all the "Boost" buttons
 */
function boostDropdownButtonListeners(boostDropdownButtons) {
  for (let i=0; i < boostDropdownButtons.length; i++) {
    boostDropdownButtons[i].addEventListener("click", function() {
      // hide main ability content (if it isn't already hidden)
      hideMainAbilityDropdownContent();

      // dropdown which opens underneath the "Boost" buttons and is the 5 buttons for each attribute section
      var attributeSectionBoostContent = document.getElementsByClassName("boost-buttons-content");

      // boost dropdown content which opens underneath the attributeSectionBoostContent buttons 
      var boostDropdownContent = document.getElementsByClassName("boost-dropdown-content");

      // hide/reveal the dropdown
      hideOrRevealDropdown(attributeSectionBoostContent, i);

      // if there was a previous dropdown that is currently open/visible.  Hide it
      if (boostPreviousDropdown[0]) {
        for (var k = 1; k < boostPreviousDropdown.length; k++) {
          // hide the boost dropdown (the boost options)
          hideDropdown(boostDropdownContent, boostPreviousDropdown[k]);

          // hide the boost button dropdown (the dropdown with the "Technique", "Power", etc buttons)
          let boostContent = boostDropdownContent[boostPreviousDropdown[k]];
          let boostButtonsDropdown = boostContent.parentElement.getElementsByClassName("boost-buttons-content");
          hideDropdown(boostButtonsDropdown, 0); // 0 because there is only 1 element in boostButtonsDropdown
          
        }

        // reset boostPreviousDropdown
        boostPreviousDropdown = [false];
      }

    });
  }
}

/**
 * attributeSectionBoostDropdownButtons function used to add event listeners for each attribute section
 * button. The event listener here is used to hide/reveal the boosts corresponding to which attribute
 * section button is clicked.
 * @param {Object} attributeSectionBoostDropdownButtons all the 5 attribute section buttons (which
 * appear below the "Boost" buttons)  
 */
function attributeSectionBoostDropdownButtonListeners(attributeSectionBoostDropdownButtons) {
  for (let i=0; i < attributeSectionBoostDropdownButtons.length; i++) {
    attributeSectionBoostDropdownButtons[i].addEventListener("click", function() {

      // boost dropdown content which opens underneath the attributeSectionBoostContent buttons 
      var boostDropdownContent = document.getElementsByClassName("boost-dropdown-content");

      // variable for if the same attribute section button was just pressed previously
      var sameButtonPressed = boostPreviousDropdown[1] == i;

      // if there was a previous dropdown that is currently open/visible.  Hide it
      if (boostPreviousDropdown[0]) {
        hideDropdown(boostDropdownContent, boostPreviousDropdown[1]);

        // reset boostPreviousDropdown
        boostPreviousDropdown = [false];
      }

      // if the same button was not just previously pressed and the content is currently hidden
      if (!sameButtonPressed && (boostDropdownContent[i].style.display === "none" || boostDropdownContent[i].style.display == "")) {
        revealDropdown(boostDropdownContent, i);
        boostPreviousDropdown[0] = true;
        boostPreviousDropdown[1] = i;
      }
      else {
        hideDropdown(boostDropdownContent, i);
        boostPreviousDropdown = [false];
      }

    });
  }
}


/**
 * abilityButtonListeners function used to add event listeners for each ability button.
 * These event listeners reveal/hide the dropdown content when the corresponding ability
 * button clicked.
 * @param {Object} abilityButtons all the ability buttons
 */
function abilityButtonListeners(abilityButtons) {
  for (let i=0; i < abilityButtons.length; i++) {
    abilityButtons[i].addEventListener("click", function() {

      var abilityContentSection = document.getElementsByClassName("ability-dropdown-section");

      // for the main ability dropdown button
      if (i == 1) {
        var mainAbilityDropdownContent = document.getElementById("main-ability-section").getElementsByClassName("dropdown-content");

        for (var k = 0; k < mainAbilityDropdownContent.length; k++) {
          hideOrRevealDropdown(mainAbilityDropdownContent, k);
        }
      }
      // for the regular ability dropdown buttons
      else {
        // hide main ability content (if it isn't already hidden)
        hideMainAbilityDropdownContent();

        var abilityButtonDropdown = document.getElementsByClassName("ability-section")[i - i/2].getElementsByClassName("ability-button-content");

        hideOrRevealDropdown(abilityButtonDropdown, 0);
      }

      // if there was a previous dropdown that is currently open/visible.  Hide it
      if (abilityPreviousDropdown.previousDropdownOpen && abilityPreviousDropdown.dropdownSectionIndex != -1) {

        var abilityContentDropdown = abilityContentSection[abilityPreviousDropdown.dropdownSectionIndex].getElementsByClassName("dropdown-content");
        for (var k = 0; k < abilityContentDropdown.length; k++) {
          hideDropdown(abilityContentDropdown, k);
        }

        // reset abilityPreviousDropdown
        abilityPreviousDropdown.previousDropdownOpen = false;
        abilityPreviousDropdown.dropdownSectionIndex = -1;
      }
      
    });
  }

}

/**
 * hideMainAbilityDropdownContent function used to hide the main ability dropdown content (if it is not already hidden)
 */
function hideMainAbilityDropdownContent() {
  let mainAbilityDropdownContent = document.getElementsByClassName("main-ability-dropdown-section")[0].getElementsByClassName("dropdown-content");

  for (let i = 0; i < mainAbilityDropdownContent.length; i++) {
    if (mainAbilityDropdownContent[i].style.display !== "none" && mainAbilityDropdownContent[i].style.display != "") {
      mainAbilityDropdownContent[i].style.display = "none";
    }
  }
}

/**
 * abilityButtonContentListeners function used to add event listeners for each ability content section buttons
 * @param {Object} abilityContentButtons the "Offense", "Defense", "Athleticism" buttons used to reveal ablities
 * for the appropriate section.
 */
function abilityButtonContentListeners(abilityContentButtons) {
  for (let i = 0; i < abilityContentButtons.length; i++) {
    abilityContentButtons[i].addEventListener("click", function() {

      // variable for if the same attribute section button was just pressed previously
      let sameButtonPressed = abilityPreviousDropdown.dropdownSectionIndex == i;

      // var dropdownSection = document.getElementById(dropdownIdName);
      let dropdownSection = document.getElementsByClassName("ability-dropdown-section")[i];
      let dropdownsToHideOrReveal = dropdownSection.getElementsByClassName("dropdown-content");

      // if there was a previous dropdown that is currently open/visible.  Hide it
      if (abilityPreviousDropdown.previousDropdownOpen && abilityPreviousDropdown.dropdownSectionIndex != -1) {

        let previousAbilityDropdownSection = document.getElementsByClassName("ability-dropdown-section")[abilityPreviousDropdown.dropdownSectionIndex];
        let previousContentToHide = previousAbilityDropdownSection.getElementsByClassName("dropdown-content");

        for (let k = 0; k < previousContentToHide.length; k++) {
          hideDropdown(previousContentToHide, k);
        }

        // reset abilityPreviousDropdown
        abilityPreviousDropdown.previousDropdownOpen = false;
        abilityPreviousDropdown.dropdownSectionIndex = -1;
      }

      for (let j = 0; j < dropdownsToHideOrReveal.length; j++) {
        // if the same button was not just previously pressed and the content is currently hidden
        if (!sameButtonPressed && (dropdownsToHideOrReveal[j].style.display === "none" || dropdownsToHideOrReveal[j].style.display == "")) {
          revealDropdown(dropdownsToHideOrReveal, j);
          abilityPreviousDropdown.previousDropdownOpen = true;
          abilityPreviousDropdown.dropdownSectionIndex = i;
        }
        else {
          hideDropdown(dropdownsToHideOrReveal, j);
          abilityPreviousDropdown.previousDropdownOpen = false;
          abilityPreviousDropdown.dropdownSectionIndex = -1;
        }
      }

    });
  }
}

var abilityContentButtons = document.getElementsByClassName("ability-dropdownbutton");
abilityButtonContentListeners(abilityContentButtons);

/**
 * isElementNode function used to return the node only if
 * the node is an element node.  (The purpose of this is to
 * not include #text childNodes).
 * 
 * Used with the filter function.
 * @param {Object} node 
 * @returns node or nothing
 */
function isElementNode(node) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    return node;
  }
  else {
    return;
  }
}

// for when the ability buttons and boost buttons are pressed
var abilityButtons = document.getElementsByClassName("dropdownbutton");
var boostDropdownButtons = document.getElementsByClassName("main-boost-dropdownbutton");
var attributeSectionBoostDropdownButtons = document.getElementsByClassName("boost-dropdownbutton");

abilityButtonListeners(abilityButtons);
boostDropdownButtonListeners(boostDropdownButtons);
attributeSectionBoostDropdownButtonListeners(attributeSectionBoostDropdownButtons);


/**
 * fillBoostOptions function used to fill the boost options using the information in the 
 * boosts.xml file.
 */
async function fillBoostOptions() {
  try {
    const response = await fetch(boostsXMLFileName);
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
        var boostInfo = Object.values(boost.childNodes).filter(isElementNode);

        // remove the AttributeMinimum value because it has several more childnodes inside of it
        // so it would be easier/make more sense to remove it from here and include it in its own
        // var
        var attributeMinimumInfo = boostInfo.splice(3, 1);
        var minimumRequirements = Object.values(attributeMinimumInfo[0].childNodes).filter(isElementNode);

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

var boostsAndAbilityIcons = document.getElementsByClassName("material-icons");
boostsAndAbilityIcons[0].textContent = "healing";

fillBoostOptions();

/**
 * setMainAbilityOptions function used to set the main abilities based off which build is selected
 * @param {String} buildName the name of the selected build
 */
async function setMainAbilityOptions(buildName) {
  try {
    // for the main_abilities.xml file
    const mainAbilitiesXmlDoc = await fetchFromXMLFile(mainAbilitiesXMLFileName);
    const builds = mainAbilitiesXmlDoc.childNodes[0];

    let mainBuildsAbilityInfo = Object.values(builds.childNodes).filter(isElementNode);

    // for the abilities.xml file
    const abilitiesXmlDoc = await fetchFromXMLFile(abilitiesXMLFileName);
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
 * fetchFromXMLFile function used to fetch and return the "Document"
 * from the specific XML file provided.  This way the needed information
 * can be used from the XML file in various different areas.
 * @param {String} filePath 
 * @returns Document (or undefined if fetch was unsuccessful)
 */
async function fetchFromXMLFile(filePath) {
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
 * setAbilityOptions function used to set all the regular ability options with the correct values recieved from the
 * appropriate xml file.
 */
async function setAbilityOptions() {
  try {
    const xmlDoc = await fetchFromXMLFile(abilitiesXMLFileName);
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
function setupNewBuild(buildName) {

  // fetching from the build_data.xml file
  fetch(buildDataXMLFileName).then(response => {
    return response.text();
  }).then(xmlString => {
    var xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");
    var builds = xmlDoc.querySelectorAll("Build");

    // for each build
    for (var build of builds) {

      // get the name of the current build
      var nameValue = build.querySelector("Name").textContent;

      // if the name of the current build matches with the paramaer value, buildName
      if (nameValue === buildName) {

        setDefaultAttributes(build, nameValue);

        // reset the heights
        resetHeights();

        setBuildHeights(build);

        setBuildWeights(build);

        setMainAbilityOptions(nameValue);

        setAbilityOptions();
      }
    }

    // apply the necessary changes from the minimum weight and heights to the default weight and height
    applyAttributeChangesFromPhysicalChanges(buildName, globalPreviousHeight, globalCurrentHeight, "Height");
    applyAttributeChangesFromPhysicalChanges(buildName, globalPreviousWeight, globalCurrentWeight, "Weight");
  });
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

  let attributeValues = document.getElementsByClassName("attribute-value");

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
      attributeValues[attributeIndex].innerHTML = attributeSection.childNodes[i].textContent;

      // increment the attribute index
      attributeIndex++;
    }
  }
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
  var defaultHeight = build.querySelector("Height").querySelector("default").textContent;
  document.getElementById('height-selection').value = defaultHeight;

  // minimum and maximum heights
  var minHeight = convertFeetandInchesToInches(build.querySelector("Height").querySelector("minimum").textContent);
  var maxHeight = convertFeetandInchesToInches(build.querySelector("Height").querySelector("maximum").textContent);

  // set global weight variables
  globalPreviousHeight = minHeight;
  globalCurrentHeight = convertFeetandInchesToInches(defaultHeight);

  var heights = document.getElementById('height-selection');

  // for each height option
  for (var i = 0; i < heights.length; i++) {
    var currentHeight = convertFeetandInchesToInches(heights[i].value);

    // if the current height is less than the minimum height for the current build then remove it
    // from the options
    if (currentHeight < minHeight) {
      heights[i].remove(i);
      i--;
    }
    // if the current height is greater than the maximum height for the current build then remove it
    // from the options
    else if (currentHeight > maxHeight) {
      heights[i].remove(i);
      i--;
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
  document.getElementById('weight-selection').value = defaultWeight;

  // minimum and maximum weights
  var minWeight = build.querySelector("Weight").querySelector("minimum").textContent;
  var maxWeight = build.querySelector("Weight").querySelector("maximum").textContent;

  // set the minimum and maximum weights for the html input box 
  var weight = document.getElementById("weight-selection");
  weight.min = minWeight;
  weight.max = maxWeight;

  // make the attribute changes from the minimum weight to the default weight
  globalPreviousWeight = minWeight;
  globalCurrentWeight = defaultWeight;
}

/**
 * addAllHeights function.
 * Used to add every possible height to the html option select.
 */
function addAllHeights() {
  var heights = document.getElementById('height-selection');

  for (var i = 0; i < allHeights.length; i++) {
    var heightOption = new Option(allHeights[i], allHeights[i]);
    heights.add(heightOption, undefined);
  }
}

/**
 * removeAllHeights function.
 * Used to remove all the height options in the html option select.
 */
function removeAllHeights() {
  var heights = document.getElementById('height-selection');

  while (heights.options.length > 0) {
    heights.remove(0);
  }
}

/**
 * resetHeights function.
 * Used to reset the heights on the html option select for heights.
 * (Used when changing to a new build).
 */
function resetHeights() {
  removeAllHeights();
  addAllHeights();
}

/**
 * convertFeetAndInchesToCm function.
 * Used to convert imperial height (feet and inches) into
 * centimetres.
 * @param {string} imperialHeight height in feet and inches. (Example: 5'11)
 * @returns height in cm (centimetres)
 */
function convertFeetAndInchesToCm(imperialHeight) {
  var feet = imperialHeight[0];

  var inches = "";
  for (var i = 2; i < imperialHeight.length; i++) {
    inches += imperialHeight[i];
  }
  inches = parseInt(inches);

  return (feet * 30.48) + (inches * 2.54);
}

/**
 * convertCmToFeetandInches function.
 * Used to convert metric height (cm) to feet and inches
 * @param {string} metricHeight height in cm
 * @returns imperial height (height in feet and inches)
 */
function convertCmToFeetandInches(metricHeight) {
  var inches = metricHeight / 2.54;
  var feet = Math.floor(inches / 12);
  inches = Math.round(inches - (12 * feet));

  var result = "";
  result += feet + "'" + inches; 

  return result;
}

/**
 * convertFeetandInchesToInches function.
 * Used to convert imperial height (feet and inches) to just inches.
 * @param {string} imperialHeight height in feet and inches
 * @returns height in inches
 */
function convertFeetandInchesToInches(imperialHeight) {
  var feet = parseInt(imperialHeight[0]);

  var inches = "";
  for (var i = 2; i < imperialHeight.length; i++) {
    inches += imperialHeight[i];
  }
  inches = parseInt(inches);

  return (12 * feet) + inches;
}

/**
 * convertInchesToFeetAndInches function.
 * Used to convert height in inches to height in feet and inches 
 * @param {number} inches 
 * @returns imperial height (height in feet and inches)
 */
function convertInchesToFeetAndInches(inches) {
  var feet = Math.floor(inches / 12);
  var inches = inches - (12 * 5);

  return feet + "'" + inches;
}

/**
 * resetUpgrades function.
 * Used to reset the upgrades that may have been previously done to a build.
 */
function resetUpgrades() {
  var upgradeSection = document.getElementsByClassName('upgrade-option-default');

  for (var i = 0; i < upgradeSection.length; i++) {
    upgradeSection[i].innerHTML = 0;
    upgradeSection[i].style.color = 'lightgray';
  }
}

// When the confirm player build button is clicked 
let confirmPlayerTypeButton = document.getElementById("confirm-player-type-button");

confirmPlayerTypeButton.addEventListener('click', function(){
  var playerBuild = document.getElementById("player-type-selection");

  // set the default attributes to the html table
  setupNewBuild(playerBuild.value);

  // reset the upgrades
  resetUpgrades();
});



// When the confirm height button is clicked 
let confirmHeightButton = document.getElementById("confirm-height-button");
confirmHeightButton.addEventListener('click', function(){
  
  // set global variables for previous and current heights
  globalPreviousHeight = globalCurrentHeight;
  globalCurrentHeight = convertFeetandInchesToInches(document.getElementById("height-selection").value);

  let playerBuildType = document.getElementById("player-type-selection").value;

  applyAttributeChangesFromPhysicalChanges(playerBuildType, globalPreviousHeight, globalCurrentHeight, "Height");
})


// When the confirm weight button is clicked 
let confirmWeightButton = document.getElementById("confirm-weight-button");
confirmWeightButton.addEventListener('click', function(){

  // set global variables for previous and current weights
  globalPreviousWeight = globalCurrentWeight;
  globalCurrentWeight = document.getElementById("weight-selection").value;

  let playerBuildType = document.getElementById("player-type-selection").value;

  applyAttributeChangesFromPhysicalChanges(playerBuildType, globalPreviousWeight, globalCurrentWeight, "Weight");
})


/**
 * changeUpgradeOptionColour function.
 * Used to change upgrade display colour based on if it is positive (green), negative (red),
 * or zero (lightgray).
 * @param {number} i the index of the attribute
 */
function changeUpgradeOptionColour(i) {
  var attributeModifier = document.getElementsByClassName('upgrade-value');
  if (attributeModifier[i].innerHTML > 0) {
    attributeModifier[i].style.color = 'green';
  }
  else if (attributeModifier[i].innerHTML == 0) {
    attributeModifier[i].style.color = '#3a379c';
  }
  else {
    attributeModifier[i].style.color = 'red';
  }
}

/**
 * updateAvailableUpgradePoints function.
 * Used to update the available upgrade points for the appropriate attribute section.
 * @param {number} availUpgradePts the new available attribute points
 * @param {number} i the index of the available upgrade points to update
 */
function updateAvailableUpgradePoints(availUpgradePts, i) {
  let availablePointsValues = document.getElementsByClassName(pointsAvailValueClassName);

  availablePointsValues[i].innerHTML = availUpgradePts;
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
    const response = await fetch(upgradePointsXMLFileName);
    const xmlString = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");
    const attributeCosts = xmlDoc.querySelector("AttributeCosts");

    var indexModifier = 0;
    var currentUpgradeModifier = parseInt(document.getElementsByClassName('upgrade-value')[i].innerHTML);

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

    if (previousUpgradeModifier[i] > 0 && currentUpgradeModifier < previousUpgradeModifier[i]) {
      upgradeDowngradeIndex = previousUpgradeModifier[i] + indexModifier;
      upgradeDowngradeIndex = upgradeDowngradeIndex + (upgradeDowngradeIndex + 1);
      upgradePointChange = parseInt(attributeCosts.childNodes[j].childNodes[upgradeDowngradeIndex].textContent);
      upgradePointChange *= -1;
    }
    else if (previousUpgradeModifier[i] < 0 && currentUpgradeModifier > previousUpgradeModifier[i] && currentUpgradeModifier != 0) {
      upgradeDowngradeIndex = previousUpgradeModifier[i] + indexModifier;
      upgradeDowngradeIndex = upgradeDowngradeIndex + (upgradeDowngradeIndex + 1);
      upgradePointChange = parseInt(attributeCosts.childNodes[j].childNodes[upgradeDowngradeIndex].textContent);
      upgradePointChange *= -1;
    }
  }
  catch (error) {
    console.error(error);
  }

  previousUpgradeModifier[i] = currentUpgradeModifier;
  return upgradePointChange;
}

/**
 * applyAttributeChangesFromPhysicalChanges function.
 * Used to apply the necessary attribute changes when a new build is created and whenever
 * the height is changed.
 * @param {string} buildName name of the build
 * @param {number} previous previous height in inches or previous weight in lbs
 * @param {number} current current height in inches or current weight in lbs
 * @param {string} physicalAspect string keyword which is either "Height" or "Weight"
 */
function applyAttributeChangesFromPhysicalChanges(buildName, previous, current, physicalAspect) {
  // fetching from the physical_upgrade_downgrade.xml file
  fetch(physUpgradeDowngradeFileName).then(response => {
    return response.text();
  }).then(xmlString => {
    var xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");
    var builds = xmlDoc.querySelectorAll("Build");
    console.log(document.getElementsByClassName('attribute-value').length);

    let attributeValues = document.getElementsByClassName("attribute-value");

    // for each build
    for (var build of builds) {

      // get the name of the current build
      var nameValue = build.querySelector("Name").textContent;

      // if the name of the current build matches with the paramater value, buildName
      if (nameValue === buildName) {
        var physicals = build.querySelectorAll(physicalAspect);

        for (var i = 0; i < physicals.length; i++) {

          var currentXmlAmount = physicals[i].querySelector("value").textContent;

          if (physicalAspect == "Height") {
            currentXmlAmount = convertFeetandInchesToInches(physicals[i].querySelector("value").textContent);
          }

          // going up height/weight
          if (current > previous) {
            if (current >= currentXmlAmount && previous <= currentXmlAmount) {

              var isValid = false;

              if (previous < currentXmlAmount && current >= currentXmlAmount) {
                isValid = true;
              }

              if (isValid) {
                // apply upgrades/downgrades
                for (var j = 3; j < physicals[i].childNodes.length; j += 2) {
                  var attributeIndex = allAttributeNamesInOrder.indexOf(physicals[i].childNodes[j].nodeName);
                  attributeValues[attributeIndex].innerHTML = parseInt(attributeValues[attributeIndex].innerHTML) + parseInt(physicals[i].childNodes[j].textContent);
                  console.log(physicals[i].childNodes[j].nodeName + "  -> " + parseInt(physicals[i].childNodes[j].textContent));

                }
              }
            }
          }
          // going down height/weight
          else if (current < previous) {
            if (current <= currentXmlAmount && previous >= currentXmlAmount) {
              var isValid = false;

              if (previous >= currentXmlAmount && current < currentXmlAmount) {
                isValid = true;
              }

              if (isValid) {
                // apply upgrades/downgrades
                for (var j = 3; j < physicals[i].childNodes.length; j+=2) {
                  var attributeIndex = allAttributeNamesInOrder.indexOf(physicals[i].childNodes[j].nodeName);
                  attributeValues[attributeIndex].innerHTML = parseInt(attributeValues[attributeIndex].innerHTML) + parseInt(physicals[i].childNodes[j].textContent) * -1;
                  console.log(physicals[i].childNodes[j].nodeName + "  -> " + parseInt(physicals[i].childNodes[j].textContent) * -1);

                }
              }
            }
          }
        }
      }
    }
  });
}

/**
 * increasingAndDecreasingAttributes function.
 * Used to create the eventListeners for the plus button and the minus button.
 */
function increasingAndDecreasingAttributes() {
  var plusSelection = document.getElementsByClassName('plus2');
  var minusSelection = document.getElementsByClassName('minus2');

  // for the plus button
  for (let i = 0; i < plusSelection.length; i++) {

    plusSelection[i].addEventListener("click", async function() {
      var currentUpgradeModifier = document.getElementsByClassName('upgrade-value')[i].innerHTML;
      var currentAttributeValue = document.getElementsByClassName('attribute-value')[i].innerHTML;

      // +5 is the maximum upgrade
      if (currentUpgradeModifier < 5 && currentAttributeValue < 99) {
        increaseOrDecreaseAttribute("increase", i);
      }
    })
  }

  // for the minus button
  for (let i = 0; i < minusSelection.length; i++) {

    minusSelection[i].addEventListener("click", async function() {
      var currentUpgradeModifier = document.getElementsByClassName('upgrade-value')[i].innerHTML;
      var currentAttributeValue = document.getElementsByClassName('attribute-value')[i].innerHTML;

      // the maximum downgrade is 5 (-5)
      if (currentUpgradeModifier > -5 && currentAttributeValue > 0) {
        increaseOrDecreaseAttribute("decrease", i);
      }
    })
  }
  
}

/**
 * increaseOrDecreaseAttribute function.
 * Used to increase or decrease (depending on the upgradeType provided)
 * the selected attribute.
 * @param {string} upgradeType the upgrade type (must be either "increase" or "decrease")
 * @param {number} i the index of the attribute selected
 */
async function increaseOrDecreaseAttribute(upgradeType, i) {
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

  let attributeValues = document.getElementsByClassName("attribute-value");
  let upgradeValues = document.getElementsByClassName("upgrade-values");

  // increase/decrease the attribute and the current upgrade modifier
  attributeValues[i].innerHTML = parseInt(attributeValues[i].innerHTML) + upgradeAmount;
  upgradeValues[i].innerHTML = parseInt(upgradeValues[i].innerHTML) + upgradeAmount;
  
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
  availableUpgradePoints[j] += await getUpgradePointChange(i);
  updateAvailableUpgradePoints(availableUpgradePoints[j], j); 
}

increasingAndDecreasingAttributes();

/**
 * Increasing attributes
 */
var userPlusSelection = document.getElementsByClassName('plus-button');

let attributeValues = document.getElementsByClassName("attribute-value");
let upgradeValues = document.getElementsByClassName("upgrade-value");

for (let i = 0; i < userPlusSelection.length; i++) {
  userPlusSelection[i].addEventListener("click", async function() {

    // +5 is the maximum upgrade
    if (upgradeValues[i].innerHTML < 5 && attributeValues[i].innerHTML < 99) {

      attributeValues[i].innerHTML++;
      upgradeValues[i].innerHTML++;
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
      availableUpgradePoints[j] += await getUpgradePointChange(i);
      updateAvailableUpgradePoints(availableUpgradePoints[j], j); 
    }

  })
}

/**
 * Decreasing attributes
 */
var userMinusSelection = document.getElementsByClassName('minus-button');

for (let i = 0; i < userMinusSelection.length; i++) {
  userMinusSelection[i].addEventListener("click", async function() {

    // the maximum downgrade is 5 (-5)
    if (upgradeValues[i].innerHTML > -5 && attributeValues[i].innerHTML > 0) {

      attributeValues[i].innerHTML--;
      upgradeValues[i].innerHTML--;
  
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
      availableUpgradePoints[j] = availableUpgradePoints[j] + await getUpgradePointChange(i);
      updateAvailableUpgradePoints(availableUpgradePoints[j], j);
    }
  })
}
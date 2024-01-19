/**
 * 2022-2023
 * Anthony Liscio
 * 
 * listeners.js
 * 
 *    Used for the functions used to create event listeners for the website.
 */

import * as UtilityFunctions from "./utility_functions.js";
import * as InitializerFunctions from "./initializers.js";
import * as Variables from "../variables/global_variables.js";
import * as UpdateFunctions from "./update_functions.js";
import * as Constants from "../variables/constants.js";
import * as PCUtilityFunctions from "./playercomparison_utilityfunctions.js";

let boostPreviousDropdown = [false];
let abilityPreviousDropdown = {
  previousDropdownOpen: false,
  dropdownSectionIndex: -1,
}

/**
 * ABILITIES
 */
/**
 * abilityButtonListeners function used to add event listeners for each ability button.
 * These event listeners reveal/hide the dropdown content when the corresponding ability
 * button clicked.
 * @param {Object} abilityButtons all the ability buttons
 */
export function abilityButtonListeners(abilityButtons) {
  for (let i=0; i < abilityButtons.length; i++) {
    abilityButtons[i].addEventListener("click", function() {

      var abilityContentSection = document.getElementsByClassName(Constants.ABILITY_DROPDOWN_CONTENT_CLASSNAME);

      // for the main ability dropdown button
      if (i == 1) {
        var mainAbilityDropdownContent = document.getElementById(Constants.MAIN_ABILITY_SECTION_ID).getElementsByClassName(Constants.ABILITY_DROPDOWN_CONTENT_COLUMN_CLASSNAME);

        for (let k = 0; k < mainAbilityDropdownContent.length; k++) {
          UpdateFunctions.hideOrRevealDropdown(mainAbilityDropdownContent, k);
        }
      }
      // for the regular ability dropdown buttons
      else {
        // hide main ability content (if it isn't already hidden)
        hideMainAbilityDropdownContent();

        var abilityButtonDropdown = document.getElementsByClassName(Constants.ABILITY_SECTION_CLASSNAME)[i - i/2].getElementsByClassName(Constants.ABILITY_BUTTONS_DROPDOWN_CONTENT_CLASSNAME);

        UpdateFunctions.hideOrRevealDropdown(abilityButtonDropdown, 0);
      }

      // if there was a previous dropdown that is currently open/visible.  Hide it
      if (abilityPreviousDropdown.previousDropdownOpen && abilityPreviousDropdown.dropdownSectionIndex != -1) {
        let abilityContentDropdown = abilityContentSection[abilityPreviousDropdown.dropdownSectionIndex].getElementsByClassName(Constants.ABILITY_DROPDOWN_CONTENT_COLUMN_CLASSNAME);
        for (let k = 0; k < abilityContentDropdown.length; k++) {
          UpdateFunctions.hideDropdown(abilityContentDropdown, k);
        }

        // reset abilityPreviousDropdown
        abilityPreviousDropdown.previousDropdownOpen = false;
        abilityPreviousDropdown.dropdownSectionIndex = -1;
      }
      
    });
  }

}

/**
 * abilityButtonContentListeners function used to add event listeners for each ability content section buttons
 * @param {Object} abilityContentButtons the "Offense", "Defense", "Athleticism" buttons used to reveal ablities
 * for the appropriate section.
 */
export function abilityButtonContentListeners(abilityContentButtons) {
  for (let i = 0; i < abilityContentButtons.length; i++) {
    abilityContentButtons[i].addEventListener("click", function() {

      // variable for if the same attribute section button was just pressed previously
      let sameButtonPressed = abilityPreviousDropdown.dropdownSectionIndex == i;

      // var dropdownSection = document.getElementById(dropdownIdName);
      let dropdownSection = document.getElementsByClassName(Constants.ABILITY_DROPDOWN_CONTENT_CLASSNAME)[i];
      let dropdownsToHideOrReveal = dropdownSection.getElementsByClassName(Constants.ABILITY_DROPDOWN_CONTENT_COLUMN_CLASSNAME);

      // if there was a previous dropdown that is currently open/visible.  Hide it
      if (abilityPreviousDropdown.previousDropdownOpen && abilityPreviousDropdown.dropdownSectionIndex != -1) {

        let previousAbilityDropdownSection = document.getElementsByClassName(Constants.ABILITY_DROPDOWN_CONTENT_CLASSNAME)[abilityPreviousDropdown.dropdownSectionIndex];
        let previousContentToHide = previousAbilityDropdownSection.getElementsByClassName(Constants.ABILITY_DROPDOWN_CONTENT_COLUMN_CLASSNAME);

        for (let k = 0; k < previousContentToHide.length; k++) {
          UpdateFunctions.hideDropdown(previousContentToHide, k);
        }

        // reset abilityPreviousDropdown
        abilityPreviousDropdown.previousDropdownOpen = false;
        abilityPreviousDropdown.dropdownSectionIndex = -1;
      }

      for (let j = 0; j < dropdownsToHideOrReveal.length; j++) {
        // if the same button was not just previously pressed and the content is currently hidden
        if (!sameButtonPressed && (dropdownsToHideOrReveal[j].style.display === "none" || dropdownsToHideOrReveal[j].style.display == "")) {
          UpdateFunctions.revealDropdown(dropdownsToHideOrReveal, j);
          abilityPreviousDropdown.previousDropdownOpen = true;
          abilityPreviousDropdown.dropdownSectionIndex = i;
        }
        else {
          UpdateFunctions.hideDropdown(dropdownsToHideOrReveal, j);
          abilityPreviousDropdown.previousDropdownOpen = false;
          abilityPreviousDropdown.dropdownSectionIndex = -1;
        }
      }

    });
  }
}

/**
 * hideMainAbilityDropdownContent function used to hide the main ability dropdown content (if it is not already hidden)
 */
export function hideMainAbilityDropdownContent() {
  let mainAbilityDropdownContent = document.getElementById(Constants.MAIN_ABILITY_DROPDOWN_SECTION_ID).getElementsByClassName(Constants.ABILITY_DROPDOWN_CONTENT_COLUMN_CLASSNAME);

  for (let i = 0; i < mainAbilityDropdownContent.length; i++) {
    if (mainAbilityDropdownContent[i].style.display !== "none" && mainAbilityDropdownContent[i].style.display != "") {
      mainAbilityDropdownContent[i].style.display = "none";
    }
  }
}

/**
 * abilitySelectListeners function used to add event listeners for each ability item.
 * When an abilityItem is clicked the ability display slot is set with that ability, if
 * it meets the requirements.
 */
export function abilitySelectListeners() {

  Object.values(Variables.abilityItems).forEach((abilityItem, index) => {
    abilityItem.addEventListener("click", function() {
      let i = 0;
      let k = 0;
      if (index >= Variables.abilityItems.length / 2) {
        i = 1;
        k = 2;
      }

      let abilityDisplayNames = Variables.abilityDisplayNames;
      let selectedAbilityName = abilityItem.getElementsByClassName(Constants.ABILITY_NAME_CLASSNAME)[0];
      let selectedAbilityRequirements = abilityItem.getElementsByClassName(Constants.ABILITY_REQ_CLASSNAME);
      let confirmResponse = true;

      // if the selected ability has already been selected as a regular or main ability
      if (abilityDisplayNames[0].textContent == selectedAbilityName.textContent || 
          abilityDisplayNames[1].textContent == selectedAbilityName.textContent || 
          Variables.mainAbilityDisplayName.textContent == selectedAbilityName.textContent) {
        
        confirmResponse = false;
        window.alert("This ability is already selected");
      }
      // if the requirements for the seleced ability are not met
      else if (!UtilityFunctions.meetsRequirement(selectedAbilityRequirements[0].textContent) || !UtilityFunctions.meetsRequirement(selectedAbilityRequirements[1].textContent)) {
        confirmResponse = false;
        window.alert("1 or more of the minimum requirements for this ability are not met");
      }
      // if the same ability slot is already being used but it is a different ability, give the option to replace the existing one or cancel
      else if (abilityDisplayNames[i].textContent != Constants.UNSELECTED_ABILITY_NAME) {
        confirmResponse = window.confirm(`Are you sure you want to replace "${abilityDisplayNames[i].textContent}" with "${selectedAbilityName.textContent}"?`);
      } 

      if (confirmResponse) {
        // set selected ability
        let selectedAbilityDescription = abilityItem.getElementsByClassName(Constants.ABILITY_DESCRIPTION_CLASSNAME)[0];
        let selectedAbilityIcon = abilityItem.getElementsByClassName(Constants.ICONS_CLASSNAME)[0];

        let abilityDisplayDescription = Variables.abilityDisplayItems[i].getElementsByClassName(Constants.ABILITY_DISPLAY_DESC_CLASSNAME)[0];
        let abilityDisplayRequirements = Variables.abilityDisplayItems[i].getElementsByClassName(Constants.ABILITY_DISPLAY_REQ_CLASSNAME);
        let abilityDisplayIcon = Variables.abilityDisplayItems[i].getElementsByClassName(Constants.ICONS_CLASSNAME)[0];

        UpdateFunctions.setDisplayItem(k, abilityDisplayNames[i], selectedAbilityName, abilityDisplayDescription, selectedAbilityDescription, 
          abilityDisplayIcon, selectedAbilityIcon, abilityDisplayRequirements, selectedAbilityRequirements
        );

      }

    });
  });
}

/**
 * mainAbilitySelectListeners function used to add event listeners for when each
 * mainAbilityItem is clicked.  When clicked the main ability display slot is set.
 */
export function mainAbilitySelectListeners() {
  Object.values(Variables.mainAbilityItems).forEach((mainAbilityItem) => {
    mainAbilityItem.addEventListener("click", function() {
      
      let mainAbilityDisplayName = Variables.mainAbilityDisplayItem.getElementsByClassName(Constants.MAIN_ABILITY_DISPLAY_NAME_CLASSNAME)[0];
      let selectedAbilityName = mainAbilityItem.getElementsByClassName(Constants.MAIN_ABILITY_NAME_CLASSNAME)[0];
      const abilityDisplayNames = Variables.abilityDisplayNames;

      let confirmResponse = true;

      console.log();
      
      // if the selected main ability has already been selected as a regular or main ability
      if (mainAbilityDisplayName.textContent == selectedAbilityName.textContent || 
          abilityDisplayNames[0].textContent == selectedAbilityName.textContent || 
          abilityDisplayNames[1].textContent == selectedAbilityName.textContent) {

        confirmResponse = false;
        window.alert("This main ability is already selected");
      }
      // if the same ability slot is already being used but it is a different ability, give the option to replace the existing one or cancel
      else if (mainAbilityDisplayName.textContent != Constants.UNSELECTED_ABILITY_NAME) {
        confirmResponse = window.confirm(`Are you sure you want to replace "${mainAbilityDisplayName.textContent}" with "${selectedAbilityName.textContent}"?`);
      } 

      if (confirmResponse) {
        // set selected ability
        let selectedAbilityDescription = mainAbilityItem.getElementsByClassName(Constants.MAIN_ABILITY_DESCRIPTION_CLASSNAME)[0];
        let selectedAbilityIcon = mainAbilityItem.getElementsByClassName(Constants.ICONS_CLASSNAME)[0];

        const k = 1;

        let abilityDisplayDescription = Variables.mainAbilityDisplayItem.getElementsByClassName(Constants.MAIN_ABILITY_DISPLAY_DESC_CLASSNAME)[0];
        let abilityDisplayIcon = Variables.mainAbilityDisplayItem.getElementsByClassName(Constants.ICONS_CLASSNAME)[0];

        UpdateFunctions.setDisplayItem(k, mainAbilityDisplayName, selectedAbilityName, abilityDisplayDescription, selectedAbilityDescription, abilityDisplayIcon, selectedAbilityIcon);
      }
    });
  });
}

/**
 * unselectButtonListeners function used to unselect/remove a selected ability, 
 * main ability, or boost.
 */
export function unselectButtonListeners() {
  Object.values(Variables.unselectButtons).forEach((unselectButton, index) => {
    unselectButton.addEventListener("click", function() {

      // unselect main ability
      if (index == 1) {
        InitializerFunctions.setMainAbilityOptionToUnselected();
      }
      // unselect regular ability
      else if (index == 0 || index == 2) {
        let j = 0;
        if (index == 2) {
          j = 1;
        }
        InitializerFunctions.setAbilityOptionToUnselected(j);
      }
      // unselect boost
      else {

        const selectedBoostIndex = index - 3;

        const selectedBoostName = document.getElementsByClassName(Constants.BOOST_DISPLAY_VALUE_CLASSNAME)[selectedBoostIndex].textContent;
        const selectedBoostInfo = UtilityFunctions.getBoostUpgradeInfo(selectedBoostName);
        selectedBoostInfo[0] = parseInt(selectedBoostInfo[0]) * -1; // multiply value by -1 since the boost is being unapplyed/unselected here

        // taking into account that if this boost is unselected it might cause already selected abilities or boosts to become unvalid
        const continueWithAttributeChange = UtilityFunctions.checkSelectedRequirementsIfAttributeChangeDone(selectedBoostInfo[0], Constants.ALL_ATTRIBUTES_INORDER_FULLSPELLING.indexOf(selectedBoostInfo[1]));
        if (continueWithAttributeChange) {
          UpdateFunctions.applyBoostUpgradeOrDowngrade(selectedBoostInfo[1], selectedBoostInfo[0]);
          InitializerFunctions.setBoostToUnselected(selectedBoostIndex);
        }
      }

    });
  });
}

/**
 * abilityHoverListeners function used to add "mouseenter" (hover) event listeners for each abilityItem.
 * Each ability item that is hovered over with the mouse will have the requirement text be set to green
 * if the requirements are met or red if the requirements are not met.
 */
export function abilityHoverListeners() {
  Object.values(Variables.abilityItems).forEach((abilityItem) => {
    abilityItem.addEventListener("mouseenter", function() {
      let abilityRequirements = abilityItem.getElementsByClassName(Constants.ABILITY_REQ_CLASSNAME);
      Object.values(abilityRequirements).forEach(abilityRequirement => {
        if (UtilityFunctions.meetsRequirement(abilityRequirement.textContent)) {
          abilityRequirement.style.color = "green";
        }
        else {
          abilityRequirement.style.color = "red";
        }
      });

    });
  });  
}


/**
 * BOOSTS
 */
/**
 * boostDropdownButtonListeners function used to add event listeners for each "Boost" button.
 * The event listener here is used to hide/reveal the next dropdown section (with the 5 attribute
 * section buttons below) when the "Boost" button is clicked.
 * @param {Object} boostDropdownButtons all the "Boost" buttons
 */
export function boostDropdownButtonListeners(boostDropdownButtons) {
  for (let i = 0; i < boostDropdownButtons.length; i++) {
    boostDropdownButtons[i].addEventListener("click", function () {
      // hide main ability content (if it isn't already hidden)
      hideMainAbilityDropdownContent();

      // Dropdown section which displays the "Technique", "Power", "Playstyle", "Tenacity" buttons
      var attributeSectionBoostContent = document.getElementsByClassName(Constants.BOOST_BUTTONS_DROPDOWN_CLASSNAME);

      // boost dropdown content (the corresponding boost options) which opens underneath the attributeSectionBoostContent buttons
      var boostDropdownContent = document.getElementsByClassName(Constants.BOOST_DROPDOWN_CONTENT_CLASSNAME);

      // hide/reveal the dropdown
      UpdateFunctions.hideOrRevealDropdown(attributeSectionBoostContent, i);

      // if there was a previous dropdown that is currently open/visible.  Hide it
      if (boostPreviousDropdown[0]) {
        for (var k = 1; k < boostPreviousDropdown.length; k++) {
          // hide the boost dropdown (the boost options)
          UpdateFunctions.hideDropdown(boostDropdownContent, boostPreviousDropdown[k]);

          // hide the boost button dropdown (the dropdown with the "Technique", "Power", etc buttons)
          let boostContent = boostDropdownContent[boostPreviousDropdown[k]];
          let boostButtonsDropdown = boostContent.parentElement.getElementsByClassName(Constants.BOOST_BUTTONS_DROPDOWN_CLASSNAME);
          UpdateFunctions.hideDropdown(boostButtonsDropdown, 0); // 0 because there is only 1 element in boostButtonsDropdown
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
export function attributeSectionBoostDropdownButtonListeners(attributeSectionBoostDropdownButtons) {
  for (let i = 0; i < attributeSectionBoostDropdownButtons.length; i++) {
    attributeSectionBoostDropdownButtons[i].addEventListener("click", function () {
      // boost dropdown content (the corresponding boost options) which opens underneath the attributeSectionBoostContent buttons
      let boostDropdownContent = document.getElementsByClassName(Constants.BOOST_DROPDOWN_CONTENT_CLASSNAME);

      // variable for if the same attribute section button was just pressed previously
      let sameButtonPressed = boostPreviousDropdown[1] == i;

      // if there was a previous dropdown that is currently open/visible.  Hide it
      if (boostPreviousDropdown[0]) {
        UpdateFunctions.hideDropdown(boostDropdownContent, boostPreviousDropdown[1]);

        // reset boostPreviousDropdown
        boostPreviousDropdown = [false];
      }

      // if the same button was not just previously pressed and the content is currently hidden
      if (!sameButtonPressed && (boostDropdownContent[i].style.display === "none" || boostDropdownContent[i].style.display == "")) {
        UpdateFunctions.revealDropdown(boostDropdownContent, i);
        boostPreviousDropdown[0] = true;
        boostPreviousDropdown[1] = i;
      }
      else {
        UpdateFunctions.hideDropdown(boostDropdownContent, i);
        boostPreviousDropdown = [false];
      }
    });
  }
}

/**
 * boostSelectListeners function used to add event listeners for when a boost item is selected (clicked).
 * The selected boost item is added to the boost display slot if it meets requirements.
 */
export function boostSelectListeners() {
  Object.values(Variables.boostItems).forEach((boostItem, index) => {
    boostItem.addEventListener("click", function() {
      // i used as the boost section index (0 for the first half and 1 for the second half)
      let i = 0;
      if (index >= Variables.boostItems.length / 2) {
        i = 1;
      }

      // index for the other selected boost item
      let otherIndex = i == 0 ? 1 : 0; 

      let boostDisplayName = Variables.boostDisplayItems[i].getElementsByClassName(Constants.BOOST_DISPLAY_VALUE_CLASSNAME)[0];
      let otherBoostDisplayName = Variables.boostDisplayItems[otherIndex].getElementsByClassName(Constants.BOOST_DISPLAY_VALUE_CLASSNAME)[0];
      let boostDisplayIcon = Variables.boostDisplayItems[i].getElementsByClassName(Constants.ICONS_CLASSNAME)[0];
      let otherBoostDisplayIcon = Variables.boostDisplayItems[otherIndex].getElementsByClassName(Constants.ICONS_CLASSNAME)[0];
      const displayIconColour = boostDisplayIcon.style.color;
      const otherDisplayIconColour = otherBoostDisplayIcon.style.color;

      let selectedBoostName = boostItem.getElementsByClassName(Constants.BOOST_VALUE_CLASSNAME)[0];
      let selectedBoostIcon = boostItem.getElementsByClassName(Constants.ICONS_CLASSNAME)[0];
      let selectedBoostRequirement = boostItem.getElementsByClassName(Constants.BOOST_REQ_CLASSNAME);
      const selectedIconColour = selectedBoostIcon.style.color;

      let confirmResponse = true;
      let replacingAnotherBoost = false;
      
      // if the boost item is already selected in the current slot
      if ((boostDisplayName.textContent == selectedBoostName.textContent && displayIconColour == selectedIconColour)) {
        confirmResponse = false;
        window.alert("This boost is already selected");
      }
      // if the boost item in the other boost slot is the same or is upgrading the same attribute
      else if (otherBoostDisplayName.textContent == selectedBoostName.textContent) {
        confirmResponse = false;
        window.alert("This boost cannot be selected at this time because the other selected boost is already upgrading the same attribute");
      }
      // if both the boost requirements are not met
      else if (!UtilityFunctions.meetsRequirement(selectedBoostRequirement[0].textContent)) {
        confirmResponse = false;
        window.alert("The minimum requirement for this boost is not met");
      }
      // if another boost is already selected but it is not the same boost as just clicked right now
      else if (boostDisplayName.textContent != Constants.UNSELECTED_BOOST_NAME || (boostDisplayName.textContent == selectedBoostName.textContent && displayIconColour != selectedIconColour)) {
        confirmResponse = window.confirm(
          `Are you sure you want to replace "${boostDisplayName.textContent} (${displayIconColour})" with "${selectedBoostName.textContent} (${selectedIconColour})"?`
        );
        replacingAnotherBoost = true;
      } 

      // setting the display item
      if (confirmResponse) {
        // remove the upgrades from the boost to be replaced (if there is a boost to be replaced)
        if (replacingAnotherBoost) {
          const oldBoostAttributeUprgadeInfo = UtilityFunctions.getRequirementValueAndAttributeName(boostDisplayName.textContent);
          oldBoostAttributeUprgadeInfo[0] = parseInt(oldBoostAttributeUprgadeInfo[0]) * -1;
          UpdateFunctions.applyBoostUpgradeOrDowngrade(oldBoostAttributeUprgadeInfo[1], oldBoostAttributeUprgadeInfo[0]);
        }

        let boostDisplayRequirement = Variables.boostDisplayItems[i].getElementsByClassName(Constants.BOOST_DISPLAY_REQ_CLASSNAME);

        UpdateFunctions.setDisplayItem(i + 3, boostDisplayName, selectedBoostName, undefined, undefined,
           boostDisplayIcon, selectedBoostIcon, boostDisplayRequirement, selectedBoostRequirement
        ); 

        const boostAttributeUprgadeInfo = UtilityFunctions.getRequirementValueAndAttributeName(selectedBoostName.textContent);
        UpdateFunctions.applyBoostUpgradeOrDowngrade(boostAttributeUprgadeInfo[1], parseInt(boostAttributeUprgadeInfo[0]));

        UtilityFunctions.checkIfInvalidBoostOrAbilityIsNowValid();
      }

    });
  });
}

/**
 * boostHoverListeners function used to add "mouseenter" (hover) event listeners for each boost item.
 * The event listener is used to set the requirement colours to green if the requirements are met
 * or red if the requirements are not met.
 */
export function boostHoverListeners() {
  Object.values(Variables.boostItems).forEach((boostItem) => {
    boostItem.addEventListener("mouseenter", function() {
      let boostRequirements = boostItem.getElementsByClassName(Constants.BOOST_REQ_CLASSNAME);
      Object.values(boostRequirements).forEach(boostRequirement => {
        if (UtilityFunctions.meetsRequirement(boostRequirement.textContent)) {
          boostRequirement.style.color = "green";
        }
        else {
          boostRequirement.style.color = "red";
        }
      });

    });
  });  
}


/**
 * PHYSICALS (height, weight)
 */
/**
 * confirmPlayerTypeButtonListener function used to setup the corresponding
 * build based off the selected player type when the confirm button is clicked
 * @param {Object} confirmPlayerTypeButton the "Confirm Player Type" button
 */
export function confirmPlayerTypeButtonListener(confirmPlayerTypeButton) {
  confirmPlayerTypeButton.addEventListener('click', function() {
    // set the default attributes to the html table
    InitializerFunctions.setupNewBuild(Variables.playerTypes.value);

    // reset the upgrades
    UpdateFunctions.resetUpgrades(Variables.upgradeValues);

    // reset the upgrade points available
    UpdateFunctions.resetUpgradePoints();

    UpdateFunctions.hideOrRevealHeightWeightPosition("block");
    UpdateFunctions.changePlayerTypeSelectionValidity();
    UpdateFunctions.hideOrRevealHeightWeightPosition("block");
    UpdateFunctions.hideOrRevealAbilitiesAndBoosts("flex");
    UpdateFunctions.hideOrRevealCompleteBuildButton("block");
    UpdateFunctions.hideOrRevealResetButton("block");
  });
}

/**
 * confirmHeightWeightButtonListener function used to add event listeners for either the "confirm weight" or
 * "confirm height" buttons.
 * @param {Object} confirmButton the confirm height or confirm weight button
 * @param {String} physicalAspect string keyword which is either "Height" or "Weight"
 */
export function confirmHeightWeightButtonListener(confirmButton, physicalAspect) {
  confirmButton.addEventListener('click', function() {
    const continueWithChanges = window.confirm("Any abilities or boosts selected will be reset by changing the height or weight");

    if (continueWithChanges) {
      if (physicalAspect == "Height") {
        // set global variables for previous and current heights
        Variables.setGlobalPreviousHeight(Variables.globalCurrentHeight);
        Variables.setGlobalCurrentHeight(UtilityFunctions.convertFeetandInchesToInches(Variables.heights.value));
        UpdateFunctions.applyAttributeChangesFromPhysicalChanges(Variables.playerTypes.value, Variables.globalPreviousHeight, Variables.globalCurrentHeight, "Height");
      }
      else {
        if (Variables.weights.value < Variables.weights.min) {
          Variables.weights.value = Variables.weights.min;
          console.warn("Invalid weight entered.  (This value was below the minimum weight).  The value has now been set to the minimum value instead of what was entered.");
        }
        else if (Variables.weights.value > Variables.weights.max) {
          Variables.weights.value = Variables.weights.max;
          console.warn("Invalid weight entered.  (This value was above the maximum weight).  The value has now been set the maximum value instead of what was entered.");
        }
  
        // set global variables for previous and current weights
        Variables.setGlobalPreviousWeight(Variables.globalCurrentWeight);
        Variables.setGlobalCurrentWeight(Variables.weights.value);
        UpdateFunctions.applyAttributeChangesFromPhysicalChanges(Variables.playerTypes.value, Variables.globalPreviousWeight, Variables.globalCurrentWeight, "Weight");
      }

      // reset all the abilities and boosts
      InitializerFunctions.setAbilityOptionToUnselected(0);
      InitializerFunctions.setAbilityOptionToUnselected(1);
      InitializerFunctions.setMainAbilityOptionToUnselected();

      for (let i = 0; i < 2; i++) {
        let boostDisplayName = Variables.boostDisplayItems[i].getElementsByClassName(Constants.BOOST_DISPLAY_VALUE_CLASSNAME)[0];
        const boostAttributeUprgadeInfo = UtilityFunctions.getRequirementValueAndAttributeName(boostDisplayName.textContent);
        boostAttributeUprgadeInfo[0] *= -1;
        UpdateFunctions.applyBoostUpgradeOrDowngrade(boostAttributeUprgadeInfo[1], boostAttributeUprgadeInfo[0]);
        InitializerFunctions.setBoostToUnselected(i);
      }
    }
    // setting the height or weight back to what it was before cancelling
    else {
      if (physicalAspect == "Height") {
        Variables.heights.value = UtilityFunctions.convertInchesToFeetAndInches(Variables.globalCurrentHeight);
      }
      else {
        Variables.weights.value = Variables.globalCurrentWeight;
      }
    }

  });
}


/**
 * ATTRIBUTES
 */
/**
 * increasingAndDecreasingAttributesListeners function.
 * Used to create the eventListeners for both the plus button and the minus button.
 */
export function increasingAndDecreasingAttributesListeners() {
  let plusButtons = document.getElementsByClassName(Constants.PLUS_BUTTONS_CLASSNAME);
  let minusButtons = document.getElementsByClassName(Constants.MINUS_BUTTONS_CLASSNAME);

  // plus button listeners
  Object.values(plusButtons).forEach((plusButton, index) => {
    plusButton.addEventListener("click", async function() {
      let currentUpgradeModifier = Variables.upgradeValues[index].innerHTML;
      let currentAttributeValue = Variables.attributeValues[index].innerHTML;

      // +5 is the maximum upgrade
      if (currentUpgradeModifier < 5 && currentAttributeValue < 99) {
        UpdateFunctions.increaseOrDecreaseAttribute("increase", index);
      }
    });
  });

  // minus button listeners
  Object.values(minusButtons).forEach((minusButton, index) => {
    minusButton.addEventListener("click", async function() {
      let currentUpgradeModifier = Variables.upgradeValues[index].innerHTML;
      let currentAttributeValue = Variables.attributeValues[index].innerHTML;

      // the maximum downgrade is 5 (-5)
      if (currentUpgradeModifier > -5 && currentAttributeValue > 0) {
        UpdateFunctions.increaseOrDecreaseAttribute("decrease", index);
      }
    });
  });
}


/**
 * COMPLETE BUILD BUTTON
 */
/**
 * completeBuildButtonListener function used to add the functionality of the 
 * complete build button when it is clicked.
 */
export function completeBuildButtonListeners() {
  const completeBuildButton = document.getElementById(Constants.COMPLETE_BUILD_BTTN_ID);
  let completeBuildSection = document.getElementById(Constants.COMPLETE_BUILD_SECTION_ID);

  completeBuildButton.addEventListener("click", async function() {

    // if all abilities are selected
    if (UtilityFunctions.allAbilitiesSelected()) {
      // if all abilities and boosts are valid, and all attribute upgrade points available are positive (0 or higher, not less than 0)
      // then continue with completing the build
      if (UtilityFunctions.allAbilitiesAndBoostsValid() && UtilityFunctions.allAttributePointsPositive()) {
        PCUtilityFunctions.findSimilarPlayers();
        completeBuildSection.style.display = "block";
      }
    }
    else {
      window.alert("You must select all 3 abilities before completing the build");
    }
  });

  // if the outside part is clicked, close the modal/popup
  window.addEventListener('click', function (event) {
    if (event.target === completeBuildSection) {
      completeBuildSection.style.display = 'none';
      PCUtilityFunctions.resetCompleteBuildContent();
    }
  });
}


/**
 * RESET BUTTON
 */
/**
 * resetButtonListener function used to add the functionality of the 
 * reset button when it is clicked.
 */
export function resetButtonListener() {
  const resetButton = document.getElementById(Constants.RESET_BUILD_BTTN_ID);

  resetButton.addEventListener("click", async function() {
    // reload the whole page (mimicking the browser's refresh button)
    location.reload();
  });
}


/**
 * HELP / INSTRUCTIONS
 */
/**
 * helpButtonListener function used to add the functionality of the "Help & Instructions" button
 */
export function helpButtonListener() {
  const helpButton = document.getElementById(Constants.HELP_BUTTON_ID);
  let helpSection = document.getElementById(Constants.HELP_SECTION_ID);

  helpButton.addEventListener("click", async function() {
    helpSection.style.display = "block";
  });

  window.addEventListener('click', function (event) {
    if (event.target === helpSection) {
      helpSection.style.display = 'none';
    }
  });
}

/**
 * moreInfoButtonListeners function used to add the functionality of the "More Info" / "Less Info"  button found 
 * in the Help and Instructions section.
 */
export function moreInfoButtonListeners() {
  let moreInfoButtons = document.getElementsByClassName(Constants.MORE_INFO_BUTTON_CLASSNAME);

  Array.from(moreInfoButtons).forEach(moreInfoButton => {
    moreInfoButton.addEventListener("click", async function() {
      let extraInfoListItems = moreInfoButton.parentNode.getElementsByClassName(Constants.MORE_INFO_LISTITEM_CLASSNAME);

      // if the button says more info when clicked, change it to less info.  And vice versa
      if (moreInfoButton.textContent == "More Info") {
        moreInfoButton.textContent = "Less Info";
      }
      else {
        moreInfoButton.textContent = "More Info";
      }

      // for each extra li, if its hidden, show it.  If its shown, hide it.
      Array.from(extraInfoListItems).forEach(extraInfoListItem => {
        if (extraInfoListItem.style.display == "none" || extraInfoListItem.style.display == "") {
          extraInfoListItem.style.display = "block";
        }
        else {
          extraInfoListItem.style.display = "none";
        }
      });
    });
  });
}
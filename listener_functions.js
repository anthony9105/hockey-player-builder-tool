import * as UtilityFunctions from "./utility_functions.js";
import * as InitializerFunctions from "./initializer_functions.js";
import * as Variables from "./global_variables.js";
import * as UpdateFunctions from "./update_functions.js";

var boostPreviousDropdown = [false];
var abilityPreviousDropdown = {
  previousDropdownOpen: false,
  dropdownSectionIndex: -1,
}


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

      // dropdown which opens underneath the "Boost" buttons and is the 5 buttons for each attribute section
      var attributeSectionBoostContent = document.getElementsByClassName("boost-buttons-content");

      // boost dropdown content which opens underneath the attributeSectionBoostContent buttons
      var boostDropdownContent = document.getElementsByClassName("boost-dropdown-content");

      // hide/reveal the dropdown
      UpdateFunctions.hideOrRevealDropdown(attributeSectionBoostContent, i);

      // if there was a previous dropdown that is currently open/visible.  Hide it
      if (boostPreviousDropdown[0]) {
        for (var k = 1; k < boostPreviousDropdown.length; k++) {
          // hide the boost dropdown (the boost options)
          UpdateFunctions.hideDropdown(boostDropdownContent, boostPreviousDropdown[k]);

          // hide the boost button dropdown (the dropdown with the "Technique", "Power", etc buttons)
          let boostContent = boostDropdownContent[boostPreviousDropdown[k]];
          let boostButtonsDropdown = boostContent.parentElement.getElementsByClassName("boost-buttons-content");
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
      // boost dropdown content which opens underneath the attributeSectionBoostContent buttons
      var boostDropdownContent = document.getElementsByClassName("boost-dropdown-content");

      // variable for if the same attribute section button was just pressed previously
      var sameButtonPressed = boostPreviousDropdown[1] == i;

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
 * abilityButtonListeners function used to add event listeners for each ability button.
 * These event listeners reveal/hide the dropdown content when the corresponding ability
 * button clicked.
 * @param {Object} abilityButtons all the ability buttons
 */
export function abilityButtonListeners(abilityButtons) {
  for (let i=0; i < abilityButtons.length; i++) {
    abilityButtons[i].addEventListener("click", function() {

      var abilityContentSection = document.getElementsByClassName("ability-dropdown-section");

      // for the main ability dropdown button
      if (i == 1) {
        var mainAbilityDropdownContent = document.getElementById("main-ability-section").getElementsByClassName("dropdown-content");

        for (var k = 0; k < mainAbilityDropdownContent.length; k++) {
          UpdateFunctions.hideOrRevealDropdown(mainAbilityDropdownContent, k);
        }
      }
      // for the regular ability dropdown buttons
      else {
        // hide main ability content (if it isn't already hidden)
        hideMainAbilityDropdownContent();

        var abilityButtonDropdown = document.getElementsByClassName("ability-section")[i - i/2].getElementsByClassName("ability-button-content");

        UpdateFunctions.hideOrRevealDropdown(abilityButtonDropdown, 0);
      }

      // if there was a previous dropdown that is currently open/visible.  Hide it
      if (abilityPreviousDropdown.previousDropdownOpen && abilityPreviousDropdown.dropdownSectionIndex != -1) {

        var abilityContentDropdown = abilityContentSection[abilityPreviousDropdown.dropdownSectionIndex].getElementsByClassName("dropdown-content");
        for (var k = 0; k < abilityContentDropdown.length; k++) {
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
 * hideMainAbilityDropdownContent function used to hide the main ability dropdown content (if it is not already hidden)
 */
export function hideMainAbilityDropdownContent() {
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
export function abilityButtonContentListeners(abilityContentButtons) {
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
  });
}

export function confirmHeightWeightButtonListener(confirmButton, physicalAspect) {
  confirmButton.addEventListener('click', function(){

    if (Variables.weights.value < Variables.weights.min) {
      console.warn("Invalid weight entered.  (This value was below the minimum weight).  The value has now been set to the minimum value instead of what was entered.");
      Variables.weights.value = Variables.weights.min;
    }
    else if (Variables.weights.value > Variables.weights.max) {
      console.warn("Invalid weight entered.  (This value was above the maximum weight).  The value has now been set the maximum value instead of what was entered.");
      Variables.weights.value = Variables.weights.max;
    }
  
    if (physicalAspect == "Height") {
      // set global variables for previous and current heights
      Variables.setGlobalPreviousHeight(Variables.globalCurrentHeight);
      Variables.setGlobalCurrentHeight(UtilityFunctions.convertFeetandInchesToInches(Variables.heights.value));
      UpdateFunctions.applyAttributeChangesFromPhysicalChanges(Variables.playerTypes.value, Variables.globalPreviousHeight, Variables.globalCurrentHeight, "Height");
    }
    else {
      // set global variables for previous and current weights
      Variables.setGlobalPreviousWeight(Variables.globalCurrentWeight);
      Variables.setGlobalCurrentWeight(Variables.weights.value);
      UpdateFunctions.applyAttributeChangesFromPhysicalChanges(Variables.playerTypes.value, Variables.globalPreviousWeight, Variables.globalCurrentWeight, "Weight");
    }

  });
}

/**
 * increasingAndDecreasingAttributesListeners function.
 * Used to create the eventListeners for both the plus button and the minus button.
 */
export function increasingAndDecreasingAttributesListeners() {
  var plusSelection = document.getElementsByClassName('plus-button');
  var minusSelection = document.getElementsByClassName('minus-button');

  // for the plus button
  for (let i = 0; i < plusSelection.length; i++) {

    plusSelection[i].addEventListener("click", async function() {
      var currentUpgradeModifier = Variables.upgradeValues[i].innerHTML;
      var currentAttributeValue = Variables.attributeValues[i].innerHTML;

      // +5 is the maximum upgrade
      if (currentUpgradeModifier < 5 && currentAttributeValue < 99) {
        InitializerFunctions.increaseOrDecreaseAttribute("increase", i);
      }
    })
  }

  // for the minus button
  for (let i = 0; i < minusSelection.length; i++) {

    minusSelection[i].addEventListener("click", async function() {
      var currentUpgradeModifier = Variables.upgradeValues[i].innerHTML;
      var currentAttributeValue = Variables.attributeValues[i].innerHTML;

      // the maximum downgrade is 5 (-5)
      if (currentUpgradeModifier > -5 && currentAttributeValue > 0) {
        InitializerFunctions.increaseOrDecreaseAttribute("decrease", i);
      }
    })
  }
  
}
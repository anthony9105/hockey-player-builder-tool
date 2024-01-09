/**
 * 2022-2023
 * Anthony Liscio
 * 
 * main.js
 */

import * as ListenerFunctions from "./functions/listeners.js";
import * as InitializerFunctions from "./functions/initializers.js";
import * as UtilityFunctions from "./functions/utility_functions.js";
import * as Constants from "./variables/constants.js";
import * as UpdateFunctions from "./functions/update_functions.js";
import { attributeValues } from "./variables/global_variables.js";
import * as PCUtilityFunctions from "./functions/playercomparison_utilityfunctions.js";

  var openModalBtn = document.getElementById('complete-build-button');
  var closeModalBtn = document.getElementById('closeModalBtn');
  var completeBuildSection = document.getElementById('complete-build');

  openModalBtn.addEventListener('click', function () {
    completeBuildSection.style.display = 'block';
  });

  // closeModalBtn.addEventListener('click', function () {
  //     modal.style.display = 'none';
  // });

  window.addEventListener('click', function (event) {
      if (event.target === completeBuildSection) {
        completeBuildSection.style.display = 'none';
      }
  });

InitializerFunctions.initializePhysicalsSectionDisplay();

// PCUtilityFunctions.findSimilarPlayers();
/**
 * ABILITIES
 */
// setting ability display slots
InitializerFunctions.setAbilityOptionToUnselected(0);
InitializerFunctions.setAbilityOptionToUnselected(1);
InitializerFunctions.setMainAbilityOptionToUnselected();

// ability item mouseenter and click listeners
ListenerFunctions.abilitySelectListeners();
ListenerFunctions.mainAbilitySelectListeners();
ListenerFunctions.abilityHoverListeners();

// "Ability" button listeners for when the ability buttons and boost buttons are pressed.  When clicked it will reveal/hide the
// "Offense", "Defense", and "Athleticism" buttons below.
let abilityButtons = document.getElementsByClassName(Constants.ABILITY_BUTTON_CLASSNAME);
ListenerFunctions.abilityButtonListeners(abilityButtons);

// "Offense", "Defense", "Athleticism" button listeners.  When clicked it will reveal/hide the corresponding abilities below.
let abilityContentButtons = document.getElementsByClassName(Constants.ABILITY_DROPDOWN_CONTENT_BUTTON_CLASSNAME);
ListenerFunctions.abilityButtonContentListeners(abilityContentButtons);



/**
 * BOOSTS
 */
// setting boost display slots
InitializerFunctions.setBoostToUnselected(0);
InitializerFunctions.setBoostToUnselected(1);

// Fill all the boost options
InitializerFunctions.fillBoostOptions();

// boost item mouseenter and click listeners
ListenerFunctions.boostSelectListeners();
ListenerFunctions.boostHoverListeners();

// "Boost" button listeners.  When clicked it will reveal/hide the "Technique", "Power", "Playstyle", "Tenacity" buttons below.
let boostDropdownButtons = document.getElementsByClassName(Constants.MAIN_BOOST_BUTTON_CLASSNAME);
ListenerFunctions.boostDropdownButtonListeners(boostDropdownButtons);

// "Technique", "Power", "Playstyle", "Tenacity" button listeners.  When clicked it will reveal/hide the corresponding boost options.
let attributeSectionBoostDropdownButtons = document.getElementsByClassName(Constants.BOOST_DROPDOWN_CONTENT_BUTTON_CLASSNAME);
ListenerFunctions.attributeSectionBoostDropdownButtonListeners(attributeSectionBoostDropdownButtons)


/**
 * OTHER
 */
// unselect/remove button listeners (for unselecting/removing ability, main ability, or boost item from the respective display slot)
ListenerFunctions.unselectButtonListeners();


/**
 * PHYSICALS
 */
// "Confirm player type" button listener.  When clicked many things are done to set up the player build with the corresponding
// player type selected. 
let confirmPlayerTypeButton = document.getElementById(Constants.CONFIRM_PLAYERTYPE_BUTTON_ID);
ListenerFunctions.confirmPlayerTypeButtonListener(confirmPlayerTypeButton);

// "Confirm height" button listener.  When clicked attributes are changed depending on the height change. 
let confirmHeightButton = document.getElementById(Constants.CONFIRM_HEIGHT_BUTTON_ID);
ListenerFunctions.confirmHeightWeightButtonListener(confirmHeightButton, "Height");

// "Confirm weight" button listener.  When clicked attributes are changed depending on the weight change.
let confirmWeightButton = document.getElementById(Constants.CONFIRM_WEIGHT_BUTTON_ID);
ListenerFunctions.confirmHeightWeightButtonListener(confirmWeightButton, "Weight");



/**
 * ATTRIBUTES
 */
// Listeners for when the + and - buttons are clicked, which are used to increase/decrease attributes
ListenerFunctions.increasingAndDecreasingAttributesListeners();


/**
 * COMPLETE BUILD
 */
ListenerFunctions.completeBuildButtonListener();
ListenerFunctions.resetButtonListener();

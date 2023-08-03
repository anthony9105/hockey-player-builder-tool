/**
 * 2022-2023
 * Anthony Liscio
 * 
 * main.js
 */

import * as ListenerFunctions from "./functions/listeners.js";
import * as InitializerFunctions from "./functions/initializers.js";
import * as Constants from "./variables/constants.js";

InitializerFunctions.setAbilityOptionToUnselected(0);
InitializerFunctions.setAbilityOptionToUnselected(1);
InitializerFunctions.setMainAbilityOptionToUnselected();

/**
 * ABILITIES
 */
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
// Fill all the boost options
InitializerFunctions.fillBoostOptions();

// "Boost" button listeners.  When clicked it will reveal/hide the "Technique", "Power", "Playstyle", "Tenacity" buttons below.
let boostDropdownButtons = document.getElementsByClassName(Constants.MAIN_BOOST_BUTTON_CLASSNAME);
ListenerFunctions.boostDropdownButtonListeners(boostDropdownButtons);

// "Technique", "Power", "Playstyle", "Tenacity" button listeners.  When clicked it will reveal/hide the corresponding boost options.
let attributeSectionBoostDropdownButtons = document.getElementsByClassName(Constants.BOOST_DROPDOWN_CONTENT_BUTTON_CLASSNAME);
ListenerFunctions.attributeSectionBoostDropdownButtonListeners(attributeSectionBoostDropdownButtons)



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

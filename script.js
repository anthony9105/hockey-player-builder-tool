/**
 * 2022-2023
 * Anthony Liscio
 */

import * as ListenerFunctions from "./listener_functions.js";
import * as InitializerFunctions from "./initializer_functions.js";
import * as Constants from "./constants.js";

InitializerFunctions.fillBoostOptions();

// "Ability" button listeners for when the ability buttons and boost buttons are pressed.  When clicked it will reveal/hide the
// "Offense", "Defense", and "Athleticism" buttons below.
let abilityButtons = document.getElementsByClassName(Constants.ABILITY_BUTTON_CLASSNAME);
ListenerFunctions.abilityButtonListeners(abilityButtons);

// "Offense", "Defense", "Athleticism" button listeners.  When clicked it will reveal/hide the corresponding abilities below.
let abilityContentButtons = document.getElementsByClassName(Constants.ABILITY_DROPDOWN_CONTENT_BUTTON_CLASSNAME);
ListenerFunctions.abilityButtonContentListeners(abilityContentButtons);


// "Boost" button listeners.  When clicked it will reveal/hide the "Technique", "Power", "Playstyle", "Tenacity" buttons below.
let boostDropdownButtons = document.getElementsByClassName(Constants.MAIN_BOOST_BUTTON_CLASSNAME);
ListenerFunctions.boostDropdownButtonListeners(boostDropdownButtons);

// "Technique", "Power", "Playstyle", "Tenacity" button listeners.  When clicked it will reveal/hide the corresponding boost options.
let attributeSectionBoostDropdownButtons = document.getElementsByClassName(Constants.BOOST_DROPDOWN_CONTENT_BUTTON_CLASSNAME);
ListenerFunctions.attributeSectionBoostDropdownButtonListeners(attributeSectionBoostDropdownButtons)


// "Confirm player type" button listener 
let confirmPlayerTypeButton = document.getElementById(Constants.CONFIRM_PLAYERTYPE_BUTTON_ID);
ListenerFunctions.confirmPlayerTypeButtonListener(confirmPlayerTypeButton);




// When the confirm height button is clicked 
let confirmHeightButton = document.getElementById("confirm-height-button");
ListenerFunctions.confirmHeightWeightButtonListener(confirmHeightButton, "Height");



// When the confirm weight button is clicked 
let confirmWeightButton = document.getElementById("confirm-weight-button");
ListenerFunctions.confirmHeightWeightButtonListener(confirmWeightButton, "Weight");

ListenerFunctions.increasingAndDecreasingAttributesListeners();

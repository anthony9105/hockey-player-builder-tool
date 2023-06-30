/**
 * 2022-2023
 * Anthony Liscio
 */

import {buildDataXMLFileName, upgradePointsXMLFileName, physUpgradeDowngradeFileName, boostsXMLFileName, allHeights, idNames, allAttributeNamesInOrder} from "./constants.js";

var availableUpgradePoints = [0, 0, 0, 0, 0];
var previousUpgradeModifier = new Array(23).fill(0);

var globalPreviousHeight;
var globalPreviousWeight;
var globalCurrentHeight;
var globalCurrentWeight;



var dropdownButtons = document.getElementsByClassName("dropdownbutton");

for (let i=0; i < dropdownButtons.length; i++) {
  dropdownButtons[i].onclick = function() {

    // UNFINISHED 
    
    // var j used for the indices of x needed to make visible/invisible.
    // j = 0 when i = 0, or j = (i * 2) + (i - 1) for the rest of i values,
    // because the dropdown-content is split into 2 columns for
    // main ability and split into 3 columns for the rest for a better visual.
    // So for example, when dropdownbutton[0] is clicked then
    // dropdown-content[0] AND dropdown-content[1] need have the display
    // updated to make them visible/invisible.
    var j;
    if (i == 0) {
      j = 0;
    }
    else {
      j = (i * 2) + (i - 1);
    }

    console.log(i);
    var x = document.getElementsByClassName("dropdown-content");
    console.log(x);

    if (i == 0) {
      var n = j;
      while (n <= j + 1) {
        if (x[n].style.display === "none" || x[n].style.display == "") {
          x[n].style.display = "flex";
          x[n].style.overflow = "hidden";
        }
        else {
          x[n].style.display = "none";
        }

        n++;
      }
    }
    else {
      var n = j;
      while (n <= j + 2) {
        if (x[n].style.display === "none" || x[n].style.display == "") {
          x[n].style.display = "flex";
          x[n].style.overflow = "hidden";
        }
        else {
          x[n].style.display = "none";
        }

        n++;
      }
    }

    // if (x[j].style.display === "none" || x[j].style.display == "") {
    //   x[j].style.display = "flex";
    //   x[j].style.overflow = "hidden";
    // }
    // else {
    //   x[j].style.display = "none";
    // }

    // if (x[j+1].style.display === "none" || x[j+1].style.display == "") {
    //   x[j+1].style.display = "flex";
    //   x[j+1].style.overflow = "hidden";
    // }
    // else {
    //   x[j+1].style.display = "none";
    // }

    // if (x[j+2].style.display === "none" || x[j+2].style.display == "") {
    //   x[j+2].style.display = "flex";
    //   x[j+2].style.overflow = "hidden";
    // }
    // else {
    //   x[j+2].style.display = "none";
    // }
    
  }
}



var sections = document.getElementsByClassName("dropdown-content");
var boostItems = sections[2].getElementsByClassName("dropdown-item");
console.log(boostItems[0].childNodes[1].textContent);
boostItems[0].childNodes[1].textContent = "ice_skating";
console.log(boostItems[0].childNodes[1].textContent);
boostItems[0].childNodes[1].style.color = "green";

try {
  const response = await fetch(boostsXMLFileName);
  const xmlString = await response.text();
  const xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");
  const attributeSections = xmlDoc.childNodes[0];

  // array with the node names for later
  var sectionNodeNames = new Array();
  var boostNodeNames = new Array();

  // first node name ("boost")
  boostNodeNames.push(attributeSections.childNodes[1].childNodes[1].nodeName);

  // for the attribute section node names ["Technique", "Power", "Playstyle", "Tenacity", "Tactics"]
  for (var i = 1; i < attributeSections.childNodes.length; i += 2) {
    sectionNodeNames.push(attributeSections.childNodes[i].nodeName);
  }
  // for the boost node names
  for (var i = 1; i < attributeSections.childNodes[1].childNodes[1].childNodes.length; i += 2) {
    boostNodeNames.push(attributeSections.childNodes[1].childNodes[1].childNodes[i].nodeName);
  }

  console.log(sectionNodeNames);
  console.log(boostNodeNames);



  var attributeSectionsLength = attributeSections.childNodes.length;
  for (var i = 1; i < attributeSectionsLength; i += 2) {

    var boosts = attributeSections.childNodes[i].querySelectorAll(boostNodeNames[0]);
    for (var boost of boosts) {
      
    }

  }
}
catch (error) {
  console.error(error);
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
  var htmlAttributeTableIndex = 0;

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

      // set the value in the html table
      document.getElementsByClassName('numeric')[htmlAttributeTableIndex].innerHTML = attributeSection.childNodes[i].textContent;

      // increment the html attribute table index
      htmlAttributeTableIndex++;
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
  document.getElementById('height').value = defaultHeight;

  // minimum and maximum heights
  var minHeight = convertFeetandInchesToInches(build.querySelector("Height").querySelector("minimum").textContent);
  var maxHeight = convertFeetandInchesToInches(build.querySelector("Height").querySelector("maximum").textContent);

  // set global weight variables
  globalPreviousHeight = minHeight;
  globalCurrentHeight = convertFeetandInchesToInches(defaultHeight);

  var heights = document.getElementById('height');

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
  document.getElementById('weight').value = defaultWeight;

  // minimum and maximum weights
  var minWeight = build.querySelector("Weight").querySelector("minimum").textContent;
  var maxWeight = build.querySelector("Weight").querySelector("maximum").textContent;

  // set the minimum and maximum weights for the html input box 
  var weight = document.getElementById("weight");
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
  var heights = document.getElementById('height');

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
  var heights = document.getElementById('height');

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
document.getElementById('confirm-type').addEventListener('click', function(){
  var playerBuild = document.getElementById('player-types');

  // set the default attributes to the html table
  setupNewBuild(playerBuild.value);

  // reset the upgrades
  resetUpgrades();
})

// When the confirm height button is clicked 
document.getElementById('confirm-height').addEventListener('click', function(){
  
  // set global variables for previous and current heights
  globalPreviousHeight = globalCurrentHeight;
  globalCurrentHeight = convertFeetandInchesToInches(document.getElementById('height').value);

  applyAttributeChangesFromPhysicalChanges(document.getElementById('player-types').value, globalPreviousHeight, globalCurrentHeight, "Height");
})

// When the confirm weight button is clicked 
document.getElementById('confirm-weight').addEventListener('click', function(){

  // set global variables for previous and current weights
  globalPreviousWeight = globalCurrentWeight;
  globalCurrentWeight = document.getElementById('weight').value;

  applyAttributeChangesFromPhysicalChanges(document.getElementById('player-types').value, globalPreviousWeight, globalCurrentWeight, "Weight");
})


/**
 * changeUpgradeOptionColour function.
 * Used to change upgrade display colour based on if it is positive (green), negative (red),
 * or zero (lightgray).
 * @param {number} i the index of the attribute
 */
function changeUpgradeOptionColour(i) {
  var attributeModifier = document.getElementsByClassName('upgrade-option-default');
  if (attributeModifier[i].innerHTML > 0) {
    attributeModifier[i].style.color = 'green';
  }
  else if (attributeModifier[i].innerHTML == 0) {
    attributeModifier[i].style.color = 'lightgray';
  }
  else {
    attributeModifier[i].style.color = 'red';
  }
}

/**
 * updateAvailableUpgradePoints function.
 * Used to update the available upgrade points for the appropriate attribute section.
 * @param {number} availUpgradePts the new available attribute points
 * @param {string} idName the id name of html label
 */
function updateAvailableUpgradePoints(availUpgradePts, idName) {
  document.getElementById(idName).innerHTML = availUpgradePts;
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
    var currentUpgradeModifier = parseInt(document.getElementsByClassName('upgrade-option-default')[i].innerHTML);

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
    console.log(document.getElementsByClassName('numeric').length);

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
                  document.getElementsByClassName('numeric')[attributeIndex].innerHTML = parseInt(document.getElementsByClassName('numeric')[attributeIndex].innerHTML) + parseInt(physicals[i].childNodes[j].textContent);
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
                  document.getElementsByClassName('numeric')[attributeIndex].innerHTML = parseInt(document.getElementsByClassName('numeric')[attributeIndex].innerHTML) + parseInt(physicals[i].childNodes[j].textContent) * -1;
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
      var currentUpgradeModifier = document.getElementsByClassName('upgrade-option-default')[i].innerHTML;
      var currentAttributeValue = document.getElementsByClassName('numeric')[i].innerHTML;

      // +5 is the maximum upgrade
      if (currentUpgradeModifier < 5 && currentAttributeValue < 99) {
        increaseOrDecreaseAttribute("increase", i);
      }
    })
  }

  // for the minus button
  for (let i = 0; i < minusSelection.length; i++) {

    minusSelection[i].addEventListener("click", async function() {
      var currentUpgradeModifier = document.getElementsByClassName('upgrade-option-default')[i].innerHTML;
      var currentAttributeValue = document.getElementsByClassName('numeric')[i].innerHTML;

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

  // increase/decrease the attribute and the current upgrade modifier
  document.getElementsByClassName('numeric')[i].innerHTML = parseInt(document.getElementsByClassName('numeric')[i].innerHTML) + upgradeAmount;
  document.getElementsByClassName('upgrade-option-default')[i].innerHTML = parseInt(document.getElementsByClassName('upgrade-option-default')[i].innerHTML) + upgradeAmount;
  
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
  updateAvailableUpgradePoints(availableUpgradePoints[j], idNames[j]); 
}

increasingAndDecreasingAttributes();

/**
 * Increasing attributes
 */
var userPlusSelection = document.getElementsByClassName('plus2');

for (let i = 0; i < userPlusSelection.length; i++) {
  userPlusSelection[i].addEventListener("click", async function() {

    // +5 is the maximum upgrade
    if (document.getElementsByClassName('upgrade-option-default')[i].innerHTML < 5 && 
    document.getElementsByClassName('numeric')[i].innerHTML < 99) {
      document.getElementsByClassName('numeric')[i].innerHTML++;
      document.getElementsByClassName('upgrade-option-default')[i].innerHTML++;
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
      updateAvailableUpgradePoints(availableUpgradePoints[j], idNames[j]); 
    }

  })
}

/**
 * Decreasing attributes
 */
var userMinusSelection = document.getElementsByClassName('minus2');

for (let i = 0; i < userMinusSelection.length; i++) {
  userMinusSelection[i].addEventListener("click", async function() {

    // the maximum downgrade is 5 (-5)
    if (document.getElementsByClassName('upgrade-option-default')[i].innerHTML > -5 && 
    document.getElementsByClassName('numeric')[i].innerHTML > 0) {
      document.getElementsByClassName('numeric')[i].innerHTML--;
      document.getElementsByClassName('upgrade-option-default')[i].innerHTML--;
  
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
      updateAvailableUpgradePoints(availableUpgradePoints[j], idNames[j]);
    }
  })
}
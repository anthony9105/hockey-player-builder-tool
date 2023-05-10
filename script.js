/**
 * 2022-2023
 * Anthony Liscio
 */

import {buildDataXMLFileName, allHeights} from "./constants.js";

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
  });
}

/**
 * setDefaultAttributes function.
 * Used to set all the default attributes for the specific build
 * @param {node} build 
 * @param {string} nameValue 
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
 * @param {node} build 
 */
function setBuildHeights(build) {
  // set default height
  var defaultHeight = build.querySelector("Height").querySelector("default").textContent;
  document.getElementById('height').value = defaultHeight;

  // minimum and maximum heights
  var minHeight = convertFeetAndInchesToCm(build.querySelector("Height").querySelector("minimum").textContent);
  var maxHeight = convertFeetAndInchesToCm(build.querySelector("Height").querySelector("maximum").textContent);

  var heights = document.getElementById('height');

  // for each height option
  for (var i = 0; i < heights.length; i++) {
    var currentHeight = convertFeetAndInchesToCm(heights[i].value);

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
 * @param {string} imperialHeight (height in feet and inches.
 *                                 Example: 5'11)
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
  var e = document.getElementById('player-types');
  var value = e.options[e.selectedIndex].value;
  var text = e.options[e.selectedIndex].text;

  // set the default attributes to the html table
  setupNewBuild(text);

  // reset the upgrades
  resetUpgrades();
})

// When the confirm height button is clicked 
document.getElementById('confirm-height').addEventListener('click', function(){
  var e = document.getElementById('height');
  var value = e.options[e.selectedIndex].value;
  var text = e.options[e.selectedIndex].text;
  console.log(value);
  console.log(text);
})

// When the confirm weight button is clicked 
document.getElementById('confirm-weight').addEventListener('click', function(){
  var newWeight = document.getElementById('weight');
  console.log(newWeight.value);

})

// change upgrade display colour based on if it is positive (green) or negative (red)
function changeUpgradeOptionColour(i) {
  if (document.getElementsByClassName('upgrade-option-default')[i].innerHTML > 0) {
    document.getElementsByClassName('upgrade-option-default')[i].style.color = 'green';
  }
  else if (document.getElementsByClassName('upgrade-option-default')[i].innerHTML == 0) {
    document.getElementsByClassName('upgrade-option-default')[i].style.color = 'lightgray';
  }
  else {
    document.getElementsByClassName('upgrade-option-default')[i].style.color = 'red';
  }
}

// increase attributes
var userPlusSelection = document.getElementsByClassName('plus2');

for (let i = 0; i < userPlusSelection.length; i++) {
  userPlusSelection[i].addEventListener("click", function() {

    // +5 is the maximum upgrade
    if (document.getElementsByClassName('upgrade-option-default')[i].innerHTML < 5 && 
    document.getElementsByClassName('numeric')[i].innerHTML < 99) {
      document.getElementsByClassName('numeric')[i].innerHTML++;
      document.getElementsByClassName('upgrade-option-default')[i].innerHTML++;
      changeUpgradeOptionColour(i);
    }

  })
}


// decrease attributes
var userMinusSelection = document.getElementsByClassName('minus2');

for (let i = 0; i < userMinusSelection.length; i++) {
  userMinusSelection[i].addEventListener("click", function() {

    // the maximum downgrade is 5 (-5)
    if (document.getElementsByClassName('upgrade-option-default')[i].innerHTML > -5 && 
    document.getElementsByClassName('numeric')[i].innerHTML > 0) {
      document.getElementsByClassName('numeric')[i].innerHTML--;
      document.getElementsByClassName('upgrade-option-default')[i].innerHTML--;
  
      changeUpgradeOptionColour(i);
    }
  })
}
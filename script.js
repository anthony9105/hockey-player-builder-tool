import {buildDataXMLFileName} from "./constants.js";


/**
 * setDefaultAttributes function.
 * Used to set the default attributes of the specified buildName on the html attributes table.
 * It fetches the data found in the build_data.xml file.
 * @param {string} buildName 
 */
function setDefaultAttributes(buildName) {

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

        // set default height
        var defaultHeight = build.querySelector("Height").querySelector("default").textContent;
        document.getElementById('height').value = defaultHeight;

        // set default weight
        var defaultWeight = build.querySelector("Weight").querySelector("default").textContent;
        document.getElementById('weight').value = defaultWeight;

      }
    }
  });
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
  setDefaultAttributes(text);
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
  var e = document.getElementById('weight');
  console.log(e.value);
})

// change upgrade display colour based on if it is positive (green) or negative (red)
function changeUpgradeOptionColour(i)
{
  if (document.getElementsByClassName('upgrade-option-default')[i].innerHTML > 0)
  {
    document.getElementsByClassName('upgrade-option-default')[i].style.color = 'green';
  }
  else if (document.getElementsByClassName('upgrade-option-default')[i].innerHTML == 0)
  {
    document.getElementsByClassName('upgrade-option-default')[i].style.color = 'lightgray';
  }
  else
  {
    document.getElementsByClassName('upgrade-option-default')[i].style.color = 'red';
  }
}

// increase attributes
var userPlusSelection = document.getElementsByClassName('plus');

for(let i = 0; i < userPlusSelection.length; i++) {
  userPlusSelection[i].addEventListener("click", function() {
    document.getElementsByClassName('numeric')[i].innerHTML++;
    document.getElementsByClassName('upgrade-option-default')[i].innerHTML++;

    changeUpgradeOptionColour(i);
  })
}


// decrease attributes
var userMinusSelection = document.getElementsByClassName('minus');

for(let i = 0; i < userMinusSelection.length; i++) {
  userMinusSelection[i].addEventListener("click", function() {
    document.getElementsByClassName('numeric')[i].innerHTML--;
    document.getElementsByClassName('upgrade-option-default')[i].innerHTML--;

    changeUpgradeOptionColour(i);
  })
}
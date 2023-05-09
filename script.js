import {attributeSectionNames, buildDataXMLFileName} from "./constants.js";


/**
 * setDefaultAttributes function.
 * Used to set the default attributes of the specified buildName on the html attributes table.
 * It fetches the data found in the build_data.xml file.
 * @param {string} buildName 
 */
function setDefaultAttributes(buildName) {
  fetch(buildDataXMLFileName).then(response => {
    return response.text();
  }).then(xmlString => {
    var xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");
    var builds = xmlDoc.querySelectorAll("Build");

    for (var build of builds) {
      var nameValue = build.querySelector("Name").textContent;
      if (nameValue === buildName) {
        console.log(nameValue);
        var defaultAttributes = build.querySelectorAll("DefaultAttributes");

        for (var defaultAttribute of defaultAttributes) {
          var htmlAttributeTableIndex = 0;

          // Technique Attributes
          var attributeSection = defaultAttribute.querySelector(attributeSectionNames[0]);
          var amountOfAttributesInSection = Math.floor(attributeSection.childNodes.length / 2);
          for (var i = 1; i < amountOfAttributesInSection * 2; i += 2) {
            document.getElementsByClassName('numeric')[htmlAttributeTableIndex].innerHTML = attributeSection.childNodes[i].textContent;
            htmlAttributeTableIndex++;
          }

          // Power Attributes
          attributeSection = defaultAttribute.querySelector(attributeSectionNames[1]);
          amountOfAttributesInSection = Math.floor(attributeSection.childNodes.length / 2);
          for (var i = 1; i < amountOfAttributesInSection * 2; i += 2) {
            document.getElementsByClassName('numeric')[htmlAttributeTableIndex].innerHTML = attributeSection.childNodes[i].textContent;
            htmlAttributeTableIndex++;
          }

          // Playstyle Attributes
          attributeSection = defaultAttribute.querySelector(attributeSectionNames[2]);
          amountOfAttributesInSection = Math.floor(attributeSection.childNodes.length / 2);
          for (var i = 1; i < amountOfAttributesInSection * 2; i += 2) {
            document.getElementsByClassName('numeric')[htmlAttributeTableIndex].innerHTML = attributeSection.childNodes[i].textContent;
            htmlAttributeTableIndex++;
          }

          // Tenacity Attributes
          attributeSection = defaultAttribute.querySelector(attributeSectionNames[3]);
          amountOfAttributesInSection = Math.floor(attributeSection.childNodes.length / 2);
          for (var i = 1; i < amountOfAttributesInSection * 2; i += 2) {
            document.getElementsByClassName('numeric')[htmlAttributeTableIndex].innerHTML = attributeSection.childNodes[i].textContent;
            htmlAttributeTableIndex++;
          }

          // Tactics Attributes
          attributeSection = defaultAttribute.querySelector(attributeSectionNames[4]);
          amountOfAttributesInSection = Math.floor(attributeSection.childNodes.length / 2);
          for (var i = 1; i < amountOfAttributesInSection * 2; i += 2) {
            document.getElementsByClassName('numeric')[htmlAttributeTableIndex].innerHTML = attributeSection.childNodes[i].textContent;
            htmlAttributeTableIndex++;
          }
        }
      }
    }
  });
}

// When the confirm player build button is clicked 
document.getElementById('confirm-type').addEventListener('click', function(){
  var e = document.getElementById('player-types');
  var value = e.options[e.selectedIndex].value;
  var text = e.options[e.selectedIndex].text;

  // set the default attributes to the html table
  setDefaultAttributes(text);
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
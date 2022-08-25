/*
document.getElementById('box').addEventListener('click', function(){
    alert('I got clicked');
})

document.getElementById('box').addEventListener('copy', function(){
    alert("I was copied");
})

document.getElementById('box').addEventListener('wheel', function(){
    alert("Wheel scrolled over this");
})

*/


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

// When the confirm player build button is clicked 
document.getElementById('confirm-type').addEventListener('click', function(){
  var e = document.getElementById('player-types');
  var value = e.options[e.selectedIndex].value;
  var text = e.options[e.selectedIndex].text;
  console.log(value);
  console.log(text);

  switch (text)
  {
    case "Sniper":
      sniperDefault();
      break;
    case "Dangler":
      danglerDefault();
      break;
    case "Playmaker":
      playmakerDefault();
      break;
    case "Two-way Forward":
      twoWayFwdDefault();
      break;
    case "Power Forward":
      powerFwdDefault();
      break;
    case "Grinder":
      grinderDefault();
      break;
    case "Enforcer":
      enforcerDefault();
      break;
    case "Puckmoving Defenseman":
      puckMovingDefault();
      break;
    case "Two-way Defenseman":
      twoWayDefDefault();
      break;
    case "Offensive Defenseman":
      offDefDefault();
      break;
    case "Defensive Defenseman":
      defDefDefault();
      break;
    case "Enforcer Defenseman":
      enfDefDefault();
      break;
  }
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

// assign player build starting attributes for sniper
function sniperDefault()
{
  document.getElementsByClassName('numeric')[0].innerHTML = 88;
  document.getElementsByClassName('numeric')[1].innerHTML = 86;
  document.getElementsByClassName('numeric')[2].innerHTML = 85;
  document.getElementsByClassName('numeric')[3].innerHTML = 72;
  document.getElementsByClassName('numeric')[4].innerHTML = 85;
  document.getElementsByClassName('numeric')[5].innerHTML = 88;
  document.getElementsByClassName('numeric')[6].innerHTML = 88;
  document.getElementsByClassName('numeric')[7].innerHTML = 85;
  document.getElementsByClassName('numeric')[8].innerHTML = 85;
  document.getElementsByClassName('numeric')[9].innerHTML = 83;
  document.getElementsByClassName('numeric')[10].innerHTML = 80;
  document.getElementsByClassName('numeric')[11].innerHTML = 89;
  document.getElementsByClassName('numeric')[12].innerHTML = 72;
  document.getElementsByClassName('numeric')[13].innerHTML = 72;
  document.getElementsByClassName('numeric')[14].innerHTML = 71;
  document.getElementsByClassName('numeric')[15].innerHTML = 80;
  document.getElementsByClassName('numeric')[16].innerHTML = 73;
  document.getElementsByClassName('numeric')[17].innerHTML = 72;
  document.getElementsByClassName('numeric')[18].innerHTML = 75;
  document.getElementsByClassName('numeric')[19].innerHTML = 79;
  document.getElementsByClassName('numeric')[20].innerHTML = 85;
  document.getElementsByClassName('numeric')[21].innerHTML = 81;
  document.getElementsByClassName('numeric')[22].innerHTML = 72;
}

// assign player build starting attributes for dangler
function danglerDefault()
{
  document.getElementsByClassName('numeric')[0].innerHTML = 83;
  document.getElementsByClassName('numeric')[1].innerHTML = 82;
  document.getElementsByClassName('numeric')[2].innerHTML = 85;
  document.getElementsByClassName('numeric')[3].innerHTML = 72;
  document.getElementsByClassName('numeric')[4].innerHTML = 85;
  document.getElementsByClassName('numeric')[5].innerHTML = 79;
  document.getElementsByClassName('numeric')[6].innerHTML = 79;
  document.getElementsByClassName('numeric')[7].innerHTML = 85;
  document.getElementsByClassName('numeric')[8].innerHTML = 87;
  document.getElementsByClassName('numeric')[9].innerHTML = 83;
  document.getElementsByClassName('numeric')[10].innerHTML = 82;
  document.getElementsByClassName('numeric')[11].innerHTML = 88;
  document.getElementsByClassName('numeric')[12].innerHTML = 72;
  document.getElementsByClassName('numeric')[13].innerHTML = 75;
  document.getElementsByClassName('numeric')[14].innerHTML = 73;
  document.getElementsByClassName('numeric')[15].innerHTML = 82;
  document.getElementsByClassName('numeric')[16].innerHTML = 73;
  document.getElementsByClassName('numeric')[17].innerHTML = 72;
  document.getElementsByClassName('numeric')[18].innerHTML = 73;
  document.getElementsByClassName('numeric')[19].innerHTML = 90;
  document.getElementsByClassName('numeric')[20].innerHTML = 85;
  document.getElementsByClassName('numeric')[21].innerHTML = 82;
  document.getElementsByClassName('numeric')[22].innerHTML = 72;
}

// assign player build starting attributes for playmaker
function playmakerDefault()
{
  /*
  document.getElementsByClassName('numeric')[0].innerHTML = 83;
  document.getElementsByClassName('numeric')[1].innerHTML = 82;
  document.getElementsByClassName('numeric')[2].innerHTML = 80;
  document.getElementsByClassName('numeric')[3].innerHTML = 76;
  document.getElementsByClassName('numeric')[4].innerHTML = 80;
  document.getElementsByClassName('numeric')[5].innerHTML = 81;
  document.getElementsByClassName('numeric')[6].innerHTML = 81;
  document.getElementsByClassName('numeric')[7].innerHTML = 80;
  document.getElementsByClassName('numeric')[8].innerHTML = 84;
  document.getElementsByClassName('numeric')[9].innerHTML = 81;
  document.getElementsByClassName('numeric')[10].innerHTML = 85;
  document.getElementsByClassName('numeric')[11].innerHTML = 86;
  document.getElementsByClassName('numeric')[12].innerHTML = 76;
  document.getElementsByClassName('numeric')[13].innerHTML = 85;
  document.getElementsByClassName('numeric')[14].innerHTML = 88;
  document.getElementsByClassName('numeric')[15].innerHTML = 83;
  document.getElementsByClassName('numeric')[16].innerHTML = 78;
  document.getElementsByClassName('numeric')[17].innerHTML = 77;
  document.getElementsByClassName('numeric')[18].innerHTML = 85;
  document.getElementsByClassName('numeric')[19].innerHTML = 80;
  document.getElementsByClassName('numeric')[20].innerHTML = 85;
  document.getElementsByClassName('numeric')[21].innerHTML = 84;
  document.getElementsByClassName('numeric')[22].innerHTML = 75;*/
}

// assign player build starting attributes for two-way forward
function twoWayFwdDefault()
{
  document.getElementsByClassName('numeric')[0].innerHTML = 83;
  document.getElementsByClassName('numeric')[1].innerHTML = 82;
  document.getElementsByClassName('numeric')[2].innerHTML = 80;
  document.getElementsByClassName('numeric')[3].innerHTML = 76;
  document.getElementsByClassName('numeric')[4].innerHTML = 80;
  document.getElementsByClassName('numeric')[5].innerHTML = 81;
  document.getElementsByClassName('numeric')[6].innerHTML = 81;
  document.getElementsByClassName('numeric')[7].innerHTML = 80;
  document.getElementsByClassName('numeric')[8].innerHTML = 84;
  document.getElementsByClassName('numeric')[9].innerHTML = 81;
  document.getElementsByClassName('numeric')[10].innerHTML = 85;
  document.getElementsByClassName('numeric')[11].innerHTML = 86;
  document.getElementsByClassName('numeric')[12].innerHTML = 76;
  document.getElementsByClassName('numeric')[13].innerHTML = 85;
  document.getElementsByClassName('numeric')[14].innerHTML = 88;
  document.getElementsByClassName('numeric')[15].innerHTML = 83;
  document.getElementsByClassName('numeric')[16].innerHTML = 78;
  document.getElementsByClassName('numeric')[17].innerHTML = 77;
  document.getElementsByClassName('numeric')[18].innerHTML = 85;
  document.getElementsByClassName('numeric')[19].innerHTML = 80;
  document.getElementsByClassName('numeric')[20].innerHTML = 85;
  document.getElementsByClassName('numeric')[21].innerHTML = 84;
  document.getElementsByClassName('numeric')[22].innerHTML = 75;
}

// assign player build starting attributes for power forward
function powerFwdDefault()
{
  document.getElementsByClassName('numeric')[0].innerHTML = 81;
  document.getElementsByClassName('numeric')[1].innerHTML = 83;
  document.getElementsByClassName('numeric')[2].innerHTML = 77;
  document.getElementsByClassName('numeric')[3].innerHTML = 84;
  document.getElementsByClassName('numeric')[4].innerHTML = 77;
  document.getElementsByClassName('numeric')[5].innerHTML = 83;
  document.getElementsByClassName('numeric')[6].innerHTML = 86;
  document.getElementsByClassName('numeric')[7].innerHTML = 77;
  document.getElementsByClassName('numeric')[8].innerHTML = 87;
  document.getElementsByClassName('numeric')[9].innerHTML = 78;
  document.getElementsByClassName('numeric')[10].innerHTML = 80;
  document.getElementsByClassName('numeric')[11].innerHTML = 86;
  document.getElementsByClassName('numeric')[12].innerHTML = 86;
  document.getElementsByClassName('numeric')[13].innerHTML = 80;
  document.getElementsByClassName('numeric')[14].innerHTML = 77;
  document.getElementsByClassName('numeric')[15].innerHTML = 80;
  document.getElementsByClassName('numeric')[16].innerHTML = 86;
  document.getElementsByClassName('numeric')[17].innerHTML = 86;
  document.getElementsByClassName('numeric')[18].innerHTML = 85;
  document.getElementsByClassName('numeric')[19].innerHTML = 78;
  document.getElementsByClassName('numeric')[20].innerHTML = 85;
  document.getElementsByClassName('numeric')[21].innerHTML = 84;
  document.getElementsByClassName('numeric')[22].innerHTML = 85;
}

// assign player build starting attributes for grinder
function grinderDefault()
{
  document.getElementsByClassName('numeric')[0].innerHTML = 80;
  document.getElementsByClassName('numeric')[1].innerHTML = 80;
  document.getElementsByClassName('numeric')[2].innerHTML = 80;
  document.getElementsByClassName('numeric')[3].innerHTML = 76;
  document.getElementsByClassName('numeric')[4].innerHTML = 80;
  document.getElementsByClassName('numeric')[5].innerHTML = 82;
  document.getElementsByClassName('numeric')[6].innerHTML = 82;
  document.getElementsByClassName('numeric')[7].innerHTML = 80;
  document.getElementsByClassName('numeric')[8].innerHTML = 83;
  document.getElementsByClassName('numeric')[9].innerHTML = 81;
  document.getElementsByClassName('numeric')[10].innerHTML = 79;
  document.getElementsByClassName('numeric')[11].innerHTML = 83;
  document.getElementsByClassName('numeric')[12].innerHTML = 76;
  document.getElementsByClassName('numeric')[13].innerHTML = 88;
  document.getElementsByClassName('numeric')[14].innerHTML = 85;
  document.getElementsByClassName('numeric')[15].innerHTML = 86;
  document.getElementsByClassName('numeric')[16].innerHTML = 78;
  document.getElementsByClassName('numeric')[17].innerHTML = 77;
  document.getElementsByClassName('numeric')[18].innerHTML = 90;
  document.getElementsByClassName('numeric')[19].innerHTML = 75;
  document.getElementsByClassName('numeric')[20].innerHTML = 85;
  document.getElementsByClassName('numeric')[21].innerHTML = 88;
  document.getElementsByClassName('numeric')[22].innerHTML = 75;
}

// assign player build starting attributes for enforcer
function enforcerDefault()
{
  document.getElementsByClassName('numeric')[0].innerHTML = 80;
  document.getElementsByClassName('numeric')[1].innerHTML = 78;
  document.getElementsByClassName('numeric')[2].innerHTML = 77;
  document.getElementsByClassName('numeric')[3].innerHTML = 84;
  document.getElementsByClassName('numeric')[4].innerHTML = 77;
  document.getElementsByClassName('numeric')[5].innerHTML = 82;
  document.getElementsByClassName('numeric')[6].innerHTML = 83;
  document.getElementsByClassName('numeric')[7].innerHTML = 77;
  document.getElementsByClassName('numeric')[8].innerHTML = 82;
  document.getElementsByClassName('numeric')[9].innerHTML = 78;
  document.getElementsByClassName('numeric')[10].innerHTML = 79;
  document.getElementsByClassName('numeric')[11].innerHTML = 79;
  document.getElementsByClassName('numeric')[12].innerHTML = 86;
  document.getElementsByClassName('numeric')[13].innerHTML = 75;
  document.getElementsByClassName('numeric')[14].innerHTML = 75;
  document.getElementsByClassName('numeric')[15].innerHTML = 79;
  document.getElementsByClassName('numeric')[16].innerHTML = 86;
  document.getElementsByClassName('numeric')[17].innerHTML = 86;
  document.getElementsByClassName('numeric')[18].innerHTML = 80;
  document.getElementsByClassName('numeric')[19].innerHTML = 70;
  document.getElementsByClassName('numeric')[20].innerHTML = 85;
  document.getElementsByClassName('numeric')[21].innerHTML = 80;
  document.getElementsByClassName('numeric')[22].innerHTML = 85;
}

// assign player build starting attributes for puckmoving defenseman
function puckMovingDefault()
{
  document.getElementsByClassName('numeric')[0].innerHTML = 81;
  document.getElementsByClassName('numeric')[1].innerHTML = 82;
  document.getElementsByClassName('numeric')[2].innerHTML = 85;
  document.getElementsByClassName('numeric')[3].innerHTML = 72;
  document.getElementsByClassName('numeric')[4].innerHTML = 85;
  document.getElementsByClassName('numeric')[5].innerHTML = 79;
  document.getElementsByClassName('numeric')[6].innerHTML = 79;
  document.getElementsByClassName('numeric')[7].innerHTML = 85;
  document.getElementsByClassName('numeric')[8].innerHTML = 88;
  document.getElementsByClassName('numeric')[9].innerHTML = 83;
  document.getElementsByClassName('numeric')[10].innerHTML = 87;
  document.getElementsByClassName('numeric')[11].innerHTML = 87;
  document.getElementsByClassName('numeric')[12].innerHTML = 72;
  document.getElementsByClassName('numeric')[13].innerHTML = 81;
  document.getElementsByClassName('numeric')[14].innerHTML = 85;
  document.getElementsByClassName('numeric')[15].innerHTML = 82;
  document.getElementsByClassName('numeric')[16].innerHTML = 73;
  document.getElementsByClassName('numeric')[17].innerHTML = 72;
  document.getElementsByClassName('numeric')[18].innerHTML = 80;
  document.getElementsByClassName('numeric')[19].innerHTML = 84;
  document.getElementsByClassName('numeric')[20].innerHTML = 80;
  document.getElementsByClassName('numeric')[21].innerHTML = 82;
  document.getElementsByClassName('numeric')[22].innerHTML = 72;
}

// assign player build starting attributes for two-way defenseman
function twoWayDefDefault()
{
  document.getElementsByClassName('numeric')[0].innerHTML = 82;
  document.getElementsByClassName('numeric')[1].innerHTML = 82;
  document.getElementsByClassName('numeric')[2].innerHTML = 80;
  document.getElementsByClassName('numeric')[3].innerHTML = 75;
  document.getElementsByClassName('numeric')[4].innerHTML = 80;
  document.getElementsByClassName('numeric')[5].innerHTML = 81;
  document.getElementsByClassName('numeric')[6].innerHTML = 82;
  document.getElementsByClassName('numeric')[7].innerHTML = 80;
  document.getElementsByClassName('numeric')[8].innerHTML = 84;
  document.getElementsByClassName('numeric')[9].innerHTML = 81;
  document.getElementsByClassName('numeric')[10].innerHTML = 85;
  document.getElementsByClassName('numeric')[11].innerHTML = 83;
  document.getElementsByClassName('numeric')[12].innerHTML = 76;
  document.getElementsByClassName('numeric')[13].innerHTML = 85;
  document.getElementsByClassName('numeric')[14].innerHTML = 88;
  document.getElementsByClassName('numeric')[15].innerHTML = 82;
  document.getElementsByClassName('numeric')[16].innerHTML = 78;
  document.getElementsByClassName('numeric')[17].innerHTML = 77;
  document.getElementsByClassName('numeric')[18].innerHTML = 88;
  document.getElementsByClassName('numeric')[19].innerHTML = 75;
  document.getElementsByClassName('numeric')[20].innerHTML = 80;
  document.getElementsByClassName('numeric')[21].innerHTML = 87;
  document.getElementsByClassName('numeric')[22].innerHTML = 75;
}

// assign player build starting attributes for offensive defenseman
function offDefDefault()
{
  document.getElementsByClassName('numeric')[0].innerHTML = 83;
  document.getElementsByClassName('numeric')[1].innerHTML = 85;
  document.getElementsByClassName('numeric')[2].innerHTML = 80;
  document.getElementsByClassName('numeric')[3].innerHTML = 76;
  document.getElementsByClassName('numeric')[4].innerHTML = 80;
  document.getElementsByClassName('numeric')[5].innerHTML = 83;
  document.getElementsByClassName('numeric')[6].innerHTML = 87;
  document.getElementsByClassName('numeric')[7].innerHTML = 80;
  document.getElementsByClassName('numeric')[8].innerHTML = 85;
  document.getElementsByClassName('numeric')[9].innerHTML = 81;
  document.getElementsByClassName('numeric')[10].innerHTML = 82;
  document.getElementsByClassName('numeric')[11].innerHTML = 88;
  document.getElementsByClassName('numeric')[12].innerHTML = 76;
  document.getElementsByClassName('numeric')[13].innerHTML = 79;
  document.getElementsByClassName('numeric')[14].innerHTML = 80;
  document.getElementsByClassName('numeric')[15].innerHTML = 83;
  document.getElementsByClassName('numeric')[16].innerHTML = 78;
  document.getElementsByClassName('numeric')[17].innerHTML = 77;
  document.getElementsByClassName('numeric')[18].innerHTML = 79;
  document.getElementsByClassName('numeric')[19].innerHTML = 78;
  document.getElementsByClassName('numeric')[20].innerHTML = 80;
  document.getElementsByClassName('numeric')[21].innerHTML = 82;
  document.getElementsByClassName('numeric')[22].innerHTML = 75;
}

// assign player build starting attributes for defensive defenseman
function defDefDefault()
{
  document.getElementsByClassName('numeric')[0].innerHTML = 79;
  document.getElementsByClassName('numeric')[1].innerHTML = 79;
  document.getElementsByClassName('numeric')[2].innerHTML = 77;
  document.getElementsByClassName('numeric')[3].innerHTML = 84;
  document.getElementsByClassName('numeric')[4].innerHTML = 77;
  document.getElementsByClassName('numeric')[5].innerHTML = 81;
  document.getElementsByClassName('numeric')[6].innerHTML = 85;
  document.getElementsByClassName('numeric')[7].innerHTML = 77;
  document.getElementsByClassName('numeric')[8].innerHTML = 83;
  document.getElementsByClassName('numeric')[9].innerHTML = 78;
  document.getElementsByClassName('numeric')[10].innerHTML = 79;
  document.getElementsByClassName('numeric')[11].innerHTML = 79;
  document.getElementsByClassName('numeric')[12].innerHTML = 86;
  document.getElementsByClassName('numeric')[13].innerHTML = 90;
  document.getElementsByClassName('numeric')[14].innerHTML = 90;
  document.getElementsByClassName('numeric')[15].innerHTML = 80;
  document.getElementsByClassName('numeric')[16].innerHTML = 86;
  document.getElementsByClassName('numeric')[17].innerHTML = 86;
  document.getElementsByClassName('numeric')[18].innerHTML = 90;
  document.getElementsByClassName('numeric')[19].innerHTML = 70;
  document.getElementsByClassName('numeric')[20].innerHTML = 80;
  document.getElementsByClassName('numeric')[21].innerHTML = 90;
  document.getElementsByClassName('numeric')[22].innerHTML = 85;
}

// assign player build starting attributes for enforcer defenseman
function enfDefDefault()
{
  document.getElementsByClassName('numeric')[0].innerHTML = 79;
  document.getElementsByClassName('numeric')[1].innerHTML = 79;
  document.getElementsByClassName('numeric')[2].innerHTML = 77;
  document.getElementsByClassName('numeric')[3].innerHTML = 84;
  document.getElementsByClassName('numeric')[4].innerHTML = 77;
  document.getElementsByClassName('numeric')[5].innerHTML = 81;
  document.getElementsByClassName('numeric')[6].innerHTML = 84;
  document.getElementsByClassName('numeric')[7].innerHTML = 77;
  document.getElementsByClassName('numeric')[8].innerHTML = 82;
  document.getElementsByClassName('numeric')[9].innerHTML = 78;
  document.getElementsByClassName('numeric')[10].innerHTML = 79;
  document.getElementsByClassName('numeric')[11].innerHTML = 75;
  document.getElementsByClassName('numeric')[12].innerHTML = 86;
  document.getElementsByClassName('numeric')[13].innerHTML = 79;
  document.getElementsByClassName('numeric')[14].innerHTML = 80;
  document.getElementsByClassName('numeric')[15].innerHTML = 79;
  document.getElementsByClassName('numeric')[16].innerHTML = 86;
  document.getElementsByClassName('numeric')[17].innerHTML = 86;
  document.getElementsByClassName('numeric')[18].innerHTML = 80;
  document.getElementsByClassName('numeric')[19].innerHTML = 70;
  document.getElementsByClassName('numeric')[20].innerHTML = 80;
  document.getElementsByClassName('numeric')[21].innerHTML = 78;
  document.getElementsByClassName('numeric')[22].innerHTML = 85;
}

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
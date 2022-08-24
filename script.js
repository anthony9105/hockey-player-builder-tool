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

// increase attributes
var userPlusSelection = document.getElementsByClassName('plus');

for(let i = 0; i < userPlusSelection.length; i++) {
    userPlusSelection[i].addEventListener("click", function() {
    document.getElementsByClassName('numeric')[i].innerHTML++;
  })
}


// decrease attributes
var userMinusSelection = document.getElementsByClassName('minus');

for(let i = 0; i < userMinusSelection.length; i++) {
    userMinusSelection[i].addEventListener("click", function() {
    document.getElementsByClassName('numeric')[i].innerHTML--;
  })
}
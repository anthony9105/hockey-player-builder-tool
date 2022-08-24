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

var row = document.getElementsByClassName("section1")[0];
var cell1 = row.getElementsByClassName("numeric")[0];
cell1.innerHTML = '81';
console.log(cell1);


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
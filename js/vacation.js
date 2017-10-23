var output = document.getElementById("temperature");
var slider = document.getElementById("slider");
var tempChange;

slider.oninput = function() {
    tempChange = Math.round(10 * parseFloat(this.value))/10;
    output.innerHTML = tempChange.toFixed(1);

    Visibility();

   }

document.getElementById("raiseTemp").onclick = function() {
  //handles temperature raise
  tempChange = Math.round(10 * (parseFloat(output.innerHTML) + 0.1))/10;
  if (tempChange < 30.1) {
    output.innerHTML = tempChange.toFixed(1);
    slider.value = tempChange.toFixed(1);
  }

  Visibility();

}

document.getElementById("lowerTemp").onclick = function() {
  //handles temperature lower
  tempChange = Math.round(10 * (parseFloat(output.innerHTML) - 0.1))/10;
  if (tempChange > 4.9) {
    output.innerHTML = tempChange.toFixed(1);
    slider.value = tempChange.toFixed(1);
  }

  Visibility();

}

function Visibility() {

  if (tempChange > 29.9) {
    document.getElementById("raiseTemp").style.visibility = 'hidden';
  }
  if (tempChange < 30) {
    document.getElementById("raiseTemp").style.visibility = 'visible';
  }
  if (tempChange < 5.1) {
    document.getElementById("lowerTemp").style.visibility = 'hidden';
  }
  if (tempChange > 5) {
    document.getElementById("lowerTemp").style.visibility = 'visible';
  }
}

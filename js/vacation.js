var output = document.getElementById("temperature");
var slider = document.getElementById("slider");

slider.oninput = function() {
       output.innerHTML = this.value;
   }

document.getElementById("raiseTemp").onclick = function() {
  var tempChange = Math.round(10 * (parseFloat(output.innerHTML) + 0.1))/10;
  output.innerHTML = tempChange;
  slider.value = tempChange;
}

document.getElementById("lowerTemp").onclick = function() {
  var tempChange = Math.round(10 * (parseFloat(output.innerHTML) - 0.1))/10;
  output.innerHTML = tempChange;
  slider.value = tempChange;

}

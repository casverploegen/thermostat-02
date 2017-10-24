var output = document.getElementById("temperature");
var currentOutput = document.getElementById("currentTemperature");
var slider = document.getElementById("slider");
var tempChange = get("targetTemperature", "target_temperature");

setTargetValues();
Visibility();
// get("currentTemperature", "current_temperature").onchange = function() {
//   currentOutput.innerHTML = get("currentTemperature", "current_temperature")
// }

currentOutput.innerHTML = get("currentTemperature", "current_temperature");
setInterval(function() {
  if (currentOutput.innerHTML != tempChange)
  currentOutput.innerHTML = get("currentTemperature", "current_temperature");
}, 1500);


slider.oninput = function() {
    tempChange = Math.round(10 * parseFloat(this.value))/10;
    output.innerHTML = tempChange.toFixed(1);

    updateTarget()
    Visibility();

   }

document.getElementById("raiseTemp").onclick = function() {
  //handles temperature raise
  tempChange = Math.round(10 * (parseFloat(output.innerHTML) + 0.1))/10;
  output.innerHTML = tempChange.toFixed(1);
  slider.value = tempChange.toFixed(1);

  updateTarget()
  Visibility();

}

document.getElementById("lowerTemp").onclick = function() {
  //handles temperature lower
  tempChange = Math.round(10 * (parseFloat(output.innerHTML) - 0.1))/10;
  output.innerHTML = tempChange.toFixed(1);
  slider.value = tempChange.toFixed(1);

  updateTarget()
  Visibility();

}

document.getElementById("vacationEnableSlider").onclick = function() {
  var off =  (document.getElementById("vacationEnableSlider").getAttribute('value') == 0);
  if (off) {
    document.getElementById("vacationEnableSlider").setAttribute('value', 1);
    put("targetTemperature", "target_temperature", (Math.round(10 *parseFloat(output.innerHTML))/10).toFixed(1));
    put("weekProgramState", "week_program_state", "off");
  } else {
    document.getElementById("vacationEnableSlider").setAttribute('value', 0);
    put("weekProgramState", "week_program_state", "on");
    output.innerHTML = get("targetTemperature", "target_temperature");
    setTimeout(function() {
      output.innerHTML = get("targetTemperature", "target_temperature");
    }, 1);
  }
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

function updateTarget() {
  var on =  (document.getElementById("vacationEnableSlider").getAttribute('value') == 1);
  if (on) {
    put("targetTemperature", "target_temperature", (Math.round(10 *parseFloat(output.innerHTML))/10).toFixed(1));
  }
}

function setTargetValues() {
  output.innerHTML = get("targetTemperature", "target_temperature");
  slider.value = get("targetTemperature", "target_temperature");
  if (get("weekProgramState", "week_program_state") == 'off') {
    document.getElementById("vacationEnableSlider").setAttribute('value', 1);
    document.getElementById("mySwitch").checked = true;
  }
}

var output = document.getElementById("temperature");
var currentOutput = document.getElementById("currentTemperature");
var slider = document.getElementById("slider");
var tempChange = get("targetTemperature", "target_temperature");
var correctTarget = get("targetTemperature", "target_temperature");
setTargetValues();
Visibility(tempChange);


currentOutput.innerHTML = get("currentTemperature", "current_temperature");

slider.oninput = function() {
    var showTempChange = Math.round(10 * parseFloat(this.value))/10;
    output.innerHTML = showTempChange.toFixed(1);
}

slider.onchange = function() {

    tempChange = Math.round(10 * parseFloat(this.value ))/10;
    updateTarget(tempChange)
    Visibility(tempChange);

}

document.getElementById("raiseTemp").onclick = function() {
  //handles temperature raise
  tempChange = Math.round(10 * (parseFloat(output.innerHTML) + 0.1))/10;
  output.innerHTML = tempChange.toFixed(1);
  slider.value = tempChange.toFixed(1);

  updateTarget(tempChange)
  Visibility(tempChange);

}

document.getElementById("lowerTemp").onclick = function() {
  //handles temperature lower
  tempChange = Math.round(10 * (parseFloat(output.innerHTML) - 0.1))/10;
  output.innerHTML = tempChange.toFixed(1);
  slider.value = tempChange.toFixed(1);

  updateTarget(tempChange)
  Visibility(tempChange);

}

document.getElementById("vacationEnableSlider").onclick = function() {
  var off =  (document.getElementById("vacationEnableSlider").getAttribute('value') == 0);
  if (off) {
    document.getElementById("vacationEnableSlider").setAttribute('value', 1);
    put("targetTemperature", "target_temperature", (Math.round(10 *parseFloat(output.innerHTML))/10).toFixed(1));
    put("weekProgramState", "week_program_state", "off");
    restrictFunctionality();
  } else {
    document.getElementById("vacationEnableSlider").setAttribute('value', 0);
    put("weekProgramState", "week_program_state", "on");
    output.innerHTML = get("targetTemperature", "target_temperature");
    restoreFunctionality();
    setTimeout(function() {
      output.innerHTML = get("targetTemperature", "target_temperature");
    }, 1000);
  }
}

function Visibility(v) {

  if (v > 29.9) {
    document.getElementById("raiseTemp").style.visibility = 'hidden';
  }
  if (v < 30) {
    document.getElementById("raiseTemp").style.visibility = 'visible';
  }
  if (v < 5.1) {
    document.getElementById("lowerTemp").style.visibility = 'hidden';
  }
  if (v > 5) {
    document.getElementById("lowerTemp").style.visibility = 'visible';
  }
}

function updateTarget(j) {
  var on =  (document.getElementById("vacationEnableSlider").getAttribute('value') == 1);
  if (on) {
    put("targetTemperature", "target_temperature", (Math.round(10 *parseFloat(j))/10).toFixed(1));
  }
}

function setTargetValues() {
  output.innerHTML = get("targetTemperature", "target_temperature");
  slider.value = get("targetTemperature", "target_temperature");
  if (get("weekProgramState", "week_program_state") == 'off') {
    document.getElementById("vacationEnableSlider").setAttribute('value', 1);
    document.getElementById("mySwitch").checked = true;
    restrictFunctionality();
  }
}

function restrictFunctionality() {
  document.getElementById("navHomeButton").href = "#";
  document.getElementById("navPlanningButton").href = "#";

  document.getElementById("navHomeText").style.color = 'grey';
  document.getElementById("navPlanningText").style.color = 'grey';
}

function restoreFunctionality() {
  document.getElementById("navHomeButton").href = "index.html";
  document.getElementById("navPlanningButton").href = "planning-week.html";

  document.getElementById("navHomeText").style.color = 'black';
  document.getElementById("navPlanningText").style.color = 'black';
}

setInterval(function() {
  if (currentOutput.innerHTML != get("targetTemperature", "target_temperature")) {

    var result = get("currentTemperature", "current_temperature");
    // if (get("targetTemperature", "target_temperature") > result) {
    //   result = result.fontcolor("red");
    // } else if (get("targetTemperature", "target_temperature") < result){
    //   result = result.fontcolor("blue");
    // } else {
    //   result = result.fontcolor("green");
    // }
    currentOutput.innerHTML = result;

    if (correctTarget != get("targetTemperature", "target_temperature"));
      output.innerHTML = get("targetTemperature", "target_temperature");
      slider.value = get("targetTemperature", "target_temperature");
      correctTarget = get("targetTemperature", "target_temperature");
      Visibility(tempChange);

  }
}, 1500);

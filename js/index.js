var output = document.getElementById("temperature");
var currentOutput = document.getElementById("currentTemperature");
var slider = document.getElementById("slider");
var tempChange = get("targetTemperature", "target_temperature");
var currentNight = document.getElementById("NTemp");
var currentDay = document.getElementById("DTemp");
var vacationRedirect = document.getElementById("vacationRedirect");

setTargetValues();
Visibility(tempChange);
currentNight.innerHTML = get("NightTemperature", "night_temperature");
currentDay.innerHTML = get("DayTemperature", "day_temperature");
currentOutput.innerHTML = get("currentTemperature", "current_temperature");

slider.oninput = function() {
    var showTempChange = Math.round(10 * parseFloat(this.value))/10;
    output.innerHTML = showTempChange.toFixed(1);
}

slider.onchange = function() {

    tempChange = Math.round(10 * parseFloat(this.value ))/10;
    tempOverride(tempChange);
    Visibility(tempChange);

}

document.getElementById("raiseTemp").onclick = function() {
  //handles temperature raise
  tempChange = Math.round(10 * (parseFloat(output.innerHTML) + 0.1))/10;
  output.innerHTML = tempChange.toFixed(1);
  slider.value = tempChange.toFixed(1);

  Visibility(tempChange);

}

document.getElementById("lowerTemp").onclick = function() {
  //handles temperature lower
  tempChange = Math.round(10 * (parseFloat(output.innerHTML) - 0.1))/10;
  output.innerHTML = tempChange.toFixed(1);
  slider.value = tempChange.toFixed(1);
  Visibility(tempChange);

}

// document.getElementById("vacationEnableSlider").onclick = function() {
//   var off =  (document.getElementById("vacationEnableSlider").getAttribute('value') == 0);
//   if (off) {
//     put("targetTemperature", "target_temperature", (Math.round(10 *parseFloat(output.innerHTML))/10).toFixed(1));
//     put("weekProgramState", "week_program_state", "off");
//   } else {
//     put("weekProgramState", "week_program_state", "on");
//     output.innerHTML = get("targetTemperature", "target_temperature");
//     setTimeout(function() {
//       output.innerHTML = get("targetTemperature", "target_temperature");
//     }, 1000);
//   }
// }

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

function setTargetValues() {
  output.innerHTML = get("targetTemperature", "target_temperature");
  slider.value = get("targetTemperature", "target_temperature");
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

  }
  if (output.innerHTML != get("targetTemperature", "target_temperature")) {

    output.innerHTML = get("targetTemperature", "target_temperature");
    slider.value = get("targetTemperature", "target_temperature");
    Visibility(tempChange);

  }

  if (currentNight.innerHTML != get("NightTemperature", "night_temperature")) {

    currentNight.innerHTML = get("NightTemperature", "night_temperature");

  }

  if (currentDay.innerHTML != get("DayTemperature", "day_temperature")) {

    currentDay.innerHTML = get("DayTemperature", "day_temperature");

  }

}, 1500);

// setInterval(function() {
//   if (output.innerHTML != get("targetTemperature", "target_temperature")) {
//     output.innerHTML = get("targetTemperature", "target_temperature");
//     slider.value = get("targetTemperature", "target_temperature");
//     Visibility(tempChange);
//   }
// }, 1500);

function tempOverride(j) {
  put("targetTemperature", "target_temperature", j);
}

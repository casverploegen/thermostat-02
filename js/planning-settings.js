if(get("weekProgramState", "week_program_state") == "off") {
  window.location.replace("vacation.html");
}

window.onload = updateValues();

function updateValues() {
  updateTemperatures();
  updateDays();
}

function updateTemperatures() {
  document.getElementById('dayTemperature').innerHTML = get("dayTemperature", "day_temperature");
  document.getElementById('nightTemperature').innerHTML = get("nightTemperature", "night_temperature");
}

function changeTemp(period, operation, crement) {
  if (period == "day") {
    currentTemp = get("dayTemperature", "day_temperature");
    if (operation == "increase") {
      currentTemp = parseFloat(currentTemp) + crement;
    } else {
      currentTemp = parseFloat(currentTemp) - crement;
    }
    put("dayTemperature", "day_temperature", currentTemp.toString());
  } else {
    currentTemp = get("nightTemperature", "night_temperature");
    if (operation == "increase") {
      currentTemp = parseFloat(currentTemp) + crement;
    } else {
      currentTemp = parseFloat(currentTemp) - crement;
    }
    put("nightTemperature", "night_temperature", currentTemp.toString());
  }

  updateTemperatures();
}



function updateDays() {
  for (var j = 0; j < 7; j++) {
    for (var i = 0; i < localStorage.getItem("numberOfDays"); i++) {
      title = localStorage.getItem("title" + i);
      option = document.getElementsByClassName('select')[j].getElementsByTagName('option');
      option[i+1].innerHTML = title;
      option[i+1].value = title;
      option[i+1].style.display = "block";
    }
  }
}

function saveWeekProgram() {
  //reset week program
  setDefault();

  for (var i = 0; i < 7; i++) {
    option = document.getElementsByClassName('select')[i];
    selected = option.options[option.selectedIndex].value;

    if (selected != "") {
      var day = "";
      switch(i) {
        case 0:
        day = "Monday";
        break;
        case 1:
        day = "Tuesday";
        break;
        case 2:
        day = "Wednesday";
        break;
        case 3:
        day = "Thursday";
        break;
        case 4:
        day = "Friday";
        break;
        case 5:
        day = "Saturday";
        break;
        case 6:
        day = "Sunday";
        break;
      }

      //add shifts to the corresponding days
      for (var j = 1; j < 6; j++) {
        if (localStorage.getItem(selected + "-switch" + j + "-start") != "") {
          addPeriod(day, localStorage.getItem(selected + "-switch" + j + "-start"), localStorage.getItem(selected + "-switch" + j + "-end"));
        }
      }
    }
  }

  document.getElementById('message').innerHTML = "The new week program is saved!";
  put("weekProgramState", "week_program_state", "on");
}

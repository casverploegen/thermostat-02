if(get("weekProgramState", "week_program_state") == "off") {
  window.location.replace("vacation.html");
}

test = document.getElementById('test');
error = document.getElementById('error');

function saveDay() {
  error.innerHTML = "";

  if (document.querySelector('[name="title"]').value == "") {
    error.innerHTML = "Please enter a title";
    return;
  }

  var amountOfSwitches = 0;
  for (var i = 1; i < 6; i++) {
    if (document.querySelector('[name="switch'+i+'-start"]').value != "" && document.querySelector('[name="switch'+i+'-end"]').value != "") {
      amountOfSwitches++;
    } else {
      i = 6;
    }
  }

  for(var i = 1; i < (amountOfSwitches + 1); i++) {
    switchStart = document.querySelector('[name="switch'+i+'-start"]').value;
    switchEnd = document.querySelector('[name="switch'+i+'-end"]').value;

    if(invalidTimeLength(switchStart) || invalidTimeLength(switchEnd)) {
      error.innerHTML = "Please enter time as hh:mm (with hh < 24 and mm < 60)";
      return;
    } else if(invalidTimeCompared(switchStart, switchEnd)) {
      error.innerHTML = "End time should be later than start time";
      return;
    } else if(i < amountOfSwitches) {
      if(invalidTimeCompared(switchEnd, document.querySelector('[name="switch'+(i+1)+'-start"]').value)) {
        error.innerHTML = "Switches should be entered chronologically and can't overlap";
        return;
      }
    }
  }

  actuallySaveDay();
}

function invalidTimeLength(time) {
  if (time.length == 0) {
    return false;
  }
  if (time.length != 5) {
    return true;
  }
  if (time.substring(2,3) != ":") {
    return true;
  }
  if (parseInt(time.substring(0,2)) > 23) {
    return true;
  }
  if (parseInt(time.substring(3,5)) > 59) {
    return true;
  }
  return false;
}

function invalidTimeCompared(time1, time2) {
  var intTime1 = time1.substring(0,2) + time1.substring(3,5);
  var intTime2 = time2.substring(0,2) + time2.substring(3,5);

  return intTime2 <= intTime1;
}

function actuallySaveDay() {
  if (localStorage.getItem("numberOfDays") == undefined) {
    localStorage.setItem("numberOfDays", "0");
  }

  titleNumber = localStorage.getItem("numberOfDays");
  title = document.querySelector('[name="title"]').value;
  localStorage.setItem("title" + titleNumber, title);
  localStorage.setItem("numberOfDays", parseInt(titleNumber) + 1);

  for(var i = 1; i < 6; i++) {
    switchStart = document.querySelector('[name="switch'+i+'-start"]').value;
    switchEnd = document.querySelector('[name="switch'+i+'-end"]').value;

    localStorage.setItem(title + "-switch"+i+"-start", switchStart);
    localStorage.setItem(title + "-switch"+i+"-end", switchEnd);
  }

  window.location.replace("planning-days.html");
}

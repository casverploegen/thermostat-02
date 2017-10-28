if(get("weekProgramState", "week_program_state") == "off") {
  window.location.replace("vacation.html");
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function(){
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }
}

window.onload = generateContent();

function generateContent() {
  for (var k = 0; k < localStorage.getItem("numberOfDays"); k++) {
    if (localStorage.getItem("title" + k) != undefined) {
      //set title of panel and make visible
      title = localStorage.getItem("title" + k);
      getTitle = document.getElementById('title' + k);
      day = document.getElementById('day' + k);
      getTitle.innerHTML = title;
      getTitle.style.display = "block";

      //update visualization
      var j = 0;
      if (localStorage.getItem(title + "-switch1-start") != "") {
        hours1 = localStorage.getItem(title + "-switch1-start").substring(0, 2) + "00";
        minutes1 = localStorage.getItem(title + "-switch1-start").substring(3, 5);
        barHeight = (parseInt(hours1) + parseInt(minutes1) * 1.6667) / 24;
        day.getElementsByClassName('bar-item')[0].style.height = barHeight.toString() + "%";
        j++;
      }

      for (var i = 1; i < 6; i++) {
        hours1 = localStorage.getItem(title + "-switch"+i+"-start").substring(0, 2) + "00";
        minutes1 = localStorage.getItem(title + "-switch"+i+"-start").substring(3, 5);
        hours2 = localStorage.getItem(title + "-switch"+i+"-end").substring(0, 2) + "00";
        minutes2 = localStorage.getItem(title + "-switch"+i+"-end").substring(3, 5);
        barHeight = ((parseInt(hours2) + parseInt(minutes2) * 1.6667) - (parseInt(hours1) + parseInt(minutes1) * 1.6667)) / 24;
        day.getElementsByClassName('bar-item')[j].style.height = barHeight.toString() + "%";
        day.getElementsByClassName('bar-item')[j].style.backgroundColor = "red";
        j++;

        if (i < 5) {
          hours1 = localStorage.getItem(title + "-switch"+i+"-end").substring(0, 2) + "00";
          minutes1 = localStorage.getItem(title + "-switch"+i+"-end").substring(3, 5);
          hours2 = localStorage.getItem(title + "-switch"+(i+1)+"-start").substring(0, 2) + "00";
          minutes2 = localStorage.getItem(title + "-switch"+(i+1)+"-start").substring(3, 5);
          barHeight = ((parseInt(hours2) + parseInt(minutes2) * 1.6667) - (parseInt(hours1) + parseInt(minutes1) * 1.6667)) / 24;
          day.getElementsByClassName('bar-item')[j].style.height = barHeight.toString() + "%";
          j++;
        }
      }


      //update switch times
      for (var i = 1; i < 6; i++) {
        if (localStorage.getItem(title + "-switch"+i+"-start") != "") {
          day.getElementsByClassName('switch')[i-1].style.display = "block";

          day.getElementsByClassName('switch')[i-1].getElementsByClassName('time')[0].innerHTML = localStorage.getItem(title + "-switch"+i+"-start");
          day.getElementsByClassName('switch')[i-1].getElementsByClassName('time')[1].innerHTML = localStorage.getItem(title + "-switch"+i+"-end");
        }
      }
    }
  }
  //update day and night temperature
  for(var j = 0; j < document.getElementsByClassName('dayTemp').length; j++) {
    document.getElementsByClassName('dayTemp')[j].innerHTML = get("dayTemperature", "day_temperature");
    document.getElementsByClassName('nightTemp')[j].innerHTML = get("nightTemperature", "night_temperature");
  }
}

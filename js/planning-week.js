if(get("weekProgramState", "week_program_state") == "off") {
  window.location.replace("vacation.html");
}

window.onload = updateVisualization();

function updateVisualization() {
  var day = get("day", "current_day");
  document.getElementById(day).style.flexGrow = "2.5";

  var program = getWeekProgram();
  var weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  var hours1;
  var minutes1;
  var hours2;
  var minutes2;
  var barHeight;

  for (var day = 0; day < weekDays.length; day++) {
    if (program[weekDays[day]].length > 0) {
      hours1 = program[weekDays[day]][0][0].substring(0, 2) + "00";
      minutes1 = program[weekDays[day]][0][0].substring(3, 5);
      barHeight = (parseInt(hours1) + parseInt(minutes1) * 1.6667) / 24;
      document.getElementById(weekDays[day] + '-bar-item1').style.height = barHeight.toString() + "%";
    }

    var j = 1;
    for (var i = 0; i < program[weekDays[day]].length; i++) {
      j++;
      hours1 = program[weekDays[day]][i][0].substring(0, 2) + "00";
      minutes1 = program[weekDays[day]][i][0].substring(3, 5);
      hours2 = program[weekDays[day]][i][1].substring(0, 2) + "00";
      minutes2 = program[weekDays[day]][i][1].substring(3, 5);
      barHeight = ((parseInt(hours2) + parseInt(minutes2) * 1.6667) - (parseInt(hours1) + parseInt(minutes1) * 1.6667)) / 24;
      document.getElementById(weekDays[day] + '-bar-item' + j).style.height = barHeight.toString() + "%";
      document.getElementById(weekDays[day] + '-bar-item' + j).style.backgroundColor = "red";

      j++;
      if (i < program[weekDays[day]].length - 1) {
        hours1 = program[weekDays[day]][i][1].substring(0, 2) + "00";
        minutes1 = program[weekDays[day]][i][1].substring(3, 5);
        hours2 = program[weekDays[day]][i+1][0].substring(0, 2) + "00";
        minutes2 = program[weekDays[day]][i+1][0].substring(3, 5);
        barHeight = ((parseInt(hours2) + parseInt(minutes2) * 1.6667) - (parseInt(hours1) + parseInt(minutes1) * 1.6667)) / 24;
        document.getElementById(weekDays[day] + '-bar-item' + j).style.height = barHeight.toString() + "%";
      }
    }
  }
}

function moveBar() {

}

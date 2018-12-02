// This function provides a real-time ticking clock
function displayTime() {
  var time = moment().format("LTS");
  $("#clock").html(time);
  setTimeout(displayTime, 1000);
}

displayTime();

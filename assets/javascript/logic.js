// Initialize Firebase
var config = {
  apiKey: "AIzaSyC8mtigcbs7eYy51bs8xTT9MBeDhP7KO4A",
  authDomain: "rdu-flight-times.firebaseapp.com",
  databaseURL: "https://rdu-flight-times.firebaseio.com",
  projectId: "rdu-flight-times",
  storageBucket: "rdu-flight-times.appspot.com",
  messagingSenderId: "840023321826"
};
firebase.initializeApp(config);

var database = firebase.database();
var time;

$("#submit").on("click", function(e) {
  e.preventDefault();

  var airline = $("#airline")
    .val()
    .toUpperCase()
    .trim();

  var arrivalTime = $("#arrival")
    .val()
    .toLowerCase()
    .trim();

  var statusUpdates = setInterval(function() {
    var a = moment(time, "hhmmssa");
    var b = moment(arrivalTime, "hhmmssa");
    var results = b.diff(a, "seconds");

    if (results < 0) {
      results = 86400 + results;
    }

    var hours = Math.floor(results / 3600);
    var minutes = Math.floor((results - hours * 60 * 60) / 60);
    var seconds = results - hours * 60 * 60 - minutes * 60;

    if (hours === 0 || hours < 10) {
      hours = "0" + hours;
    }

    if (minutes === 0 || minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds === 0 || seconds < 10) {
      seconds = "0" + seconds;
    }

    if (hours === "00" && minutes === "00" && seconds === "00") {
      clearInterval(statusUpdates);
      var status = "EXPIRED";
    } else {
      var status = hours + ":" + minutes + ":" + seconds;
    }

    console.log(status);
    return status;
  }, 1000);

  var destination = $("#destination")
    .val()
    .trim();

  var departureTime = moment(arrivalTime, "hhmma")
    .add(45, "minutes")
    .format("hh:mma")
    .toLowerCase();

  database.ref().push({
    airline: airline,
    arrivalTime: arrivalTime,
    status: statusUpdates,
    destination: destination,
    departure: departureTime
  });

  airline = $("#airline").val("");
  arrivalTime = $("#arrival").val("");
  destination = $("#destination").val("");
});

database.ref().on("child_added", function(snapshot) {
  var firebaseData = snapshot.val();

  var tableBody = $("#table");
  var tableRow = $("<tr>");

  var displayAirline = $("<td>").html(firebaseData.airline);
  var displayArrival = $("<td>").html(firebaseData.arrivalTime);
  var displayStatus = $("<td>").html(firebaseData.status);
  var displayDepartingTo = $("<td>").html(firebaseData.destination);
  var displayDeparture = $("<td>").html(firebaseData.departure);

  tableBody.append(
    tableRow
      .append(displayAirline)
      .append(displayArrival)
      .append(displayStatus)
      .append(displayDepartingTo)
      .append(displayDeparture)
  );
});

// This function provides a realtime ticking clock
function displayTime() {
  time = moment().format("LTS");
  $("#clock").html(time);
  setTimeout(displayTime, 1000); // Recursive Function
  console.log("Hi");
}

// Function Calls
displayTime();

var TA_Test = setInterval(function() {
  var timeTest = "11:50AM";
  var a = moment(time, "hhmmssa");
  var b = moment(timeTest, "hhmmssa");
  var results = b.diff(a, "seconds");

  if (results < 0) {
    results = 86400 + results;
  }

  var hours = Math.floor(results / 3600);
  var minutes = Math.floor((results - hours * 60 * 60) / 60);
  var seconds = results - hours * 60 * 60 - minutes * 60;

  if (hours === 0 || hours < 10) {
    hours = "0" + hours;
  }

  if (minutes === 0 || minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds === 0 || seconds < 10) {
    seconds = "0" + seconds;
  }

  if (hours === "00" && minutes === "00" && seconds === "00") {
    clearInterval(jordanTest);
    var status = "EXPIRED";
  } else {
    var status = hours + ":" + minutes + ":" + seconds;
  }
  console.log(status);
}, 1000);

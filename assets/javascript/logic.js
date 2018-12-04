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

// This function provides a realtime ticking clock
function displayTime() {
  time = moment().format("LTS");
  $("#clock").html(time);

  updateStatusCountdowns();

  setTimeout(displayTime, 1000); // Recursive Function
}

// Function Calls
displayTime();

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

  //   var statusUpdates = setInterval(function() {
  //     var a = moment(time, "hhmmssa");
  //     var b = moment(arrivalTime, "hhmmssa");
  //     var results = b.diff(a, "seconds");

  //     if (results < 0) {
  //       results = 86400 + results;
  //     }

  //     var hours = Math.floor(results / 3600);
  //     var minutes = Math.floor((results - hours * 60 * 60) / 60);
  //     var seconds = results - hours * 60 * 60 - minutes * 60;

  //     if (hours === 0 || hours < 10) {
  //       hours = "0" + hours;
  //     }

  //     if (minutes === 0 || minutes < 10) {
  //       minutes = "0" + minutes;
  //     }

  //     if (seconds === 0 || seconds < 10) {
  //       seconds = "0" + seconds;
  //     }

  //     if (hours === "00" && minutes === "00" && seconds === "00") {
  //       clearInterval(statusUpdates);
  //       var status = "EXPIRED";
  //     } else {
  //       var status = hours + ":" + minutes + ":" + seconds;
  //     }

  //     console.log(status);
  //     return status;
  //   }, 1000);

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
    destination: destination,
    departure: departureTime
  });

  //   airline = $("#airline").val("");
  //   arrivalTime = $("#arrival").val("");
  //   destination = $("#destination").val("");
});

function updateClocks() {}

function updateStatusCountdowns() {
  //var countdownIntervalRef = setInterval(function() {
  var $statusesToUpdate = $("[jsArrivalTimeCountdown]");

  $statusesToUpdate.each(function(index, statusElement) {
    let $status = $(statusElement);
    let arrivalTime = $status.attr("jsArrivalTimeCountdown");
    let statusDisplay = "";

    if (arrivalTime === "EXPIRED") return;

    let a = moment(time, "hhmmssa");
    let b = moment(arrivalTime, "hhmmssa");
    let results = b.diff(a, "seconds");

    if (results < 0) results = 86400 + results;

    let hours = Math.floor(results / 3600);
    let minutes = Math.floor((results - hours * 60 * 60) / 60);
    let seconds = results - hours * 60 * 60 - minutes * 60;

    if (hours === 0 || hours < 10) hours = "0" + hours;

    if (minutes === 0 || minutes < 10) minutes = "0" + minutes;

    if (seconds === 0 || seconds < 10) seconds = "0" + seconds;

    if (hours === "00" && minutes === "00" && seconds === "00") {
      //clearInterval(countdownIntervalRef);
      //updateStatusDisplay("EXPIRED", airlineData.statusElementId);
      statusDisplay = "EXPIRED";
      $status.attr("jsArrivalTimeCountdown", "EXPIRED");
    }
    //updateStatusDisplay("EXPIRED", airlineData.statusElementId);
    else statusDisplay = hours + ":" + minutes + ":" + seconds;

    $status.html(statusDisplay);
  });

  // var a = moment(time, "hhmmssa");
  // var b = moment(arrivalTime, "hhmmssa");
  // var results = b.diff(a, "seconds");

  // if (results < 0) results = 86400 + results;

  // var hours = Math.floor(results / 3600);
  // var minutes = Math.floor((results - hours * 60 * 60) / 60);
  // var seconds = results - hours * 60 * 60 - minutes * 60;

  // if (hours === 0 || hours < 10) hours = "0" + hours;

  // if (minutes === 0 || minutes < 10) minutes = "0" + minutes;

  // if (seconds === 0 || seconds < 10) seconds = "0" + seconds;

  // if (hours === "00" && minutes === "00" && seconds === "00") {
  //   clearInterval(countdownIntervalRef);
  //   //updateStatusDisplay("EXPIRED", airlineData.statusElementId);
  //   var status = "EXPIRED";
  // }
  // //updateStatusDisplay("EXPIRED", airlineData.statusElementId);
  // else var status = hours + ":" + minutes + ":" + seconds;

  //updateStatusDisplay(status, statusElementId);
  //}, 1000);
}

// function updateStatusDisplay(status, statusElementId) {
//   $("#" + statusElementId).html(status);
// }

database.ref().on("child_added", function(snapshot) {
  var firebaseData = snapshot.val();

  var tableBody = $("#table");
  var tableRow = $("<tr>");

  var displayAirline = $("<td>").html(firebaseData.airline);
  var displayArrival = $("<td>").html(firebaseData.arrivalTime);
  // let statusElementId = "status" + airlineCount++;
  var displayStatus = $("<td>").attr(
    "jsArrivalTimeCountdown",
    firebaseData.arrivalTime
  );
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

  //startClock(firebaseData.arrivalTime, statusElementId);
});

// var test = setInterval(function() {
//   var timeTest = "11:50AM";
//   var a = moment(time, "hhmmssa");
//   var b = moment(timeTest, "hhmmssa");
//   var results = b.diff(a, "seconds");

//   if (results < 0) {
//     results = 86400 + results;
//   }

//   var hours = Math.floor(results / 3600);
//   var minutes = Math.floor((results - hours * 60 * 60) / 60);
//   var seconds = results - hours * 60 * 60 - minutes * 60;

//   if (hours === 0 || hours < 10) {
//     hours = "0" + hours;
//   }

//   if (minutes === 0 || minutes < 10) {
//     minutes = "0" + minutes;
//   }

//   if (seconds === 0 || seconds < 10) {
//     seconds = "0" + seconds;
//   }

//   if (hours === "00" && minutes === "00" && seconds === "00") {
//     clearInterval(jordanTest);
//     var status = "EXPIRED";
//   } else {
//     var status = hours + ":" + minutes + ":" + seconds;
//   }
//   console.log(status);
//   return status;
// }, 1000);

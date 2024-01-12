// ACCESSING
const currentTime = document.querySelector("#current-time");
const setHours = document.querySelector("#hours");
const setMinutes = document.querySelector("#minutes");
const setSeconds = document.querySelector("#seconds");
const setAmPm = document.querySelector("#am-pm");
const setAlarmSubmitButton = document.querySelector("#submitButton");
const alarmContainer = document.querySelector("#alarms-list-container");


// GET CURRENTDATE
const currentDate = new Date();

// ARRAY OF WEEK DAYS NAME AND MONTHS NAME
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



// SETTING CURRENT DATE AND TIME
document.getElementById('week').textContent = weekDays[currentDate.getDay()];
document.getElementById('month').textContent = months[currentDate.getMonth()];
document.getElementById('date').textContent = currentDate.getDate();
document.getElementById('year').textContent = currentDate.getFullYear();


// DROPDOWN MENU FOR HOURS, MINUTES, SECONDS USING SETINTERVAL
window.addEventListener("DOMContentLoaded", (event) => {
  
  dropDownMenu(1, 12, setHours);
 
  dropDownMenu(0, 59, setMinutes);

  dropDownMenu(0, 59, setSeconds);

  setInterval(getCurrentTime, 1000);
  fetchAlarm();
});

// EVENT LISTENER ADDED TO SET ALARM SUBMIT BUTTON
setAlarmSubmitButton.addEventListener("click", getInput);


// UPDATE THE CLOCK EVERY SECOND
function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  var timeString = hours.toString().padStart(2, '0') + ':'
    + minutes.toString().padStart(2, '0') + ':'
    + seconds.toString().padStart(2, '0');

}
setInterval(updateClock, 1000);
function dropDownMenu(start, end, element) {
  for (let i = start; i <= end; i++) {
    const dropDown = document.createElement("option");
    dropDown.value = i < 10 ? "0" + i : i;
    dropDown.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dropDown);
  }
}


function getCurrentTime() {
  let time = new Date();
  time = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  currentTime.innerHTML = time;

  return time;
}

// FUNCTION FOR CONVERT GET INPUT TIME
function getInput(e) {
  e.preventDefault();
  const hourValue = setHours.value;
  const minuteValue = setMinutes.value;
  const secondValue = setSeconds.value;
  const amPmValue = setAmPm.value;
  
 
  // Check whether AM or PM for selected value
  let newAmPmValue = hourValue >= 12 ? 'PM' : 'AM';
  //IF NO AM OR PM PROVIDED
  if (amPmValue =='AM/PM'){
    amPmValue=newAmPmValue;
  }

  const alarmTime = convertToTime(
    hourValue,
    minuteValue,
    secondValue,
    amPmValue
  );
  setAlarm(alarmTime);
}

// CONVERTING TIME TO 24 HOUR FORMAT
function convertToTime(hour, minute, second, amPm) {
  return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
}

// SETTING ALARM FN 
function setAlarm(time, fetching = false) {
  const alarm = setInterval(() => {
    //CHECK CURRENT TIME MATCH WITH ALARM TIME OR NOT FOR ALARM
    if (time === getCurrentTime()) {
      alert("Alarm Ringing");
    }
  

    //console.log("running");
  }, 500);

  addAlaramToDom(time, alarm);
  if (!fetching) {
    saveAlarm(time);
  }
}

// ALARMS SET BY USER DISLAYED IN HTML
function addAlaramToDom(time, intervalId) {
  const alarm = document.createElement("div");
  alarm.classList.add("alarm", "mb", "d-flex");
  alarm.innerHTML = `
              <div class="time">${time}</div>
              <button class="btn delete-alarm" data-id=${intervalId}>Delete</button>
              `;
  const deleteButton = alarm.querySelector(".delete-alarm");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e, time, intervalId));

  alarmContainer.prepend(alarm);
}

// IS ALARMS SAVED IN LOCAL STORAGE?
function checkAlarams() {
  let alarms = [];
  const isPresent = localStorage.getItem("alarms");
  if (isPresent) alarms = JSON.parse(isPresent);

  return alarms;
}

// SAVE ALARM TO LOCAL STORAGE
function saveAlarm(time) {
  const alarms = checkAlarams();

  alarms.push(time);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}

// FETCHING ALARMS FROM LOCAL STORAGE
function fetchAlarm() {
  const alarms = checkAlarams();

  alarms.forEach((time) => {
    setAlarm(time, true);
  });
}

// FN FOR DELETE ALARM
function deleteAlarm(event, time, intervalId) {
  const self = event.target;

  clearInterval(intervalId);

  const alarm = self.parentElement;
  //console.log(time);

  deleteAlarmFromLocal(time);
  alarm.remove();
}

// FN FOR DELETE ALARM FROM LOCAL
function deleteAlarmFromLocal(time) {
  const alarms = checkAlarams();

  const index = alarms.indexOf(time);
  alarms.splice(index, 1);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}



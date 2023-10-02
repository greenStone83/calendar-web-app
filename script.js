// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

function getStandardTime(hour) {
  if (hour > 12) {
    return hour - 12;
  } else {
    return hour;
  }
}

function getDate() {
  const date = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentDay = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  //for example, says "Sunday, August 3"
  $('#currentDay').append(currentDay);
}

function addTimeBlocks() {
  const date = new Date();
  let currentHour = date.getHours();
  let dayHalf = "AM";
  let timeClass = "";

  //loop through each hour
  for (let hour = 9; hour < 18; hour++) {

    //if 12 or later, make it PM
    if (hour === 12) {
      dayHalf = "PM";
    }

    //find if the block is in the past, present, or future
    if (currentHour > hour) {
      timeClass = "past";
    } else if (currentHour === hour) {
      timeClass = "present";
    } else {
      timeClass = "future";
    }

    //add the time block in the code
    const newTimeBlockHTML = `
      <div id="hour-${getStandardTime(hour)}" class="row time-block ${timeClass}">
        <div class="col-2 col-md-1 hour text-center py-3">${getStandardTime(hour) + dayHalf}</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `;
    $('#time-block-div').append(newTimeBlockHTML);
  }
}

function loadText() {
  for (let hour = 9; hour < 18; hour++) {
    let standardHour = `hour-${getStandardTime(hour)}`;
    let savedText = localStorage.getItem(standardHour);
    console.log(savedText);
    if (savedText !== null) {
      $(`#${standardHour}`).parent().find('textarea').val(savedText);
    }
  }
}

function saveText() {
  for (let hour = 9; hour < 18; hour++) {
    let standardHour = `hour-${getStandardTime(hour)}`;
    $(`#${standardHour}`).on('click', 'button', function() {
      let textToSave = $(this).parent().find('textarea').val();
      console.log(textToSave);
      localStorage.setItem(standardHour, textToSave);
    });
  }
}

$(function () {
  getDate();
  addTimeBlocks();
  loadText();
  saveText();
});

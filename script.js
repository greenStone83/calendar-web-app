// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

function addTimeBlocks() {
  const date = new Date();
  let currentHour = date.getHours();
  let dayHalf = "AM";
  let timeClass = "";
  let standardTime = "";

  //loop through each hour
  for (let hour = 9; hour < 18; hour++) {
    standardTime = hour;

    //if 12 or later, make it PM
    if (hour === 12) {
      dayHalf = "PM";
    } else if (hour > 12) {
      //convert military time to standard time
      standardTime = hour - 12;
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
      <div id="hour-${standardTime}" class="row time-block ${timeClass}">
        <div class="col-2 col-md-1 hour text-center py-3">${standardTime + dayHalf}</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `;
    $('#time-block-div').append(newTimeBlockHTML);
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

$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    
    getDate();
    addTimeBlocks();
  });
  
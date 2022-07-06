let date = new Date();

const weeks = ["일", "월", "화", "수", "목", "금", "토"];

let dayNumber = 0;

let nowDay = date.getDay();

let nowDate = date.getDate();

let nowMonth = date.getMonth();

let nowYear = date.getFullYear();

let ingredient = 0;

const today = document.querySelector(".title__day");

const calendar = document.querySelector(".calendar");

(function () {
  today.children[0].textContent = weeks[nowDay] + "요일";
  today.children[1].textContent = nowDate;
})();

function yearMonth() {
  const yearMonth = document.querySelector(".title__year-month");
  yearMonth.children[0].textContent = nowYear + "년";
  yearMonth.children[1].textContent = nowMonth + 1 + "월";
}

yearMonth();

(function () {
  for (let i = 0; i < 7; i++) {
    const createDay = document.createElement("div");
    calendar.appendChild(createDay);
    createDay.classList.add("calendar__day");
    createDay.textContent = weeks[i] + "\u00A0" + "\u00A0";
  }
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      const createDayNumber = document.createElement("span");
      createDayNumber.classList.add("day-number");
      calendar.children[i].appendChild(createDayNumber);
    }
  }
})();

function calculateDays() {
  let firstDay = new Date(nowYear, nowMonth, 1).getDay();
  let lastDay = new Date(nowYear, nowMonth + 1, 0).getDate();

  for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 7; y++) {
      if (dayNumber >= lastDay) {
        calendar.children[y].children[x].textContent = "\u00A0";
      } else {
        dayNumber++;
        if (dayNumber === 1) {
          y = firstDay;
        }
        if (
          nowYear === date.getFullYear() &&
          nowMonth === date.getMonth() &&
          dayNumber === nowDate
        ) {
          calendar.children[y].children[x].style.color = "red";
        } else {
          calendar.children[y].children[x].style.color = "";
        }
        if (dayNumber < 8 && y === 6) {
          for (let v = 0; v < firstDay; v++) {
            calendar.children[v].children[0].textContent = "\u00A0";
          }
        }
        calendar.children[y].children[x].textContent = dayNumber;
      }
    }
  }
}

calculateDays();

const arrows = document.querySelector(".more");

arrows.addEventListener("click", function arrowHandler(ev) {
  dayNumber = 0;
  if (ev.target === arrows.children[2]) {
    nowMonth++;
    if (nowMonth === 12) {
      nowMonth = 0;
      nowYear++;
    }
  } else if (ev.target === arrows.children[0]) {
    nowMonth--;
    if (nowMonth === -1) {
      nowMonth = 11;
      nowYear--;
    }
  }

  today.children[0].textContent =
    weeks[new Date(nowYear, nowMonth, 1).getDay()] + "요일";
  if (nowMonth === date.getMonth() && nowYear === date.getFullYear()) {
    today.children[1].textContent = nowDate;
  } else {
    today.children[1].textContent = 1;
  }
  if (ev.target.className === "day-number") {
    today.children[0].textContent =
      weeks[new Date(nowYear, nowMonth, ev.target.textContent).getDay()] +
      "요일";
    today.children[1].textContent = ev.target.textContent;
  }
  yearMonth();
  calculateDays();
});

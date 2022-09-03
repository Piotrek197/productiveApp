import initList from "./index";

export default function weekly() {
  const weeklyList = document.getElementById("weekly-list");
  let htmlString = "";
  // let weeklyLocalStorage = Object.values(getWeekly());
  let weeklyData = getWeekly();
  htmlString = weeklyData.map(
    task => `<li class="${task.done ? "done" : ""}">
      <span>${task.name}</span>
      <span>${(task.currentRep / task.finishRep) * 100} %</span>
      <button class="incrementRep" id="${task.id}"
    }">+1</button>


</li>`
  );
  weeklyList.innerHTML = htmlString;

  if (document.querySelector(".incrementRep")) {
    const incrementButtons = document.querySelectorAll(".incrementRep");
    incrementButtons.forEach(button =>
      button.addEventListener("click", e => {
        const weeklyDatam = weeklyData.map(task =>
          task.id === Number(e.target.id)
            ? {
                ...task,
                currentRep:
                  task.currentRep < task.finishRep ? task.currentRep + 1 : task.currentRep,
                done: ++task.currentRep > task.finishRep
              }
            : task
        );

        console.log(weeklyData);

        const key = getFormatedWeekDate();

        localStorage.setItem(
          "weekly",
          JSON.stringify({
            [key]: weeklyDatam
          })
        );
        initList();
      })
    );
  }
}

function getWeekly() {
  const weekly = JSON.parse(localStorage.getItem("weekly"));
  // const weeklyInit = JSON.parse(localStorage.getItem("weekly_init"));
  const weekKey = getFormatedWeekDate();
  if (weekly.hasOwnProperty(weekKey)) return weekly[weekKey];
  // else return weeklyInit;
}

function getFormatedWeekDate() {
  const date = new Date();
  return date.getWeekNumber() + "-" + date.getFullYear();
}

/* For a given date, get the ISO week number
 *
 * Based on information at:
 * https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
 */
Date.prototype.getWeekNumber = function () {
  const date = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
};

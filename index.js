function getDaily() {
  const daily = JSON.parse(localStorage.getItem("daily"));
  const dailyInit = JSON.parse(localStorage.getItem("daily_init"));
  const day = getFormatedDate();
  if (daily.hasOwnProperty(day)) return daily[day];
  else return dailyInit;
}

const dailyList = document.getElementById("daily-list");

function initList() {
  htmlString = "";
  let dailyLocalStorage = Object.values(getDaily());
  dailyLocalStorage.forEach(
    el =>
      (htmlString += `<li class="${el.done ? "done" : ""}">${el.name}
        <input id="${el.id}" type="checkbox" ${el.done ? "checked" : ""}/>

      </li>`)
  );
  dailyList.innerHTML = htmlString;
  document.querySelectorAll("#daily-list li input[type=checkbox]").forEach(checkbox =>
    checkbox.addEventListener("change", e => {
      let daily = [];
      daily = dailyLocalStorage.map(el =>
        el.id === Number(e.target.id) ? { ...el, done: e.target.checked } : el
      );

      const day = getFormatedDate();

      localStorage.setItem(
        "daily",
        JSON.stringify({
          [day]: { ...dailyLocalStorage, ...daily }
        })
      );
      initList();
    })
  );
}

function getFormatedDate() {
  const date = new Date();
  return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
}

initList();

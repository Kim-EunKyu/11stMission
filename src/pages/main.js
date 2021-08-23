import { getDay } from "../utils/day.js";
import Alarm from "./alarm.js";
import Memo from "./memo.js";
import Picture from "./picture.js";
import timer from "../utils/timer.js";

// 백그라운드에서 알람 실행될 수 있도록 최초 한번 실행
let alarmData = JSON.parse(localStorage.getItem("alarmList"));
alarmData = alarmData.filter((value) => {
  const now = new Date();
  const alarm = new Date(value);
  return alarm - now > 0;
});

localStorage.setItem("alarmList", JSON.stringify(alarmData));
const data = localStorage.getItem("alarmList");
data !== null ? JSON.parse(data) : [];
alarmData.forEach((value, idx) => {
  console.log(new Date(value));
  const now = new Date();
  const alarm = new Date(value);

  const setTimer = setTimeout(() => {
    alert(`${alarm.getHours()}시 ${alarm.getMinutes()}분 알람 입니다.`);
    alarmData.splice(alarmData.indexOf(value), 1);
    localStorage.setItem("alarmList", JSON.stringify(alarmData));
  }, alarm - now);
  timer.addTimer(setTimer);
  console.log(timer.getTimer());
});

export default class App {
  constructor($body) {
    this.$body = $body;
    this.time = getDay();

    this.render();
    this.interval = setInterval(this.changeTime, 1000);

    return this.$body;
  }

  changeTime() {
    this.time = getDay();
    const $time = document.querySelector(".statusTime");
    $time.textContent = this.time;
  }

  setState(data) {
    const { time } = data;
    this.time = time;
    this.render();
  }

  render() {
    this.$body.style.display = "flex";
    this.$body.style.flexDirection = "column";
    this.$body.style.height = "100vh";

    const $status = document.createElement("div");
    $status.style.display = "flex";
    $status.style.justifyContent = "center";

    const $time = document.createElement("div");
    $time.className = "statusTime";
    $time.innerText = this.time;
    $status.appendChild($time);

    const $main = document.createElement("div");
    $main.style.flex = "1";
    $main.style.display = "flex";
    $main.style.flexWrap = "wrap";
    $main.style.padding = "16px";
    $main.style.backgroundColor = "#4C73C4";

    const $alarm = document.createElement("button");
    $alarm.style.width = "10vh";
    $alarm.style.height = "10vh";
    $alarm.style.border = "none";
    $alarm.style.borderRadius = "8px";
    $alarm.style.marginRight = "2vh";
    $alarm.style.backgroundColor = "#ffffff";
    $alarm.innerText = "알람";
    $alarm.onclick = () => {
      new Alarm(this.$body);
      clearInterval(this.interval);
    };
    $main.appendChild($alarm);

    const $memo = document.createElement("button");
    $memo.style.width = "10vh";
    $memo.style.height = "10vh";
    $memo.style.border = "none";
    $memo.style.borderRadius = "8px";
    $memo.style.marginRight = "2vh";
    $memo.style.backgroundColor = "#ffffff";
    $memo.innerText = "메모";
    $memo.onclick = () => {
      new Memo(this.$body);
      clearInterval(this.interval);
    };
    $main.appendChild($memo);

    const $picture = document.createElement("button");
    $picture.style.width = "10vh";
    $picture.style.height = "10vh";
    $picture.style.border = "none";
    $picture.style.borderRadius = "8px";
    $picture.style.marginRight = "2vh";
    $picture.style.backgroundColor = "#ffffff";
    $picture.innerText = "사진";
    $picture.onclick = () => {
      new Picture(this.$body);
      clearInterval(this.interval);
    };
    $main.appendChild($picture);

    this.$body.innerHTML = "";
    this.$body.appendChild($status);
    this.$body.appendChild($main);
  }
}

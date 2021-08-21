import { getDay } from "../utils/day.js";
import Memo from "./memo.js";

export default class App {
  constructor($body) {
    this.$body = $body;
    this.time = getDay();
    this.interval = setInterval(() => {
      this.setState({ time: getDay() });
    }, 1000);

    this.render();

    return this.$body;
  }

  initMain() {}

  getDay() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDay();
    const hour = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${min}분 ${sec}초`;
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
    $status.style.border = "1px solid black";
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
    $main.style.border = "1px solid blue";
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
    $main.appendChild($picture);

    this.$body.innerHTML = "";
    this.$body.appendChild($status);
    this.$body.appendChild($main);
  }
}

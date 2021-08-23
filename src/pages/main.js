import { getDay } from "../utils/day.js";
import Memo from "./memo.js";
import Picture from "./picture.js";

// const { getDay } = require("../utils/day.js");

export default class App {
  constructor($body) {
    this.$body = $body;
    // this.$body.style.width = "100%";
    this.time = getDay();
    // this.interval = setInterval(() => {
    //   this.setState({ time: getDay() });
    // }, 1000);

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

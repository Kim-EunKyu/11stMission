import { getDay } from "../utils/day.js";

export default class Memo {
  constructor($target) {
    this.$target = $target;
    this.time = getDay();
    this.interval = setInterval(() => {
      this.setState({ time: getDay() });
    }, 1000);

    this.render();
  }

  setState(data) {
    const { time } = data;
    this.time = time;
    this.render();
  }

  render() {
    this.$target.style.display = "flex";
    this.$target.style.flexDirection = "column";
    this.$target.style.height = "100vh";

    const $status = document.createElement("div");
    $status.style.border = "1px solid black";
    $status.style.display = "flex";
    $status.style.justifyContent = "center";

    const $time = document.createElement("div");
    $time.className = "statusTime";
    $time.innerText = this.time;
    $status.appendChild($time);

    this.$target.innerHTML = "";
    this.$target.appendChild($status);
    // this.$target.appendChild($main);
  }
}

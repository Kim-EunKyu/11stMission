import { getDay } from "../utils/day.js";
import App from "./main.js";

export default class Memo {
  constructor($target) {
    this.$target = $target;
    this.time = getDay();

    this.memoList = this.getMemoList();
    this.beforeSelected = null;

    this.render();
    this.interval = setInterval(this.changeTime, 1000);
  }

  getMemoList() {
    const data = localStorage.getItem("memoList");
    return data !== null ? JSON.parse(data) : [];
  }

  changeTime() {
    this.time = getDay();
    const $time = document.querySelector(".statusTime");
    $time.textContent = this.time;
  }

  render() {
    this.$target.style.display = "flex";
    this.$target.style.flexDirection = "column";
    this.$target.style.height = "100vh";

    // 상태표시줄 추가
    const $status = document.createElement("div");
    $status.style.display = "flex";
    $status.style.justifyContent = "space-between";

    const $backBtn = document.createElement("button");
    $backBtn.textContent = "back";
    $backBtn.onclick = () => {
      clearInterval(this.interval);
      new App(this.$target);
    };
    $status.appendChild($backBtn);

    const $time = document.createElement("div");
    $time.className = "statusTime";
    $time.innerText = this.time;
    $status.appendChild($time);

    //input 추가
    const $input = document.createElement("input");
    $input.className = "memoInput";
    $input.onkeyup = (e) => {
      if (e.key === "Enter") {
        if ($input.value !== "") {
          this.memoList.push($input.value);
          localStorage.setItem("memoList", JSON.stringify(this.memoList));
          $input.value = "";
          $input.classList.toggle("active");
          this.render();
        }
      }
    };
    ///////

    const $newBtn = document.createElement("button");
    $newBtn.textContent = "new";
    $newBtn.onclick = () => {
      $input.classList.toggle("active");
    };
    $status.appendChild($newBtn);

    //main 추가
    const $main = document.createElement("div");
    $main.style.flex = "1";
    $main.style.display = "flex";
    $main.style.flexWrap = "wrap";
    $main.style.backgroundColor = "#4C73C4";

    // memo 리스트
    const $memoUl = document.createElement("ul");
    $memoUl.style.listStyle = "none";
    $memoUl.style.width = "100%";
    $memoUl.style.height = "100%";
    $memoUl.onclick = (e) => {
      if (e.target.nodeName === "LI") {
        e.target.classList.toggle("select");

        if (this.beforeSelected !== null) {
          this.beforeSelected.classList.toggle("select");
        }
        this.beforeSelected = e.target;
      }
      //   console.log(e.target.nodeName);
    };
    $main.appendChild($memoUl);

    for (let i = 0; i < this.memoList.length; i++) {
      const $memoLi = document.createElement("li");
      $memoLi.textContent = this.memoList[i];
      $memoLi.className = "memoList";
      $memoLi.style.margin = "2px 0";
      $memoLi.style.border = "1px solid black";
      $memoLi.style.width = "100%";
      $memoLi.style.backgroundColor = "#ffffff";
      $memoLi.style.overflow = "hidden";
      $memoLi.style.wordBreak = "break-all";
      $memoUl.appendChild($memoLi);
    }

    // 메모 화면에 추가
    this.$target.innerHTML = "";
    this.$target.appendChild($status);
    this.$target.appendChild($input);
    this.$target.appendChild($main);
  }
}

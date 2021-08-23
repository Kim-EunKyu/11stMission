import { getDay } from "../utils/day.js";
import App from "./main.js";
// import imageList from "../image/test.json";

export default class Picture {
  constructor($target) {
    this.$target = $target;
    this.time = getDay();
    this.memoList = this.getMemoList();
    this.beforeSelected = null;
    this.init();
  }

  async init() {
    this.interval = setInterval(this.changeTime, 1000);
    this.imageList = await this.getImageList();
    this.render();
  }

  async getImageList() {
    const response = await fetch(
      `http://${window.location.hostname}:3000/image/List.json`
    );
    return await response.json();
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
    $status.style.position = "relative";
    $status.style.justifyContent = "center";
    const $backBtn = document.createElement("button");
    $backBtn.textContent = "back";
    $backBtn.style.position = "absolute";
    $backBtn.style.top = "0";
    $backBtn.style.left = "0";
    $backBtn.onclick = () => {
      clearInterval(this.interval);
      new App(this.$target);
    };
    $status.appendChild($backBtn);
    const $time = document.createElement("div");
    $time.className = "statusTime";
    $time.innerText = this.time;
    $status.appendChild($time);

    //main 추가
    const $main = document.createElement("div");
    $main.style.flex = "1";
    $main.style.display = "flex";
    $main.style.flexDirection = "column";
    $main.style.width = "100%";
    $main.style.backgroundColor = "#4C73C4";

    // Image 하단부
    const $display = document.createElement("div");
    $display.style.backgroundColor = "black";
    $display.style.width = "100%";
    // $display.style.height = "100%";
    $display.style.display = "flex";
    $display.style.justifyContent = "center";
    $display.style.alignItems = "center";
    $display.style.flex = "1";

    const $displayImg = document.createElement("img");
    $displayImg.className = "displayImg";
    $displayImg.style.maxWidth = "100%";
    $displayImg.style.maxHeight = "100%;";
    $display.appendChild($displayImg);

    // Image 리스트 wrapper
    const $imageListWrapper = document.createElement("div");
    $imageListWrapper.style.overflowX = "scroll";
    $imageListWrapper.style.overflowY = "hidden";
    $main.appendChild($imageListWrapper);
    $main.appendChild($display);
    // image 리스트
    const $imageUl = document.createElement("div");
    $imageUl.style.width = `${this.imageList.length * 80}px`;
    $imageUl.style.display = "flex";
    $imageUl.onclick = (e) => {
      if (e.target.nodeName === "IMG") {
        e.target.classList.toggle("border");
        console.log(e.target.src);
        const displayImg = document.querySelector(".displayImg");
        displayImg.src = e.target.src;
        if (this.beforeSelected !== null) {
          this.beforeSelected.classList.toggle("border");
        }
        this.beforeSelected = e.target;
      }
    };
    $imageListWrapper.appendChild($imageUl);

    for (let i = 0; i < this.imageList.length; i++) {
      const $imageLi = document.createElement("div");
      $imageLi.style.position = "relative";
      $imageLi.style.width = "65px";
      $imageLi.style.height = "50px";
      $imageLi.style.margin = "15px";

      const $image = document.createElement("img");
      $image.src = `../image/${this.imageList[i]}`;
      $image.className = "imageSelect";
      $image.style.position = "absolute";
      $image.style.top = "0";
      $image.style.left = "0";
      $image.style.transform = "translate(50,50)";
      $image.style.width = "100%";
      $image.style.height = "100%";
      $image.style.objectFit = "cover";
      $image.style.margin = "auto";
      $image.style.borderRadius = "12px";

      $imageLi.appendChild($image);
      $imageUl.appendChild($imageLi);
    }

    // 메모 화면에 추가
    this.$target.innerHTML = "";
    this.$target.appendChild($status);
    this.$target.appendChild($main);
  }
}

import { getDay } from "../utils/day.js";
import App from "./main.js";
import timer from "../utils/timer.js";

export default class Alarm {
  constructor($target) {
    this.$target = $target;
    this.time = getDay();

    this.alarmList = this.getAlarmList();
    this.timer = timer.getTimer();
    this.beforeSelected = null;
    this.ampmRegx = /(오전)|(오후)/;
    this.hourRegx = /^[0-9]{1}$|^1[0-2]{1}$/;
    this.minRegx = /(0)|(10)|(20)|(30)|(40)|(50)/;

    this.render();
    this.interval = setInterval(this.changeTime, 1000);
  }

  getAlarmList() {
    const data = localStorage.getItem("alarmList");
    return data !== null ? JSON.parse(data) : [];
  }

  changeTime() {
    this.time = getDay();
    const $time = document.querySelector(".statusTime");
    $time.textContent = this.time;
  }

  makeInputList(name, values) {
    const $list = document.createElement("input");
    $list.type = "text";
    $list.onclick = () => {
      $list.value = "";
    };
    const $dataList = document.createElement("datalist");
    $dataList.id = name + "List";
    values.forEach((value) => {
      const $list = document.createElement("option");
      $list.value = value;
      $dataList.appendChild($list);
    });
    $list.setAttribute("list", $dataList.id);

    return [$list, $dataList];
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

    //input 추가 --- wrapper
    const $wrapper = document.createElement("div");
    $wrapper.className = "alarmInput";
    $wrapper.style.justifyContent = "space-between";

    // input 시간
    const $inputTime = document.createElement("div");

    //오전오후, 시간, 분 추가
    const [$ampmList, $ampmDataList] = this.makeInputList("ampm", [
      "오전",
      "오후",
    ]);
    const [$hourList, $hourDataList] = this.makeInputList(
      "hour",
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    );
    const [$minList, $minDataList] = this.makeInputList(
      "min",
      [0, 10, 20, 30, 40, 50]
    );

    $inputTime.appendChild($ampmList);
    $inputTime.appendChild($ampmDataList);
    $inputTime.appendChild($hourList);
    $inputTime.appendChild($hourDataList);
    $inputTime.appendChild($minList);
    $inputTime.appendChild($minDataList);

    const $alarmSaveBtn = document.createElement("button");
    $alarmSaveBtn.textContent = "save";
    $alarmSaveBtn.onclick = () => {
      if (
        $ampmList.value !== "" &&
        $hourList.value !== "" &&
        $minList.value !== ""
      ) {
        if (!this.ampmRegx.test($ampmList.value)) {
          alert("오전,오후 입력이 잘못되었습니다.");
        } else if (!this.hourRegx.test($hourList.value)) {
          alert("시간 입력이 잘못되었습니다.");
        } else if (!this.minRegx.test($minList.value)) {
          alert("분 입력이 잘못되었습니다.");
        } else {
          let hour;
          if ($ampmList.value === "오전") {
            if ($hourList.value === "12") {
              hour = 0;
            } else {
              hour = $hourList.value;
            }
          } else {
            if ($hourList.value === "12") {
              hour = 12;
            } else {
              hour = +$hourList.value + 12;
            }
          }

          const now = new Date();
          const calc = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hour,
            +$minList.value
          );

          if (now < calc) {
            this.alarmList.push(calc);
            const alarmIdx = this.alarmList.length - 1;
            localStorage.setItem("alarmList", JSON.stringify(this.alarmList));
            setTimeout(() => {
              alert(`${calc.getHours()}시 ${calc.getMinutes()}분 알람 입니다.`);
              this.alarmList.splice(alarmIdx, 1);
              localStorage.setItem("alarmList", JSON.stringify(this.alarmList));
            }, calc - now);
            this.render();
          } else {
            alert("선택한 시간이 현재시간보다 과거입니다.");
          }

          console.log(calc);
        }
      } else {
        alert("(오전,오후) (시간) (분)을 선택해주세요.");
      }
    };

    $wrapper.appendChild($inputTime);
    $wrapper.appendChild($alarmSaveBtn);
    ///////

    const $newBtn = document.createElement("button");
    $newBtn.textContent = "new";
    $newBtn.onclick = () => {
      $wrapper.classList.toggle("alarmActive");
    };
    $status.appendChild($newBtn);

    //main 추가
    const $main = document.createElement("div");
    $main.style.flex = "1";
    $main.style.display = "flex";
    $main.style.flexWrap = "wrap";
    $main.style.backgroundColor = "#4C73C4";

    // alarm 리스트
    const $alarmUl = document.createElement("ul");
    $alarmUl.style.listStyle = "none";
    $alarmUl.style.width = "100%";
    $alarmUl.style.height = "100%";
    // $alarmUl.onclick = (e) => {
    //   if (e.target.nodeName === "LI") {
    //     e.target.classList.toggle("select");

    //     if (this.beforeSelected !== null) {
    //       this.beforeSelected.classList.toggle("select");
    //     }
    //     this.beforeSelected = e.target;
    //   }
    //   //   console.log(e.target.nodeName);
    // };
    $main.appendChild($alarmUl);

    for (let i = 0; i < this.alarmList.length; i++) {
      const $alarmLi = document.createElement("li");
      const alarmTime = new Date(this.alarmList[i]);
      // $alarmLi.textContent =
      $alarmLi.className = "alarmList";
      $alarmLi.style.margin = "2px 0";
      $alarmLi.style.border = "1px solid black";
      $alarmLi.style.width = "100%";
      $alarmLi.style.display = "flex";
      $alarmLi.style.justifyContent = "space-between";
      $alarmLi.style.backgroundColor = "#ffffff";
      $alarmUl.appendChild($alarmLi);

      const $text = document.createElement("div");
      $text.textContent = `${alarmTime.getHours() < 12 ? "오전" : "오후"} ${
        alarmTime.getHours() < 12
          ? alarmTime.getHours()
          : alarmTime.getHours() - 12
      }시 ${alarmTime.getMinutes()}분`;
      $alarmLi.appendChild($text);

      const $removeBtn = document.createElement("button");
      $removeBtn.textContent = "삭제";
      $removeBtn.index = i;
      $removeBtn.onclick = () => {
        console.log($removeBtn.index);
        this.alarmList.splice($removeBtn.index, 1);
        localStorage.setItem("alarmList", JSON.stringify(this.alarmList));
        clearTimeout(timer.getTimer()[$removeBtn.index]);
        timer.removeTimer($removeBtn.index);
        console.log(timer.getTimer());
        this.render();
      };
      $alarmLi.appendChild($removeBtn);
    }

    // 메모 화면에 추가
    this.$target.innerHTML = "";
    this.$target.appendChild($status);
    this.$target.appendChild($wrapper);
    this.$target.appendChild($main);
  }
}

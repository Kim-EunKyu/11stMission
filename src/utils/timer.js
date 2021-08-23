const timer = (function () {
  let timerList = [];

  return {
    addTimer: function (timer) {
      timerList.push(timer);
      console.log(timer);
    },
    getTimer: function () {
      return timerList;
    },
    removeTimer: function (index) {
      timerList.splice(index, 1);
    },
  };
})();

export default timer;

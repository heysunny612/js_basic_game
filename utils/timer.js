const MAX_TIME = 10; //3600 * 24; //최대 시간은 24시간

const gameTime = document.querySelector('.game-time');
export let isGameStart = false;
let time = 0;
let timerId = null;

const convertToTwoNumber = (num) => {
  const stringNum = String(num);
  if (stringNum.length === 1) return `0${stringNum}`;
  else return stringNum;
};

export const getTimeString = (time) => {
  //ex ) 1시간 1분 1초->
  //1초 = 1
  //1분은 = 60
  //1시간 = 3600 = 3661 초

  const hours = Math.floor(time / 3600); // 1과 나머지 61 1이 나오지 않고 1.xx로 나옴
  time = time - hours * 3600; //3661-3600 = 61
  const minutes = Math.floor(time / 60);
  time = time - minutes * 60;
  const seconds = Math.floor(time);
  return `${convertToTwoNumber(hours)}:${convertToTwoNumber(
    minutes
  )}:${convertToTwoNumber(seconds)}
  `;
};

export const startTimer = (onTimeOver) => {
  isGameStart = true;
  timerId = setInterval(() => {
    time++;
    gameTime.innerText = getTimeString(time);

    if (MAX_TIME < time) {
      onTimeOver?.();
      clearInterval(timerId);
    }
  }, 1000);
};

export const stopTimer = () => {
  isGameStart = false;
  if (timerId == null) return;
  clearInterval(timerId);
};

export const getRsultTimeString = () => {
  return getTimeString(time);
};
export const getNowTime = () => {
  return time;
};

export const setTimer = (initTime) => {
  time = initTime;
  gameTime.innerText = getTimeString(time);
};



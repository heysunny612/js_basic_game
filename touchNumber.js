import {
  startTimer,
  stopTimer,
  getRsultTimeString,
  getNowTime,
  setTimer,
} from './utils/timer.js';

import { handleModalClose, handleModalOpen } from './utils/modal.js';
import { TOUCH_NUMBER_SCORE_KEY } from './constants/localStorage.js';

const numberButtonList = document.querySelectorAll('.number-button');
const maxId = numberButtonList.length;
let currentNumber = 1;

const handleSuccessGame = () => {
  stopTimer();
  handleModalOpen({
    isSuccess: true,
    timeString: getRsultTimeString(),
  });

  const nowSpendTime = getNowTime();
  const currentSpendTime = localStorage.getItem(TOUCH_NUMBER_SCORE_KEY);
  if (!currentSpendTime || currentSpendTime > nowSpendTime) {
    localStorage.setItem(TOUCH_NUMBER_SCORE_KEY, nowSpendTime);
  }
  setTimer(0);
};

const handleFailedGame = () => {
  stopTimer();
  handleModalOpen({
    isSuccess: false,
    timeString: null,
  });
  setTimer(0);
};

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const setButtonDOM = () => {
  for (let numberButton of numberButtonList) {
    numberButton.style.display = 'block';
    numberButton.style.top = `${getRandom(0, 90)}%`;
    numberButton.style.left = `${getRandom(0, 90)}%`;
    numberButton.onclick = (event) => {
      const numId = Number(event.target.innerText);
      if (isNaN(numId)) return;
      if (numId !== currentNumber) {
        return;
      }
      event.target.style.display = 'none';
      if (numId === 1) {
        startTimer(handleFailedGame);
      }
      if (numId === maxId) {
        handleSuccessGame();
        return;
      }
      currentNumber++;
    };
  }
};

const initializeTouchNumberGame = () => {
  stopTimer();
  setTimer(0);
  setButtonDOM();
  currentNumber = 1;
};

const initialize = () => {
  const [headerRetryButton, modalRetryButton] =
    document.querySelectorAll('.retry-button');
  headerRetryButton.onclick = () => {
    handleModalClose(initializeTouchNumberGame);
  };
  modalRetryButton.onclick = () => {
    handleModalClose(initializeTouchNumberGame);
  };
};

setButtonDOM();
initialize();

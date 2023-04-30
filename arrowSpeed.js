import { ARROW_SPEED_SCORE_KEY } from './constants/localstorage.js';
import { handleModalClose, handleModalOpen } from './utils/modal.js';
import { makeDOMwithProperties } from './utils/dom.js';
import {
  getNowTime,
  getRsultTimeString,
  setTimer,
  startTimer,
  stopTimer,
} from './utils/timer.js';

const MAX_ARROW = 8;
const MAX_ROUND = 3;

let round = 1;
let arrowDOMList = [];
let currentIndex = 0;

const handleSuccessGame = () => {
  handleModalOpen({
    isSuccess: true,
    timeString: getRsultTimeString(),
  });
  stopTimer();
  const nowScore = getNowTime();
  const currentScore = localStorage.getItem(ARROW_SPEED_SCORE_KEY);
  if (!currentScore || currentScore > nowScore) {
    localStorage.setItem(ARROW_SPEED_SCORE_KEY, nowScore);
  }
  setTimer(0);
};

const arrowFieldDOM = document.getElementById('arrow-field');

const clearArrowDOM = () => {
  arrowDOMList.forEach((arrowDOM) => {
    arrowDOM.remove();
  });
  arrowDOMList = [];
};

const setArrowDOM = () => {
  clearArrowDOM();
  for (let i = 0; i < MAX_ARROW; i++) {
    const direction = Math.random() > 0.5 ? 'left' : 'right';
    const arrowDOM = makeDOMwithProperties('span', {
      className: `arrow arrow-${direction}`,
      innerHTML: direction === 'left' ? '&lt;' : '&gt',
    });
    arrowDOMList.push(arrowDOM);
    arrowFieldDOM.appendChild(arrowDOM);
  }
};

const setKeyboardEvent = () => {
  const handleCorrect = () => {
    arrowDOMList[currentIndex].style.display = 'none';
    currentIndex++;
    if (currentIndex === MAX_ARROW) {
      if (round === MAX_ROUND) {
        handleSuccessGame();
      }
      currentIndex = 0;
      setArrowDOM();
      round += 1;
    }
  };

  window.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    const isFirst = currentIndex === 0 && round === 1;
    if (isFirst) startTimer();
    const isLeft = arrowDOMList[currentIndex].innerHTML === '&lt;';
    if (isLeft && event.key === 'ArrowLeft') {
      handleCorrect();
    }
    if (!isLeft && event.key === 'ArrowRight') {
      handleCorrect();
    }
    // 실패
  });
};

const onArrowSpeedGameEnd = () => {
  stopTimer();
  setTimer(0);
  currentIndex = 0;
  round = 1;
  setArrowDOM();
};

const initializeArrowSpeedGame = () => {
  const headerRetryButton = document.getElementsByClassName('retry-button')[0];
  const modalButtonContainer = document.getElementsByClassName(
    'modal-button-container'
  )[0];
  const [homeAnchorButton, retryButton] = modalButtonContainer.children;
  homeAnchorButton.onclick = () => handleModalClose(onArrowSpeedGameEnd);
  retryButton.onclick = () => handleModalClose(onArrowSpeedGameEnd);
  headerRetryButton.onclick = () => handleModalClose(onArrowSpeedGameEnd);
};

setArrowDOM();
setKeyboardEvent();
initializeArrowSpeedGame();

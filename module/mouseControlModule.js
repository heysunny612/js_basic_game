import { makeDOMwithProperties } from '../utils/dom.js';
import {
  startTimer,
  stopTimer,
  setTimer,
  isGameStart,
  getRsultTimeString,
  getNowTime,
} from '../utils/timer.js';
import { handleModalOpen } from '../utils/modal.js';
import { MOUSE_CONTROL_SCORE_KEY } from '../constants/localStorage.js';

let boxDOMlist = [];
let wallBoxDOMList = [];
let startBoxDOM = null;
let endBoxDOM = null;

const gameField = document.querySelector('#game-field');

export const initMouseControlGame = () => {
  startBoxDOM.innerText = 'START';
  endBoxDOM.innerText = 'END';
  boxDOMlist.forEach((boxDOM) => {
    boxDOM.style.backgroundColor = 'transparent';
  });
  stopTimer();
  setTimer(0);
  isGameStart = false;
};

const handleSuccessGame = () => {
  stopTimer();
  handleModalOpen({ isSuccess: true, timeString: getRsultTimeString() });
  const nowSpendTime = getNowTime();
  const currentSpendTime = localStorage.getItem(MOUSE_CONTROL_SCORE_KEY);
  if (!currentSpendTime || currentSpendTime > nowSpendTime) {
    localStorage.setItem(MOUSE_CONTROL_SCORE_KEY, nowSpendTime);
  }
  setTimer(0);
};
const handleFailedGame = () => {
  stopTimer();
  handleModalOpen({ isSuccess: false, timeString: null });
  setTimer(0);
};

export const setBoxDOM = ({ row, col, start, end, walls }) => {
  const controlBoxContainer = makeDOMwithProperties('div', {
    id: 'control-box-container',
    onmouseleave: () => {
      if (!isGameStart) return;
      handleFailedGame();
    },
  });

  controlBoxContainer.style.display = 'gird';
  controlBoxContainer.style.gridTemplateRows = `repeat(${row},1fr)`;
  controlBoxContainer.style.gridTemplateColums = `repeat(${col},1fr)`;

  for (let i = 1; i < row + 1; i++) {
    for (let j = 1; j < col + 1; j++) {
      const {
        type,
        className,
        innerText = '',
        onmouseover,
      } = (function () {
        if (i === start[0] && j === start[1]) {
          return {
            type: 'start',
            className: 'control-box start',
            innerText: 'START',
            onmouseover: (event) => {
              startTimer(handleFailedGame);
              event.target.innerText = '';
            },
          };
        }
        if (i === end[0] && j === end[1]) {
          return {
            type: 'end',
            className: 'control-box end',
            innerText: 'END',
            onmouseover: (event) => {
              if (!isGameStart) return;
              event.target.innerText = '';
              handleSuccessGame();
            },
          };
        }
        for (let wall of walls) {
          if (i === wall[0] && j === wall[1]) {
            return {
              type: 'wall',
              className: 'control-box wall',
              onmouseover: () => {
                if (!isGameStart) return;
                handleFailedGame();
              },
            };
          }
        }
        return {
          type: 'normal',
          className: 'control-box',
          onmouseover: (event) => {
            if (!isGameStart) return;
            event.target.style.backgroundColor = 'linen';
          },
        };
      })();
      const boxDOM = makeDOMwithProperties('div', {
        id: `box-${i}-${j}`,
        className,
        innerText,
        onmouseover,
      });

      switch (type) {
        case 'start':
          startBoxDOM = boxDOM;
          break;
        case 'end':
          endBoxDOM = boxDOM;
          break;
        case 'wall':
          wallBoxDOMList.push(boxDOM);
          break;
        default:
          boxDOMlist.push(boxDOM);
      }
      controlBoxContainer.appendChild(boxDOM);
    }
  }

  gameField.appendChild(controlBoxContainer);
};

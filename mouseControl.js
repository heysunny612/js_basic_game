import { setBoxDOM, initMouseControlGame } from './module/mouseControlModule.js';
import { handleModalClose } from './utils/modal.js';

const onMouseControlGameEnd = () => {
  initMouseControlGame();
};

const initialize = () => {
  const retryButton = document.querySelector('.retry-button');
  retryButton.onclick = () => {
    handleModalClose(onMouseControlGameEnd);
  };
};

setBoxDOM({
  row: 5,
  col: 5,
  start: [1, 1],
  end: [5, 5],
  walls: [
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
  ],
});

initialize();

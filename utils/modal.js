const modalDOM = document.querySelector('.modal');
const [modalTitle, modalDescription] = modalDOM.children;

export const handleModalOpen = ({ isSuccess, timeString }) => {
  modalDOM.classList.add('open');
  if (isSuccess) {
    modalTitle.innerText = '성공';
    modalDescription.innerText = `${timeString}만에 성공하였습니다!`;
  } else {
    modalTitle.innerText = '실패';
    modalDescription.innerText = `다시 한번 시도해보세요!`;
  }
};

export const handleModalClose = (onModalClose) => {
  modalDOM.classList.remove('open');
  onModalClose?.();
};

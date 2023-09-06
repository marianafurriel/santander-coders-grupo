// Abrir e fechar modal do começo do jogo
const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"));
};
  
modalCancelButton.addEventListener("click", function(event) {
    toggleModal();
});

modalOkButton.addEventListener("click", function(event) {
    toggleModal();
    countDown();
});

// Abrir e fechar modal do reset do jogo
const toggleModalReset = () => {
    [modal2, fade2].forEach((el) => el.classList.toggle("hide"));
};
  
modalNaoButton.addEventListener("click", function(event) {
    toggleModalReset();
});

modalSimButton.addEventListener("click", function(event) {
    toggleModalReset();
    countDown();
});

// Abrir e fechar Contagem regressiva
const toggleModalCountdown = () => {
    botoesColoridos.classList.toggle("hide");
    mypopup.classList.toggle("hide");
};
class Modal {

    // Abrir e fechar modal do começo do jogo
    toggleModal = () => {
        [modal, fade].forEach((el) => el.classList.toggle("hide"));
    };
    
    cancelButton = modalCancelButton.addEventListener("click", function(event) {
        toggleModal();
    });

    okbutton = modalOkButton.addEventListener("click", function(event) {
        toggleModal();
        countDown();
    });

    // Abrir e fechar modal do reset do jogo
    toggleModalReset = () => {
        [modal2, fade2].forEach((el) => el.classList.toggle("hide"));
    };
    
    naoButton = modalNaoButton.addEventListener("click", function(event) {
        toggleModalReset();
    });

    simButton = modalSimButton.addEventListener("click", function(event) {
        toggleModalReset();
        countDown();
    });

    // Abrir e fechar Contagem regressiva
    toggleModalCountdown = () => {
        botoesColoridos.classList.toggle("hide");
        mypopup.classList.toggle("hide");
    };
}
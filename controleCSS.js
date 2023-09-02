const botoes = [...document.querySelectorAll(".botao")];
botoes.forEach((botao) => botao.addEventListener("mousedown", adicionarBlur));
botoes.forEach((botao) => botao.addEventListener("mouseup", removerBlur));

function adicionarBlur() {
  const cor = getComputedStyle(this).backgroundColor;
  this.style.boxShadow = `0px 0px 60px 4px ${cor}`;
}

function removerBlur() {
  this.style.boxShadow = ``;
}

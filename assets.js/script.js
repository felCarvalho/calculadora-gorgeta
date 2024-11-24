//modo de seguranca do Java Script.(recomendado para os dias atuais)
"use strict";

//capturando todos os elementos necessarios para a implementação da aplicação.
const form = document.querySelector(".form");
const imgError = document.querySelector(".img-error");
const mensagemUpdate = document.querySelector(".mensagem-error");
const valorDividoPessoas = document.querySelector(".valor-dividido");
const gorgetaGarçom = document.querySelector(".gorgeta");
const valorTotal = document.querySelector(".valor-total");
const numeroPessoas = document.querySelector(".pessoas");
const contaBase = document.querySelector(".conta");
const limpar = document.querySelector(".limpar");
const input = document.querySelectorAll("input");
const containerError = document.querySelector(".container-error");
const clearInput1 = document.querySelector(".delete-1");
const clearInput2 = document.querySelector(".delete-2");
const clearInput3 = document.querySelector(".delete-3");

let conta = parseFloat(document.querySelector("#conta").value);
let pessoas = parseFloat(document.querySelector("#pessoas").value);
let porcentagem = parseFloat(document.querySelector("#porcentagem").value);
console.log(conta, pessoas, porcentagem);

//funçao para exibir o resultado do calculo no html.
const mostrarResultado = function () {
  gorgetaGarçom.classList.remove("delete-resultado");
  valorTotal.classList.remove("delete-resultado");
  valorDividoPessoas.classList.remove("delete-resultado");
  numeroPessoas.classList.remove("delete-resultado");
  contaBase.classList.remove("delete-resultado");
};

//função para retirar o resultado.
const desativaResultado = function () {
  gorgetaGarçom.classList.add("delete-resultado");
  valorTotal.classList.add("delete-resultado");
  valorDividoPessoas.classList.add("delete-resultado");
  numeroPessoas.classList.add("delete-resultado");
  contaBase.classList.add("delete-resultado");
};

//funçao para inserir mensagem de erro no html.
const errorUpdatePadrao = function (mensagem) {
  mensagemUpdate.classList.remove("delete");
  containerError.classList.remove("delete");
  mensagemUpdate.textContent = mensagem;
};

//função de exibir a img junto de uma das mensagens de error.
const errorImgAtivado = function () {
  imgError.classList.remove("delete");
};

//função para desativar a exibição da img quando não for a mensagem de erro rgeral
//mensagem geral === (Ops! digite valores válidos para  realizarmos o calculo 🙃.)
const errorImgDesativado = function () {
  imgError.classList.add("delete");
};

//funçao de click para limpar os campos de input.
//desativar img de error/desativar mensagem de error.  === (caso esteja ativado.)
limpar.addEventListener("click", () => {
  errorImgDesativado();
  desativaResultado();
  mensagemUpdate.classList.add("delete");
  containerError.classList.add("delete");
  for (let i = 0; i < input.length; i++) {
    input[i].value = "";
  }
});

//funçoes para apagar o valor de cada input separadamente
clearInput1.addEventListener("click", () => {
  document.querySelector("#conta").value = "";
});
clearInput2.addEventListener("click", () => {
  document.querySelector("#porcentagem").value = "";
});
clearInput3.addEventListener("click", () => {
  document.querySelector("#pessoas").value = "";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //capturando valores do input/e transformando em número não string.
  conta = parseFloat(document.querySelector("#conta").value);
  pessoas = parseFloat(document.querySelector("#pessoas").value);
  porcentagem = parseFloat(document.querySelector("#porcentagem").value);
  console.log(conta, pessoas, porcentagem);

  //verificando se o campo inicial de algum está invalido.
  if (
    isNaN(conta) ||
    conta <= 0 ||
    isNaN(pessoas) ||
    pessoas <= 0 ||
    isNaN(porcentagem) ||
    porcentagem <= 0
  ) {
    errorUpdatePadrao(`Ops! Digite valores válidos 🫥.`);
    errorImgAtivado();
    desativaResultado();

    //verificando se pessoas excede o valor referido.
  } else if (porcentagem > 25 && pessoas > 25) {
    errorUpdatePadrao(`Ops! verifique a porcentagem e pessoas 👍.`);
    errorImgAtivado();
    desativaResultado();
  } else if (pessoas > 25) {
    errorUpdatePadrao(`Foi Mal! limite máximo de 25 pessoas 👍.`);
    errorImgDesativado();
    desativaResultado();

    //verificando se porcentagem excede o valor referido
  } else if (porcentagem > 25) {
    errorUpdatePadrao(`Foi Mal! máximo de 25% para porcentagem 👍.`);
    errorImgDesativado();
    desativaResultado();
  } else {
    //aqui está toda a inserção de resultado em seus devidos elementos no html.
    const percentual = porcentagem / 100;
    const gorgeta = percentual * conta;
    const total = gorgeta + conta;
    const valorDividido = total / pessoas;

    gorgetaGarçom.textContent = `Gorgeta: ${gorgeta.toFixed(2)} R$`;
    valorTotal.textContent = `Total: ${total.toFixed(2)} R$`;
    valorDividoPessoas.textContent = `Valor por Pessoa: ${valorDividido.toFixed(
      2
    )} R$`;
    numeroPessoas.textContent = `Numero de Pessoas: ${pessoas.toFixed(0)}`;
    contaBase.textContent = `Conta: ${conta.toFixed(2)} R$`;
    console.log(percentual, gorgeta, total, valorDividido);
    //funçao auxiliar.
    mostrarResultado();
    errorUpdatePadrao();
    errorImgDesativado();
  }
});

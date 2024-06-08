const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector(".list-tasks");

let minhaListaDeItens = carregarListaDoLocalStorage();

function carregarListaDoLocalStorage() {
  const itensSalvos = localStorage.getItem("minhaListaDeItens");
  return itensSalvos ? JSON.parse(itensSalvos) : [];
}

function salvarListaNoLocalStorage() {
  localStorage.setItem("minhaListaDeItens", JSON.stringify(minhaListaDeItens));
}

function adicionarNovaTarefa() {
  const novaTarefa = {
    tarefa: input.value,
    concluida: false,
  };

  minhaListaDeItens.push(novaTarefa);
  input.value = "";

  mostraTarefa();
  salvarListaNoLocalStorage();
}

function mostraTarefa() {
  let novaLi = "";

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi += `
<li class="task ${item.concluida ? "done" : ""}">
  <input type="checkbox" id="checkbox-${posicao}" ${item.concluida && "checked"} onclick="concluirTarefa(${posicao})">
  <label for="checkbox-${posicao}">${item.tarefa}</label>
  <img src="./img/trash-bin_5028066.png" alt="lixeira-exlui tarefa" onclick="deletarItem(${posicao})">
</li>`;
  });

  listaCompleta.innerHTML = novaLi;
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

  mostraTarefa();
  salvarListaNoLocalStorage();
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);

  //Salva a lista em local store
  mostraTarefa();
  salvarListaNoLocalStorage();
}

button.addEventListener("click", adicionarNovaTarefa);

// Carrega a lista na primeira execução
mostraTarefa();

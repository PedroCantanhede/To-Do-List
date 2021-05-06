// GET Elements
// querySelector - Retorna o primeiro elemento que corresponde aos seletores especificados 
const inputBox = document.querySelector(".input-box input");
const addButton = document.querySelector(".input-box button");
const todoBox = document.querySelector(".todo-box");
const clearAll = document.querySelector(".pending button");

// onkeyup - Evento disparado assim que a tecla é pressionada
inputBox.onkeyup = ()=> {
    let userData = inputBox.value; // Recebe valor dentro da inputBox
    if(userData.trim() !=0) { // Se os valores digitados não forem espaços
        addButton.classList.add("active"); // Ativa o ADD Button
    } else {
        addButton.classList.remove("active"); // Remove o ADD Button
    }
}

showTasks(); // Chamando função showTasks()

// onclick - aciona uma função quando um elemento é clicado
addButton.onclick = ()=> {
    let userData = inputBox.value; // Recebe valor dentro da inputBox
    let getLocalStorage = localStorage.getItem("Novo"); // Recebendo local storage (armazenamento local)
    if(getLocalStorage == null) { // Se local storage for vazio, então criar array vazio
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage); // JSON.parse analisa uma string e retorna um objeto JS
    }
    listArr.push(userData); // Pucha os dados do usuário
    localStorage.setItem("Novo", JSON.stringify(listArr)); // Converte objeto javascript para objeto JSON
    showTasks(); // Chamando função showTasks()
}

// Função adiciona <li> preenchida com o que o usuário inseriu dentro da <ul>
function showTasks() {
    let getLocalStorage = localStorage.getItem("Novo"); // Recebendo local storage (armazenamento local)
    if(getLocalStorage == null) { // Se local storage for vazio, então criar array vazio
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage); // JSON.parse analisa uma string e retorna um objeto JS
    }
    const pendingNumb = document.querySelector(".number-pending");
    pendingNumb.textContent = listArr.length; // A propriedade length obtem o tamanho de elementos em um Array ou String
    // Se o tamanho da lista for maior que 0, ativar clearAll, se não desativar clearAll
    if(listArr.length > 0) { 
        clearAll.classList.add("active");
    } else {
        clearAll.classList.remove("active");
    }
    let newLiTag = '';
    // O método forEach() executa uma dada função em cada elemento de um array
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="removeTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoBox.innerHTML = newLiTag; // Adicionando nova tag <li> dentro da tag <ul>
    inputBox.value = ""; // Uma vez que a tarefa é adicionada, deixe o campo de entrada em branco
}

// Função remove tarefa
function removeTask(index) {
    let getLocalStorage = localStorage.getItem("Novo"); // Recebendo local storage (armazenamento local)
    listArr = JSON.parse(getLocalStorage); // JSON.parse analisa uma string e retorna um objeto JS
    listArr.splice(index, 1); // O método splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos
    localStorage.setItem("Novo", JSON.stringify(listArr)); // Converte objeto javascript para objeto JSON
    showTasks(); // Chamando função showTasks()
}

// onclick - aciona a função clearAll quando o button é clicado
clearAll.onclick = ()=> {
    listArr = []; // Array vazio 
    localStorage.setItem("Novo", JSON.stringify(listArr)); // Converte objeto javascript para objeto JSON
    showTasks(); // Chamando função showTasks()
}
const usuarioLogado = buscarDadosDoLocalStorage('usuarioLogado');

if(!usuarioLogado.email) {
    window.location.href = './index.html'
}

const formularioHTML = document.getElementById('formulario-recados')

const tbody = document.getElementById('registros')

document.addEventListener('DOMContentLoaded', montarRegistrosNoHTML)

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const tarefa = document.getElementById('tarefa').value 
    const detalhamento = document.getElementById('detalhamento').value

    const recado = {
        tarefa: tarefa,
        detalhamento: detalhamento,
    }

    usuarioLogado.recados.push(recado)
    guardarNoLocalStorage('usuarioLogado', usuarioLogado)

    formularioHTML.reset()

    montarRegistrosNoHTML()
})

function montarRegistrosNoHTML() {
    tbody.innerHTML = '';

    usuarioLogado.recados.forEach((valor, index) => {
        tbody.innerHTML += `
            <tr id="${index}">
                <td>${index +1} </td>
                <td>${valor.tarefa}</td>
                <td>${valor.detalhamento}</td>
                <td>
                    <button id="apagar" onclick="apagarRecado(${index})">
                        <i class="bi bi-trash3"></i>
                        Apagar
                    </button>
                    <button id="editar" onclick="editarRecado(${valor})">
                        <i class="bi bi-pen"></i>
                        Editar
                    </button> 
                </td>
            </tr>
        `
        console.log(usuarioLogado.recados);
    })
}

function guardarNoLocalStorage(chave, valor) {
    const valorJSON = JSON.stringify(valor)

    localStorage.setItem(chave, valorJSON)
}

function buscarDadosDoLocalStorage(chave) {
    const dadoJSON = localStorage.getItem(chave)

    if(dadoJSON) {
        const listaDados = JSON.parse(dadoJSON)
        return listaDados
    } else {
        return {}
    }
}

function apagarRecado(índice) {
    usuarioLogado.recados.splice(indice, 1)

    guardarNoLocalStorage('usuarioLogado', usuarioLogado)

    const tr = document.getElementById(indice)
    tr.remove()
}

function editarRecado(valor) {
    

}




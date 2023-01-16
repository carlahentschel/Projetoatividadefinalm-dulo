const listaUsuarios = buscarDadosDoLocalStorage('usuarios')

const formularioHTML = document.getElementById('formulario-cadastro')

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const email = document.getElementById('email-cadastrado').value 
    const senha = document.getElementById('senha-cadastrada').value
    const senhaRepetida = document.getElementById('confirma-senha-cadastrada').value

    if(senha !== senhaRepetida) {
        alert('As senhas devem ser iguais. Tente novamente')
        return
    }

    const novoUsuario = {
        email: email,
        senha: senha,
        recados: []
    }

    const existe = listaUsuarios.some((valor) => valor.email === novoUsuario.email)

    if(existe) {
        alert('Usuário já cadastrado!')
        formularioHTML.reset()
        return
    }

    listaUsuarios.push(novoUsuario)

    guardarNoLocalStorage('usuarios', listaUsuarios)

    formularioHTML.reset()

    window.location.href = './index.html'
})

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
        return []
    }
}
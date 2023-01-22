const listaUsuarios = buscarDadosDoLocalStorage('usuarios')

const formularioHTML = document.getElementById('formulario-cadastro')

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const email = document.getElementById('email-cadastrado').value 
    const senha = document.getElementById('senha-cadastrada').value
    const senhaRepetida = document.getElementById('confirma-senha-cadastrada').value
    const feedbackHTML = document.getElementById('feedback')

    if(senha !== senhaRepetida) {
        feedbackHTML.innerHTML = 'As senhas devem ser iguais. 😉👉 Tente novamente!'

        setTimeout( () => {
            feedbackHTML.innerHTML = ''
        }, 3000)

        return
    }

    const novoUsuario = {
        email: email,
        senha: senha,
        recados: []
    }

    const existe = listaUsuarios.some((valor) => valor.email === novoUsuario.email)

    if(existe) {
        feedbackHTML.innerHTML = 'Este e-mail já foi cadastrado! 😕'

        setTimeout( () => {
            feedbackHTML.innerHTML = ''
        }, 5000)

        formularioHTML.reset()
        return
    }

    listaUsuarios.push(novoUsuario)

    feedbackHTML.innerHTML = 'Usuário cadastrado com sucesso! 🤩'

    setTimeout( () => {
        feedbackHTML.innerHTML = ''

        window.location.href = './index.html'
    }, 5000)

    guardarNoLocalStorage('usuarios', listaUsuarios)

    formularioHTML.reset()
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
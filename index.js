const listaUsuarios = buscarDadosDoLocalStorage('usuarios')

const formularioHTML = document.getElementById('formulario-login')

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()
    
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const feedbackHTML = document.getElementById('feedback-login')
    
    const usuarioEncontrado = listaUsuarios.find( (valor) => valor.email === email && valor.senha === senha)

    if(!usuarioEncontrado) {
        feedbackHTML.innerHTML = 'Ooops, e-mail ou senha estão incorretos!'

        setTimeout( () => {
            feedbackHTML.innerHTML = ''
        }, 3000)

        formularioHTML.reset()
        return

    } else {
        guardarNoLocalStorage('usuarioLogado', usuarioEncontrado)
        window.location.href = './recados.html'
    }
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
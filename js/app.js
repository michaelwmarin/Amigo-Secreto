let amigos = [];

function adicionar() {
    let amigoInput = document.getElementById('nome-amigo');
    let nomeAmigo = amigoInput.value.trim();

    if (nomeAmigo === '') {
        alert('Informe o nome do amigo!');
        return;
    }

    if (amigos.includes(nomeAmigo)) {
        alert('Nome já adicionado!');
        return;
    }

    let lista = document.getElementById('lista-amigos');
    amigos.push(nomeAmigo);

    if (lista.textContent == '') {
        lista.textContent = nomeAmigo;
    } else {
        lista.textContent = lista.textContent + ', ' + nomeAmigo;
    }
    amigoInput.value = '';
    amigoInput.focus();
}

function sortear() {
    if (amigos.length < 4) {
        alert('Adicione pelo menos 4 participantes!');
        return;
    }

    // Cria uma cópia da lista de amigos para ser a lista de quem vai receber o presente
    let recebedores = [...amigos];
    let sorteioValido = false;

    // Este laço garante que o sorteio seja refeito caso alguém tire a si mesmo
    while (!sorteioValido) {
        // Embaralha a lista de recebedores
        embaralha(recebedores);
        sorteioValido = true; // Assume que o sorteio é válido

        // Verifica se algum doador tirou a si mesmo na lista de recebedores
        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === recebedores[i]) {
                sorteioValido = false; // Encontrou um problema, o sorteio é inválido
                break; // Sai da verificação e força um novo embaralhamento
            }
        }
    }

    let sorteioDiv = document.getElementById('lista-sorteio');
    sorteioDiv.innerHTML = '';

    // Exibe os pares formados
    for (let i = 0; i < amigos.length; i++) {
        sorteioDiv.innerHTML += amigos[i] + ' --> ' + recebedores[i] + '<br>';
    }
}

// Algoritmo de Fisher-Yates para embaralhar a lista
function embaralha(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        // Atribuição via desestruturação
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function reiniciar() {
    amigos = [];
    document.getElementById('lista-amigos').textContent = '';
    document.getElementById('lista-sorteio').innerHTML = '';
    document.getElementById('nome-amigo').value = '';
}
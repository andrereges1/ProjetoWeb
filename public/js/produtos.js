async function carregarProdutos() {
  const listaProdutos = document.getElementById("lista-produtos");
  const mensagemProdutos = document.getElementById("mensagem-produtos");

  if (!listaProdutos || !mensagemProdutos) {
    return;
  }

  try {
    listaProdutos.textContent = "";
    mensagemProdutos.textContent = "Carregando produtos...";

    const resposta = await fetch("/api/produtos");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar produtos");
    }

    const produtos = await resposta.json();

    if (produtos.length === 0) {
      mensagemProdutos.textContent = "Nenhum produto disponível no momento.";
      return;
    }

    mensagemProdutos.textContent = "";

    produtos.forEach(function(produto) {
      const card = criarCardProduto(produto);
      listaProdutos.appendChild(card);
    });
  } catch (erro) {
    mensagemProdutos.textContent = "Não foi possível carregar os produtos.";
    console.log(erro);
  }
}

function criarCardProduto(produto) {
  const card = document.createElement("article");
  card.classList.add("cartao-produto");

  if (produto.disponivel === false) {
    card.classList.add("produto-indisponivel");
  }

  const imagemContainer = document.createElement("div");
  imagemContainer.classList.add("imagem-produto");

  const imagem = document.createElement("img");
  imagem.src = produto.imagem;
  imagem.alt = produto.nome + " usado";

  imagemContainer.appendChild(imagem);

  const conteudo = document.createElement("div");
  conteudo.classList.add("conteudo-produto");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.nome;

  conteudo.appendChild(titulo);

  if (produto.disponivel === false) {
    const statusIndisponivel = document.createElement("span");
    statusIndisponivel.classList.add("status-indisponivel");
    statusIndisponivel.textContent = "Indisponível";
    conteudo.appendChild(statusIndisponivel);
  }

  const especificacoes = document.createElement("ul");
  especificacoes.classList.add("especificacoes-produto");

  adicionarItemEspecificacao(especificacoes, "Marca: " + produto.marca);
  adicionarItemEspecificacao(especificacoes, "Estado: " + produto.estado);
  adicionarItemEspecificacao(especificacoes, "Armazenamento: " + produto.armazenamento);
  adicionarItemEspecificacao(especificacoes, "Cor: " + produto.cor);

  const descricao = document.createElement("p");
  descricao.textContent = produto.descricao;

  const preco = document.createElement("strong");
  preco.classList.add("preco");
  preco.textContent = produto.precoFormatado;

  const acoes = document.createElement("div");
  acoes.classList.add("acoes-cartao");

  const linkDetalhes = document.createElement("a");
  linkDetalhes.href = "detalhes.html?id=" + produto.id;
  linkDetalhes.classList.add("botao");
  linkDetalhes.classList.add("botao-contorno");
  linkDetalhes.textContent = "Ver detalhes";

  acoes.appendChild(linkDetalhes);

  if (produto.disponivel === true) {
    const botaoCarrinho = document.createElement("button");
    botaoCarrinho.type = "button";
    botaoCarrinho.title = "Carrinho simulado para fins acadêmicos";
    botaoCarrinho.classList.add("botao");
    botaoCarrinho.classList.add("botao-principal");
    botaoCarrinho.textContent = "Adicionar ao carrinho";

    botaoCarrinho.addEventListener("click", function() {
      adicionarProdutoCarrinhoProduto(produto.id, botaoCarrinho);
    });

    acoes.appendChild(botaoCarrinho);
  } else {
    const indisponivel = document.createElement("span");
    indisponivel.classList.add("botao");
    indisponivel.classList.add("botao-desabilitado");
    indisponivel.textContent = "Indisponível";

    acoes.appendChild(indisponivel);
  }

  conteudo.appendChild(especificacoes);
  conteudo.appendChild(descricao);
  conteudo.appendChild(preco);

  card.appendChild(imagemContainer);
  card.appendChild(conteudo);
  card.appendChild(acoes);

  return card;
}

function adicionarItemEspecificacao(lista, texto) {
  const item = document.createElement("li");
  item.textContent = texto;
  lista.appendChild(item);
}

async function adicionarProdutoCarrinhoProduto(produtoId, botao) {
  try {
    botao.disabled = true;
    botao.textContent = "Adicionando...";

    const resposta = await fetch("/api/carrinho/adicionar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        produtoId: produtoId
      })
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      alert(resultado.mensagem || "Erro ao adicionar produto.");
      return;
    }

    alert(resultado.mensagem || "Produto adicionado ao carrinho.");
    window.location.href = "carrinho.html";
  } catch (erro) {
    alert("Não foi possível adicionar o produto ao carrinho.");
    console.log(erro);
  } finally {
    botao.disabled = false;
    botao.textContent = "Adicionar ao carrinho";
  }
}

if (document.getElementById("lista-produtos")) {
  carregarProdutos();
}

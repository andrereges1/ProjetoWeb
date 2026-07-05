async function carregarDadosLoja() {
  try {
    const resposta = await fetch("/api/loja");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar dados da loja");
    }

    const loja = await resposta.json();

    preencherDadosLoja(loja);
  } catch (erro) {
    console.log(erro);
  }
}

function preencherDadosLoja(loja) {
  const nomeLoja = document.getElementById("nome-loja");
  const sloganLoja = document.getElementById("slogan-loja");
  const descricaoLoja = document.getElementById("descricao-loja");
  const avisoLoja = document.getElementById("aviso-loja");

  if (nomeLoja) {
    nomeLoja.textContent = loja.nome;
  }

  if (sloganLoja) {
    sloganLoja.textContent = loja.slogan;
  }

  if (descricaoLoja) {
    descricaoLoja.textContent = loja.descricao;
  }

  if (avisoLoja) {
    avisoLoja.textContent = loja.aviso;
  }
}

async function carregarProdutosDestaque() {
  const areaDestaques = document.getElementById("produtos-destaque");
  const mensagem = document.getElementById("mensagem-destaques");

  if (!areaDestaques) {
    return;
  }

  try {
    if (mensagem) {
      mensagem.textContent = "Carregando produtos em destaque...";
    }

    const resposta = await fetch("/api/destaques");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar produtos em destaque");
    }

    const produtos = await resposta.json();

    areaDestaques.textContent = "";

    if (produtos.length === 0) {
      if (mensagem) {
        mensagem.textContent = "Nenhum produto em destaque no momento.";
      }

      return;
    }

    if (mensagem) {
      mensagem.textContent = "";
    }

    produtos.forEach(function(produto) {
      const card = criarCardDestaque(produto);
      areaDestaques.appendChild(card);
    });
  } catch (erro) {
    if (mensagem) {
      mensagem.textContent = "Não foi possível carregar os produtos em destaque.";
    }

    console.log(erro);
  }
}

function criarCardDestaque(produto) {
  const card = document.createElement("article");
  card.classList.add("cartao-produto");

  if (produto.disponivel === false) {
    card.classList.add("produto-indisponivel");
  }

  const imagemContainer = document.createElement("div");
  imagemContainer.classList.add("imagem-produto");

  const imagem = document.createElement("img");
  imagem.setAttribute("src", produto.imagem);
  imagem.setAttribute("alt", produto.nome + " usado");

  imagemContainer.appendChild(imagem);

  const conteudo = document.createElement("div");
  conteudo.classList.add("conteudo-produto");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.nome;

  const especificacoes = document.createElement("ul");
  especificacoes.classList.add("especificacoes-produto");

  adicionarItemDestaque(especificacoes, "Estado: " + produto.estado);
  adicionarItemDestaque(especificacoes, "Armazenamento: " + produto.armazenamento);

  const descricao = document.createElement("p");
  descricao.textContent = produto.descricao;

  const preco = document.createElement("strong");
  preco.classList.add("preco");
  preco.textContent = produto.precoFormatado;

  conteudo.appendChild(titulo);

  if (produto.disponivel === false) {
    const statusIndisponivel = document.createElement("span");
    statusIndisponivel.classList.add("status-indisponivel");
    statusIndisponivel.textContent = "Indisponível";
    conteudo.appendChild(statusIndisponivel);
  }

  conteudo.appendChild(especificacoes);
  conteudo.appendChild(descricao);
  conteudo.appendChild(preco);

  const acoes = document.createElement("div");
  acoes.classList.add("acoes-cartao");

  const detalhes = document.createElement("a");
  detalhes.setAttribute("href", "pages/detalhes.html?id=" + produto.id);
  detalhes.classList.add("botao");
  detalhes.classList.add("botao-contorno");
  detalhes.textContent = "Ver detalhes";

  acoes.appendChild(detalhes);

  if (produto.disponivel === true) {
    const botaoCarrinho = document.createElement("button");
    botaoCarrinho.type = "button";
    botaoCarrinho.setAttribute("title", "Carrinho simulado para fins acadêmicos");
    botaoCarrinho.classList.add("botao");
    botaoCarrinho.classList.add("botao-principal");
    botaoCarrinho.textContent = "Adicionar ao carrinho";

    botaoCarrinho.addEventListener("click", function() {
      adicionarProdutoCarrinhoIndex(produto.id, botaoCarrinho);
    });

    acoes.appendChild(botaoCarrinho);
  } else {
    const indisponivel = document.createElement("span");
    indisponivel.classList.add("botao");
    indisponivel.classList.add("botao-desabilitado");
    indisponivel.textContent = "Indisponível";

    acoes.appendChild(indisponivel);
  }

  card.appendChild(imagemContainer);
  card.appendChild(conteudo);
  card.appendChild(acoes);

  return card;
}

function adicionarItemDestaque(lista, texto) {
  const item = document.createElement("li");
  item.textContent = texto;
  lista.appendChild(item);
}

async function adicionarProdutoCarrinhoIndex(produtoId, botao) {
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
    window.location.href = "pages/carrinho.html";
  } catch (erro) {
    alert("Não foi possível adicionar o produto ao carrinho.");
    console.log(erro);
  } finally {
    botao.disabled = false;
    botao.textContent = "Adicionar ao carrinho";
  }
}

function iniciarPaginaInicial() {
  carregarDadosLoja();
  carregarProdutosDestaque();
}

if (document.getElementById("produtos-destaque")) {
  iniciarPaginaInicial();
}

function obterIdProduto() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id");

  return id;
}

async function carregarDetalhesProduto() {
  const mensagem = document.getElementById("mensagem-detalhes");
  const areaDetalhes = document.getElementById("detalhes-produto");
  const areaComparacao = document.getElementById("comparacao-produtos");
  const id = obterIdProduto();

  if (!mensagem || !areaDetalhes) {
    return;
  }

  areaDetalhes.textContent = "";

  if (areaComparacao) {
    areaComparacao.textContent = "";
  }

  if (!id) {
    mensagem.textContent = "Produto não informado.";
    criarLinkVoltar(areaDetalhes);
    return;
  }

  try {
    mensagem.textContent = "Carregando detalhes do produto...";

    const resposta = await fetch("/api/produtos/" + id);

    if (!resposta.ok) {
      throw new Error("Produto não encontrado");
    }

    const produto = await resposta.json();
    const conteudo = criarDetalhesProduto(produto);

    document.title = produto.nome + " | ReUse Phone";
    mensagem.textContent = "";
    areaDetalhes.appendChild(conteudo);

    carregarComparacaoProdutos();
  } catch (erro) {
    mensagem.textContent = "Não foi possível carregar os detalhes do produto.";
    criarLinkVoltar(areaDetalhes);
    console.log(erro);
  }
}

function criarLinkVoltar(area) {
  const link = document.createElement("a");
  link.href = "produtos.html";
  link.classList.add("botao");
  link.classList.add("botao-contorno");
  link.textContent = "Voltar para produtos";

  area.appendChild(link);
}

function criarDetalhesProduto(produto) {
  const container = document.createElement("div");
  container.classList.add("area-detalhes-produto");

  const artigo = document.createElement("article");
  artigo.classList.add("produto-detalhe");

  const areaImagem = document.createElement("div");
  areaImagem.classList.add("imagem-detalhe");

  const imagem = document.createElement("img");
  imagem.setAttribute("src", produto.imagem);
  imagem.setAttribute("alt", produto.nome + " usado");

  areaImagem.appendChild(imagem);

  const areaInfo = document.createElement("div");
  areaInfo.classList.add("informacoes-detalhe");

  const etiqueta = document.createElement("span");
  etiqueta.classList.add("etiqueta");
  etiqueta.textContent = produto.estado;

  const titulo = document.createElement("h2");
  titulo.textContent = produto.nome;

  const descricao = document.createElement("p");
  descricao.textContent = produto.descricao;

  const preco = document.createElement("strong");
  preco.classList.add("preco");
  preco.classList.add("preco-grande");
  preco.classList.add("preco-detalhe");
  preco.textContent = produto.precoFormatado;

  const lista = document.createElement("dl");
  lista.classList.add("especificacoes");

  adicionarInformacao(lista, "Marca", produto.marca);
  adicionarInformacao(lista, "Modelo", produto.modelo);
  adicionarInformacao(lista, "Estado", produto.estado);
  adicionarInformacao(lista, "Cor", produto.cor);
  adicionarInformacao(lista, "Armazenamento", produto.armazenamento);
  adicionarInformacao(lista, "Bateria", produto.bateria);

  const acoes = document.createElement("div");
  acoes.classList.add("grupo-botoes");
  acoes.classList.add("acoes-produto");

  if (produto.disponivel === true) {
    const botaoCarrinho = document.createElement("button");
    botaoCarrinho.type = "button";
    botaoCarrinho.title = "Carrinho simulado para fins acadêmicos";
    botaoCarrinho.classList.add("botao");
    botaoCarrinho.classList.add("botao-principal");
    botaoCarrinho.textContent = "Adicionar ao carrinho";

    botaoCarrinho.addEventListener("click", function() {
      adicionarProdutoCarrinhoDetalhes(produto.id, botaoCarrinho);
    });

    acoes.appendChild(botaoCarrinho);
  } else {
    const indisponivel = document.createElement("span");
    indisponivel.classList.add("botao");
    indisponivel.classList.add("botao-desabilitado");
    indisponivel.classList.add("botao-indisponivel");
    indisponivel.textContent = "Indisponível";

    acoes.appendChild(indisponivel);
  }

  const botaoVoltar = document.createElement("a");
  botaoVoltar.href = "produtos.html";
  botaoVoltar.classList.add("botao");
  botaoVoltar.classList.add("botao-contorno");
  botaoVoltar.textContent = "Voltar para produtos";

  acoes.appendChild(botaoVoltar);

  areaInfo.appendChild(etiqueta);
  areaInfo.appendChild(titulo);
  areaInfo.appendChild(descricao);
  areaInfo.appendChild(preco);
  areaInfo.appendChild(lista);
  areaInfo.appendChild(acoes);

  artigo.appendChild(areaImagem);
  artigo.appendChild(areaInfo);

  const extras = document.createElement("div");
  extras.classList.add("extras-detalhe");

  extras.appendChild(criarSecaoLista("Acessórios inclusos", produto.acessorios));
  extras.appendChild(criarSecaoLista("Pontos positivos", produto.pontosPositivos));
  extras.appendChild(criarSecaoLista("Observações", produto.observacoes));

  const aviso = document.createElement("section");
  aviso.classList.add("aviso-simulacao");

  const textoAviso = document.createElement("p");
  textoAviso.textContent = "Este site é um projeto acadêmico. As ações de compra e carrinho são apenas simulações visuais.";

  aviso.appendChild(textoAviso);

  container.appendChild(artigo);
  container.appendChild(extras);
  container.appendChild(aviso);

  return container;
}

function adicionarInformacao(lista, termo, descricao) {
  const linha = document.createElement("div");

  const dt = document.createElement("dt");
  dt.textContent = termo;

  const dd = document.createElement("dd");
  dd.textContent = descricao;

  linha.appendChild(dt);
  linha.appendChild(dd);
  lista.appendChild(linha);
}

function criarSecaoLista(titulo, itens) {
  const section = document.createElement("section");
  section.classList.add("cartao-informacao");

  const heading = document.createElement("h2");
  heading.textContent = titulo;

  const lista = document.createElement("ul");
  lista.classList.add("lista-simples");

  itens.forEach(function(item) {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });

  section.appendChild(heading);
  section.appendChild(lista);

  return section;
}

async function carregarComparacaoProdutos() {
  const areaComparacao = document.getElementById("comparacao-produtos");

  if (!areaComparacao) {
    return;
  }

  try {
    const resposta = await fetch("/api/produtos");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar produtos para comparação");
    }

    const produtos = await resposta.json();
    const produtosComparacao = produtos.filter(function(produto) {
      return produto.id === 1 || produto.id === 3 || produto.id === 5;
    });
    const tabela = criarTabelaComparacao(produtosComparacao);

    areaComparacao.textContent = "";
    areaComparacao.appendChild(tabela);
  } catch (erro) {
    console.log(erro);
  }
}

function criarTabelaComparacao(produtos) {
  const section = document.createElement("section");
  section.classList.add("cartao-informacao");
  section.classList.add("cartao-comparacao");

  const titulo = document.createElement("h2");
  titulo.textContent = "Comparação entre produtos";

  const texto = document.createElement("p");
  texto.textContent = "Veja uma comparação simples entre alguns aparelhos disponíveis.";

  const tabelaContainer = document.createElement("div");
  tabelaContainer.classList.add("tabela-responsiva");

  const tabela = document.createElement("table");

  const thead = document.createElement("thead");
  const linhaCabecalho = document.createElement("tr");
  const cabecalhos = ["Produto", "Estado", "Armazenamento", "Bateria", "Preço"];

  cabecalhos.forEach(function(item) {
    const th = document.createElement("th");
    th.textContent = item;
    linhaCabecalho.appendChild(th);
  });

  thead.appendChild(linhaCabecalho);

  const tbody = document.createElement("tbody");

  produtos.forEach(function(produto) {
    const tr = document.createElement("tr");

    adicionarCelula(tr, produto.nome);
    adicionarCelula(tr, produto.estado);
    adicionarCelula(tr, produto.armazenamento);
    adicionarCelula(tr, produto.bateria);
    adicionarCelula(tr, produto.precoFormatado);

    tbody.appendChild(tr);
  });

  tabela.appendChild(thead);
  tabela.appendChild(tbody);
  tabelaContainer.appendChild(tabela);

  section.appendChild(titulo);
  section.appendChild(texto);
  section.appendChild(tabelaContainer);

  return section;
}

function adicionarCelula(linha, texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  linha.appendChild(td);
}

async function adicionarProdutoCarrinhoDetalhes(produtoId, botao) {
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

if (document.getElementById("detalhes-produto")) {
  carregarDetalhesProduto();
}

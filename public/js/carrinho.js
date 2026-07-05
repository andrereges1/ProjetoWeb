async function carregarCarrinho() {
  const mensagemCarrinho = document.getElementById("mensagem-carrinho");
  const areaItens = document.getElementById("itens-carrinho");
  const areaResumo = document.getElementById("resumo-carrinho");
  const areaAviso = document.getElementById("aviso-carrinho");

  if (!mensagemCarrinho || !areaItens || !areaResumo || !areaAviso) {
    return;
  }

  try {
    mensagemCarrinho.textContent = "Carregando carrinho...";
    areaItens.textContent = "";
    areaResumo.textContent = "";
    areaAviso.textContent = "";

    const resposta = await fetch("/api/carrinho");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar carrinho");
    }

    const carrinho = await resposta.json();

    mensagemCarrinho.textContent = "";

    if (!carrinho.itens || carrinho.itens.length === 0) {
      renderizarItensCarrinho(carrinho.itens, areaItens);
      renderizarAvisoCarrinho(carrinho.aviso, areaAviso);
      return;
    }

    renderizarItensCarrinho(carrinho.itens, areaItens);
    renderizarResumoCarrinho(carrinho.resumo, areaResumo);
    renderizarAvisoCarrinho(carrinho.aviso, areaAviso);
  } catch (erro) {
    mensagemCarrinho.textContent = "Não foi possível carregar o carrinho.";
    console.log(erro);
  }
}

function renderizarItensCarrinho(itens, areaItens) {
  const titulo = document.createElement("h2");
  titulo.textContent = "Produtos no carrinho";
  areaItens.appendChild(titulo);

  if (!itens || itens.length === 0) {
    mostrarCarrinhoVazio(areaItens);
    return;
  }

  itens.forEach(function(item) {
    const card = criarItemCarrinho(item);
    areaItens.appendChild(card);
  });
}

function criarItemCarrinho(item) {
  const card = document.createElement("article");
  card.classList.add("item-carrinho");

  const areaImagem = document.createElement("div");
  areaImagem.classList.add("imagem-produto");
  areaImagem.classList.add("imagem-carrinho");

  const imagem = document.createElement("img");
  imagem.src = item.imagem;
  imagem.alt = item.nome + " usado";

  areaImagem.appendChild(imagem);

  const info = document.createElement("div");
  info.classList.add("info-item-carrinho");

  const titulo = document.createElement("h3");
  titulo.textContent = item.nome;

  const marca = document.createElement("p");
  marca.textContent = "Marca: " + item.marca;

  const estado = document.createElement("p");
  estado.textContent = "Estado: " + item.estado;

  const armazenamento = document.createElement("p");
  armazenamento.textContent = "Armazenamento: " + item.armazenamento;

  const quantidade = document.createElement("p");
  quantidade.textContent = "Quantidade: " + item.quantidade;

  const precoUnitario = document.createElement("p");
  precoUnitario.textContent = "Preço unitário: " + item.precoUnitarioFormatado;

  const subtotal = document.createElement("strong");
  subtotal.textContent = "Subtotal: " + item.subtotalItemFormatado;

  const aviso = document.createElement("p");
  aviso.classList.add("texto-simulado");
  aviso.textContent = "Item exibido apenas para simulação visual.";

  const botaoRemover = document.createElement("button");
  botaoRemover.type = "button";
  botaoRemover.classList.add("botao");
  botaoRemover.classList.add("botao-contorno");
  botaoRemover.textContent = "Remover";

  botaoRemover.addEventListener("click", function() {
    removerProdutoCarrinho(item.produtoId, botaoRemover);
  });

  info.appendChild(titulo);
  info.appendChild(marca);
  info.appendChild(estado);
  info.appendChild(armazenamento);
  info.appendChild(quantidade);
  info.appendChild(precoUnitario);
  info.appendChild(subtotal);
  info.appendChild(aviso);
  info.appendChild(botaoRemover);

  card.appendChild(areaImagem);
  card.appendChild(info);

  return card;
}

function renderizarResumoCarrinho(resumo, areaResumo) {
  const titulo = document.createElement("h2");
  titulo.textContent = "Resumo do pedido";

  const subtotal = criarLinhaResumo("Subtotal:", resumo.subtotalFormatado);
  const frete = criarLinhaResumo("Frete:", resumo.freteFormatado);

  const total = document.createElement("p");
  total.classList.add("total-resumo");

  const totalRotulo = document.createElement("span");
  totalRotulo.textContent = "Total:";

  const totalValor = document.createElement("strong");
  totalValor.classList.add("total-carrinho");
  totalValor.textContent = resumo.totalFormatado;

  total.appendChild(totalRotulo);
  total.appendChild(totalValor);

  const acoes = document.createElement("div");
  acoes.classList.add("grupo-botoes");
  acoes.classList.add("acoes-produto");

  const continuar = document.createElement("a");
  continuar.href = "produtos.html";
  continuar.classList.add("botao");
  continuar.classList.add("botao-contorno");
  continuar.textContent = "Continuar comprando";

  const contato = document.createElement("a");
  contato.href = "contato.html";
  contato.classList.add("botao");
  contato.classList.add("botao-principal");
  contato.textContent = "Entrar em contato";

  acoes.appendChild(continuar);
  acoes.appendChild(contato);

  areaResumo.appendChild(titulo);
  areaResumo.appendChild(subtotal);
  areaResumo.appendChild(frete);
  areaResumo.appendChild(total);
  areaResumo.appendChild(acoes);
}

function criarLinhaResumo(rotulo, valor) {
  const linha = document.createElement("p");

  const span = document.createElement("span");
  span.textContent = rotulo;

  const strong = document.createElement("strong");
  strong.textContent = valor;

  linha.appendChild(span);
  linha.appendChild(strong);

  return linha;
}

function mostrarCarrinhoVazio(areaItens) {
  const texto = document.createElement("p");
  texto.textContent = "O carrinho está vazio. Adicione um produto para visualizar o resumo.";

  const link = document.createElement("a");
  link.href = "produtos.html";
  link.classList.add("botao");
  link.classList.add("botao-principal");
  link.textContent = "Ver produtos";

  areaItens.appendChild(texto);
  areaItens.appendChild(link);
}

async function removerProdutoCarrinho(produtoId, botao) {
  try {
    botao.disabled = true;
    botao.textContent = "Removendo...";

    const resposta = await fetch("/api/carrinho/remover/" + produtoId, {
      method: "DELETE"
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      alert(resultado.mensagem || "Erro ao remover produto.");
      return;
    }

    alert(resultado.mensagem || "Produto removido do carrinho.");
    carregarCarrinho();
  } catch (erro) {
    alert("Não foi possível remover o produto do carrinho.");
    console.log(erro);
  } finally {
    botao.disabled = false;
    botao.textContent = "Remover";
  }
}

function renderizarAvisoCarrinho(aviso, areaAviso) {
  const texto = document.createElement("p");
  texto.textContent = aviso || "Este carrinho é apenas uma simulação visual.";

  areaAviso.appendChild(texto);
}

if (document.getElementById("itens-carrinho")) {
  carregarCarrinho();
}

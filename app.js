const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const produtos = require('./data/produtos');
const loja = require('./data/loja');
const carrinhoInicial = require('./data/carrinho');

const PORTA = 3000;
const pastaPublic = path.join(__dirname, 'public');
const pastaPublicResolvida = path.resolve(pastaPublic);
let carrinhoMemoria = {
  itens: carrinhoInicial.itens.map(function(item) {
    return {
      produtoId: item.produtoId,
      quantidade: item.quantidade
    };
  }),
  frete: carrinhoInicial.frete,
  aviso: carrinhoInicial.aviso
};

function obterTipoConteudo(caminhoArquivo) {
  const extensao = path.extname(caminhoArquivo).toLowerCase();

  const tipos = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp'
  };

  return tipos[extensao] || 'application/octet-stream';
}

function enviar404(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Página não encontrada.');
}

function responderJSON(res, statusCode, dados) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(dados, null, 2));
}

function receberCorpoRequisicao(req) {
  return new Promise(function(resolve, reject) {
    let corpo = '';

    req.on('data', function(parte) {
      corpo += parte.toString();

      if (corpo.length > 1000000) {
        reject(new Error('Corpo da requisição muito grande.'));
        req.destroy();
      }
    });

    req.on('end', function() {
      try {
        const dados = corpo ? JSON.parse(corpo) : {};
        resolve(dados);
      } catch (erro) {
        reject(erro);
      }
    });

    req.on('error', function(erro) {
      reject(erro);
    });
  });
}

function validarContatoBackend(dados) {
  if (!dados.nome) {
    return 'O nome é obrigatório.';
  }

  if (!dados.email) {
    return 'O e-mail é obrigatório.';
  }

  if (!dados.email.includes('@')) {
    return 'Informe um e-mail válido.';
  }

  if (!dados.assunto) {
    return 'O assunto é obrigatório.';
  }

  if (!dados.mensagem) {
    return 'A mensagem é obrigatória.';
  }

  return '';
}

function gerarProtocolo() {
  const numero = Math.floor(Math.random() * 90000) + 10000;
  return 'RP-' + numero;
}

function validarLoginBackend(dados) {
  if (!dados.email) {
    return 'O e-mail é obrigatório.';
  }

  if (!dados.email.includes('@')) {
    return 'Informe um e-mail válido.';
  }

  if (!dados.senha) {
    return 'A senha é obrigatória.';
  }

  if (dados.senha.length < 4) {
    return 'A senha deve ter pelo menos 4 caracteres.';
  }

  return '';
}

function gerarUsuarioSimulado(email) {
  const nome = email.split('@')[0];

  return {
    nome: nome,
    email: email,
    tipo: 'Cliente simulado'
  };
}

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function montarCarrinhoSimulado() {
  const itens = carrinhoMemoria.itens.map(function(itemCarrinho) {
    const produto = produtos.find(function(produto) {
      return produto.id === itemCarrinho.produtoId;
    });

    if (!produto) {
      return null;
    }

    const subtotalItem = produto.preco * itemCarrinho.quantidade;

    return {
      produtoId: produto.id,
      nome: produto.nome,
      marca: produto.marca,
      imagem: produto.imagem,
      estado: produto.estado,
      armazenamento: produto.armazenamento,
      quantidade: itemCarrinho.quantidade,
      precoUnitario: produto.preco,
      precoUnitarioFormatado: produto.precoFormatado,
      subtotalItem: subtotalItem,
      subtotalItemFormatado: formatarPreco(subtotalItem)
    };
  }).filter(function(item) {
    return item !== null;
  });

  const subtotal = itens.reduce(function(total, item) {
    return total + item.subtotalItem;
  }, 0);
  const frete = itens.length > 0 ? carrinhoMemoria.frete : 0;
  const total = subtotal + frete;

  return {
    itens: itens,
    resumo: {
      subtotal: subtotal,
      subtotalFormatado: formatarPreco(subtotal),
      frete: frete,
      freteFormatado: formatarPreco(frete),
      total: total,
      totalFormatado: formatarPreco(total)
    },
    aviso: carrinhoMemoria.aviso,
    simulacao: true
  };
}

function adicionarProdutoAoCarrinho(produtoId) {
  const produto = produtos.find(function(item) {
    return item.id === produtoId;
  });

  if (!produto) {
    return {
      erro: true,
      statusCode: 404,
      mensagem: 'Produto não encontrado.'
    };
  }

  if (produto.disponivel !== true) {
    return {
      erro: true,
      statusCode: 400,
      mensagem: 'Produto indisponível para adicionar ao carrinho.'
    };
  }

  const itemExistente = carrinhoMemoria.itens.find(function(item) {
    return item.produtoId === produtoId;
  });

  if (itemExistente) {
    itemExistente.quantidade = itemExistente.quantidade + 1;
  } else {
    carrinhoMemoria.itens.push({
      produtoId: produtoId,
      quantidade: 1
    });
  }

  return {
    erro: false,
    statusCode: 200,
    mensagem: 'Produto adicionado ao carrinho.',
    carrinho: montarCarrinhoSimulado()
  };
}

function removerProdutoDoCarrinho(produtoId) {
  const indice = carrinhoMemoria.itens.findIndex(function(item) {
    return item.produtoId === produtoId;
  });

  if (indice === -1) {
    return {
      erro: true,
      statusCode: 404,
      mensagem: 'Produto não encontrado no carrinho.'
    };
  }

  carrinhoMemoria.itens.splice(indice, 1);

  return {
    erro: false,
    statusCode: 200,
    mensagem: 'Produto removido do carrinho.',
    carrinho: montarCarrinhoSimulado()
  };
}

function servirArquivoEstatico(caminhoUrl, res) {
  const caminhoRelativo = caminhoUrl === '/' ? 'index.html' : caminhoUrl.replace(/^\/+/, '');
  const caminhoArquivo = path.resolve(pastaPublic, caminhoRelativo);

  if (
    caminhoArquivo !== pastaPublicResolvida &&
    !caminhoArquivo.startsWith(pastaPublicResolvida + path.sep)
  ) {
    enviar404(res);
    return;
  }

  fs.stat(caminhoArquivo, (erroStat, stats) => {
    if (erroStat || !stats.isFile()) {
      enviar404(res);
      return;
    }

    fs.readFile(caminhoArquivo, (erroLeitura, conteudo) => {
      if (erroLeitura) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erro interno do servidor.');
        return;
      }

      res.writeHead(200, { 'Content-Type': obterTipoConteudo(caminhoArquivo) });
      res.end(conteudo);
    });
  });
}

const server = http.createServer(async function(req, res) {
  let caminhoUrl;

  try {
    caminhoUrl = decodeURIComponent(url.parse(req.url).pathname);
  } catch (erro) {
    enviar404(res);
    return;
  }

  if (req.method === 'GET' && caminhoUrl === '/api/status') {
    responderJSON(res, 200, {
      status: 'ok',
      mensagem: 'Backend da ReUse Phone funcionando',
      projeto: 'ReUse Phone',
      rotas: [
        'GET /api/status',
        'GET /api/produtos',
        'GET /api/produtos/:id',
        'GET /api/destaques',
        'GET /api/loja',
        'GET /api/carrinho',
        'POST /api/carrinho/adicionar',
        'DELETE /api/carrinho/remover/:id',
        'POST /api/contato',
        'POST /api/login'
      ]
    });
    return;
  }

  if (caminhoUrl === '/api/contato' && req.method === 'POST') {
    try {
      const dadosRecebidos = await receberCorpoRequisicao(req);
      const dados = {
        nome: (dadosRecebidos.nome || '').trim(),
        email: (dadosRecebidos.email || '').trim(),
        assunto: (dadosRecebidos.assunto || '').trim(),
        produto: (dadosRecebidos.produto || '').trim(),
        mensagem: (dadosRecebidos.mensagem || '').trim()
      };
      const erroValidacao = validarContatoBackend(dados);

      if (erroValidacao) {
        responderJSON(res, 400, {
          erro: true,
          mensagem: erroValidacao
        });
        return;
      }

      responderJSON(res, 201, {
        sucesso: true,
        mensagem: 'Mensagem recebida com sucesso. Em breve a ReUse Phone entrará em contato.',
        protocolo: gerarProtocolo(),
        simulacao: true,
        dadosRecebidos: {
          nome: dados.nome,
          email: dados.email,
          assunto: dados.assunto,
          produto: dados.produto || 'Não informado',
          mensagem: dados.mensagem
        }
      });
      return;
    } catch (erro) {
      responderJSON(res, 400, {
        erro: true,
        mensagem: 'JSON inválido ou erro ao processar os dados.'
      });
      return;
    }
  }

  if (caminhoUrl === '/api/contato' && req.method !== 'POST') {
    responderJSON(res, 405, {
      erro: true,
      mensagem: 'Método não permitido. Use POST para enviar mensagens de contato.'
    });
    return;
  }

  if (caminhoUrl === '/api/login' && req.method === 'POST') {
    try {
      const dadosRecebidos = await receberCorpoRequisicao(req);
      const dados = {
        email: (dadosRecebidos.email || '').trim(),
        senha: (dadosRecebidos.senha || '').trim()
      };
      const erroValidacao = validarLoginBackend(dados);

      if (erroValidacao) {
        responderJSON(res, 400, {
          erro: true,
          mensagem: erroValidacao
        });
        return;
      }

      responderJSON(res, 200, {
        sucesso: true,
        mensagem: 'Login simulado realizado com sucesso. Nenhuma sessão real foi criada.',
        usuario: gerarUsuarioSimulado(dados.email),
        simulacao: true
      });
      return;
    } catch (erro) {
      responderJSON(res, 400, {
        erro: true,
        mensagem: 'JSON inválido ou erro ao processar os dados.'
      });
      return;
    }
  }

  if (caminhoUrl === '/api/login' && req.method !== 'POST') {
    responderJSON(res, 405, {
      erro: true,
      mensagem: 'Método não permitido. Use POST para realizar o login simulado.'
    });
    return;
  }

  if (caminhoUrl === '/api/carrinho/adicionar' && req.method === 'POST') {
    try {
      const dados = await receberCorpoRequisicao(req);
      const produtoId = Number(dados.produtoId);

      if (!produtoId) {
        responderJSON(res, 400, {
          erro: true,
          mensagem: 'Informe o ID do produto.'
        });
        return;
      }

      const resultado = adicionarProdutoAoCarrinho(produtoId);

      responderJSON(res, resultado.statusCode, resultado);
      return;
    } catch (erro) {
      responderJSON(res, 400, {
        erro: true,
        mensagem: 'JSON inválido ou erro ao processar os dados.'
      });
      return;
    }
  }

  if (caminhoUrl === '/api/carrinho/adicionar' && req.method !== 'POST') {
    responderJSON(res, 405, {
      erro: true,
      mensagem: 'Método não permitido. Use POST para adicionar produto ao carrinho.'
    });
    return;
  }

  if (caminhoUrl.startsWith('/api/carrinho/remover/') && req.method === 'DELETE') {
    const partes = caminhoUrl.split('/');
    const produtoId = Number(partes[4]);

    if (!produtoId) {
      responderJSON(res, 400, {
        erro: true,
        mensagem: 'ID do produto inválido.'
      });
      return;
    }

    const resultado = removerProdutoDoCarrinho(produtoId);

    responderJSON(res, resultado.statusCode, resultado);
    return;
  }

  if (caminhoUrl.startsWith('/api/carrinho/remover/') && req.method !== 'DELETE') {
    responderJSON(res, 405, {
      erro: true,
      mensagem: 'Método não permitido. Use DELETE para remover produto do carrinho.'
    });
    return;
  }

  if (req.method === 'GET' && caminhoUrl === '/api/produtos') {
    responderJSON(res, 200, produtos);
    return;
  }

  if (req.method === 'GET' && caminhoUrl.startsWith('/api/produtos/')) {
    const partes = caminhoUrl.split('/');
    const id = Number(partes[3]);
    const produto = produtos.find(function(item) {
      return item.id === id;
    });

    if (!produto) {
      responderJSON(res, 404, {
        erro: true,
        mensagem: 'Produto não encontrado.'
      });
      return;
    }

    responderJSON(res, 200, produto);
    return;
  }

  if (req.method === 'GET' && caminhoUrl === '/api/destaques') {
    const destaques = produtos.filter(function(produto) {
      return produto.destaque === true;
    });

    responderJSON(res, 200, destaques);
    return;
  }

  if (req.method === 'GET' && caminhoUrl === '/api/loja') {
    responderJSON(res, 200, loja);
    return;
  }

  if (req.method === 'GET' && caminhoUrl === '/api/carrinho') {
    responderJSON(res, 200, montarCarrinhoSimulado());
    return;
  }

  if (caminhoUrl.startsWith('/api')) {
    responderJSON(res, 404, {
      erro: true,
      mensagem: 'Rota da API não encontrada.'
    });
    return;
  }

  servirArquivoEstatico(caminhoUrl, res);
});

server.listen(PORTA, () => {
  console.log(`Servidor ReUse Phone rodando em http://localhost:${PORTA}`);
});

# ReUse Phone

Projeto acadêmico da disciplina Programação para Internet 1.

## Tema

Loja de venda de celulares usados.

## Objetivo

Integrar o projeto frontend desenvolvido com HTML e CSS a um backend em Node.js.

## Tecnologias usadas

- HTML
- CSS
- JavaScript vanilla
- Node.js

## Estrutura de pastas

```text
reuse-phone/
├── app.js
├── package.json
├── README.md
├── HISTORICO.md
├── docs/
│   ├── ROTAS.md
│   └── APRESENTACAO.md
├── data/
│   ├── produtos.js
│   ├── loja.js
│   ├── carrinho.js
│   └── README.md
└── public/
    ├── index.html
    ├── css/
    │   └── style.css
    ├── imgs/
    ├── js/
    │   ├── index.js
    │   ├── produtos.js
    │   ├── detalhes.js
    │   ├── carrinho.js
    │   ├── contato.js
    │   └── login.js
    └── pages/
        ├── produtos.html
        ├── detalhes.html
        ├── carrinho.html
        ├── contato.html
        └── login.html
```

## Como executar

1. Abrir o terminal na pasta do projeto.
2. Executar:

```bash
npm start
```

3. Acessar no navegador:

```text
http://localhost:3000
```

## Rotas disponíveis nesta etapa

GET /

Retorna a página inicial do site.

GET /api/status

Retorna um JSON informando se o backend está funcionando.

## Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | /api/status | Retorna o status do backend |
| GET | /api/produtos | Retorna todos os produtos cadastrados |
| GET | /api/produtos/:id | Retorna um produto específico pelo ID |
| GET | /api/destaques | Retorna os produtos marcados como destaque |
| GET | /api/loja | Retorna informações simuladas da loja |
| GET | /api/carrinho | Retorna o carrinho atual |
| POST | /api/carrinho/adicionar | Adiciona um produto ao carrinho em memória |
| DELETE | /api/carrinho/remover/:id | Remove um produto do carrinho em memória |
| POST | /api/contato | Recebe mensagem simulada de contato |
| POST | /api/login | Recebe dados de login e retorna uma resposta simulada |

### GET /api/status

Retorna o status do backend.

### GET /api/produtos

Retorna todos os produtos cadastrados.

### GET /api/produtos/:id

Retorna um produto específico de acordo com o ID informado.

Exemplo:

```text
/api/produtos/1
```

### GET /api/destaques

Retorna apenas os produtos marcados como destaque.

### GET /api/loja

Retorna informações simuladas da loja.

### GET /api/carrinho

Retorna os itens de um carrinho simulado, contendo produtos, quantidades, subtotal, frete, total e aviso de simulação.

### POST /api/carrinho/adicionar

Recebe o ID de um produto e adiciona o item ao carrinho mantido em memória no servidor.

Exemplo de corpo enviado:

```json
{
  "produtoId": 1
}
```

### DELETE /api/carrinho/remover/:id

Remove um produto do carrinho em memória.

Exemplo:

```text
/api/carrinho/remover/1
```

### POST /api/contato

Recebe dados do formulário de contato e retorna uma confirmação simulada.

Campos esperados:

- nome;
- email;
- assunto;
- produto;
- mensagem.

Exemplo de resposta:

```json
{
  "sucesso": true,
  "mensagem": "Mensagem recebida com sucesso. Em breve a ReUse Phone entrará em contato.",
  "protocolo": "RP-12345",
  "simulacao": true
}
```

### POST /api/login

Recebe e-mail e senha e retorna uma resposta simulada de login.

Campos esperados:

- email;
- senha.

Exemplo de resposta:

```json
{
  "sucesso": true,
  "mensagem": "Login simulado realizado com sucesso. Nenhuma sessão real foi criada.",
  "usuario": {
    "nome": "cliente",
    "email": "cliente@email.com",
    "tipo": "Cliente simulado"
  },
  "simulacao": true
}
```

## Página inicial dinâmica

A página public/index.html utiliza o arquivo public/js/index.js para buscar informações do backend.

Foram usadas as rotas:

```text
GET /api/loja
GET /api/destaques
```

A rota GET /api/loja fornece nome, slogan, descrição e aviso da loja.

A rota GET /api/destaques fornece os produtos marcados como destaque.

O JavaScript usa fetch e async/await para obter os dados e depois renderiza os elementos na página usando manipulação do DOM.

## Integração da página de produtos

A página public/pages/produtos.html utiliza o arquivo public/js/produtos.js para buscar os dados da rota GET /api/produtos.

O JavaScript usa fetch e async/await para acessar o backend. Depois, os produtos recebidos em JSON são transformados em cards HTML usando manipulação do DOM, com document.createElement, textContent e appendChild.

## Integração da página de detalhes

A página public/pages/detalhes.html recebe o ID do produto pela URL, por exemplo:

```text
/pages/detalhes.html?id=1
```

O arquivo public/js/detalhes.js usa URLSearchParams para obter esse ID e faz uma requisição usando fetch para a rota:

```text
GET /api/produtos/:id
```

Depois, os dados recebidos em JSON são renderizados no HTML usando JavaScript vanilla e manipulação do DOM.

Também foi criada uma tabela comparativa simples usando dados da rota:

```text
GET /api/produtos
```

## Integração da página de carrinho

A página public/pages/carrinho.html usa o arquivo public/js/carrinho.js para buscar os dados da rota:

```text
GET /api/carrinho
```

O backend monta um carrinho simulado com base no estado em memória do servidor e nos dados completos existentes em data/produtos.js.

O frontend recebe os dados em JSON e renderiza os itens, o resumo do pedido e o aviso de simulação usando JavaScript vanilla e manipulação do DOM.

## Carrinho com backend

O carrinho é controlado pelo backend usando dados em memória.

O frontend pode adicionar produtos usando:

```text
POST /api/carrinho/adicionar
```

E remover produtos usando:

```text
DELETE /api/carrinho/remover/:id
```

O carrinho continua sendo uma simulação acadêmica. Os dados não são salvos em banco de dados e podem ser perdidos ao reiniciar o servidor.

## Integração do formulário de contato

A página public/pages/contato.html utiliza o arquivo public/js/contato.js para capturar o envio do formulário.

O JavaScript impede o recarregamento da página, valida os campos e envia os dados para o backend usando fetch com método POST.

A rota usada é:

```text
POST /api/contato
```

O backend recebe os dados, valida campos obrigatórios e retorna uma resposta JSON simulando o recebimento da mensagem.

## Login simulado

A página public/pages/login.html utiliza o arquivo public/js/login.js para capturar o envio do formulário de login.

O JavaScript impede o recarregamento da página, valida e-mail e senha e envia os dados para o backend usando fetch com método POST.

A rota usada é:

```text
POST /api/login
```

O backend recebe os dados, valida campos obrigatórios e retorna uma resposta JSON simulando um login bem-sucedido.

Nenhuma sessão real é criada e nenhum dado é salvo.

## Páginas do frontend

- public/index.html: página inicial dinâmica com dados da loja e produtos em destaque.
- public/pages/produtos.html: vitrine de produtos carregada do backend.
- public/pages/detalhes.html: página dinâmica de detalhes por ID.
- public/pages/carrinho.html: carrinho visual com dados simulados do backend.
- public/pages/contato.html: formulário de contato com POST simulado.
- public/pages/login.html: formulário de login com POST simulado.

## Arquivos JavaScript do frontend

- public/js/index.js: carrega informações da loja e produtos em destaque para renderizar a página inicial.
- public/js/produtos.js: carrega os produtos do backend e renderiza os cards na página de produtos.
- public/js/detalhes.js: carrega um produto pelo ID da URL e renderiza a página dinâmica de detalhes.
- public/js/carrinho.js: carrega o carrinho simulado do backend e renderiza os itens, resumo e aviso.
- public/js/contato.js: captura o formulário de contato e envia os dados ao backend com POST.
- public/js/login.js: captura o formulário de login e envia os dados ao backend com POST simulado.

## Observação

Nesta etapa, o backend ainda está servindo o frontend estático e disponibilizando rotas simuladas em JSON, incluindo envio de contato sem e-mail real, login simulado e carrinho em memória.

Os dados ainda são simulados e ficam armazenados em arquivos dentro da pasta data ou em memória enquanto o servidor está rodando. Não foi utilizado banco de dados nesta etapa.

# Proposta de evolução do projeto ReUse Phone

## Visão geral

A proposta para esta etapa do projeto é transformar a **ReUse Phone** em uma loja virtual mais dinâmica, utilizando um back-end simples em **Node.js**.

Na primeira versão, o site funciona principalmente como uma página estática, onde os produtos, informações, detalhes e páginas estão escritos diretamente no HTML. Nesta nova etapa, a ideia é manter a mesma aparência visual do projeto, mas fazer com que parte dos dados passe a ser fornecida por um servidor local.

Dessa forma, o projeto deixa de ser apenas um site estático e passa a simular melhor o funcionamento de uma aplicação web real, com comunicação entre front-end e back-end.

---

## Objetivo principal

O objetivo principal é criar uma **API local** para a ReUse Phone.

Essa API será responsável por fornecer os dados dos celulares usados, informações da loja, produtos em destaque, dados do carrinho e respostas simuladas para formulários.

O front-end irá buscar essas informações usando JavaScript, por meio de `fetch` e `async/await`, aplicando conceitos trabalhados em sala nas atividades de API e manipulação do DOM.

---

## Tecnologias utilizadas

O projeto pode ser desenvolvido com as seguintes tecnologias:

* HTML
* CSS
* JavaScript puro
* Node.js
* Express
* JSON

A proposta é manter o projeto simples, sem banco de dados e sem frameworks avançados no front-end, para não fugir muito do conteúdo trabalhado durante as aulas.

---

## Estrutura sugerida do projeto

A estrutura do projeto pode ser organizada da seguinte forma:

```txt
reuse-phone-backend/
├── app.js
├── package.json
├── data/
│   └── produtos.js
└── public/
    ├── index.html
    ├── pages/
    │   ├── produtos.html
    │   ├── detalhes.html
    │   ├── carrinho.html
    │   └── contato.html
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── produtos.js
    │   ├── detalhes.js
    │   ├── carrinho.js
    │   └── contato.js
    └── imgs/
```

Nessa estrutura, o arquivo `app.js` será responsável por iniciar o servidor Node.js.

A pasta `data` armazenará os dados simulados dos produtos, como se fosse um pequeno banco de dados local.

A pasta `public` ficará responsável pelos arquivos do front-end, como HTML, CSS, JavaScript e imagens.

---

## Servidor local com Node.js

O projeto será executado por meio de um servidor local criado com Node.js.

Ao iniciar o servidor, o site poderá ser acessado pelo navegador no endereço:

```txt
http://localhost:3000
```

Essa etapa é importante porque o projeto deixa de ser aberto apenas como arquivo HTML no navegador e passa a ser servido por um back-end.

Isso aproxima o funcionamento do projeto de uma aplicação web real, onde o servidor entrega os arquivos do front-end e também disponibiliza dados por meio de rotas.

---

## API de produtos

O back-end terá uma API simples responsável por retornar dados em formato JSON.

As rotas podem ser organizadas da seguinte forma:

| Método | Rota                | Descrição                                      |
| ------ | ------------------- | ---------------------------------------------- |
| GET    | `/api/produtos`     | Retorna todos os celulares cadastrados         |
| GET    | `/api/produtos/:id` | Retorna os dados de um celular específico      |
| GET    | `/api/destaques`    | Retorna os produtos em destaque                |
| GET    | `/api/carrinho`     | Retorna um carrinho simulado                   |
| GET    | `/api/loja`         | Retorna informações da loja                    |
| POST   | `/api/contato`      | Simula o envio de uma mensagem pelo formulário |
| POST   | `/api/login`        | Simula um login simples, sem autenticação real |

Essas rotas seguem a ideia de uma API REST, onde cada endereço representa um recurso do sistema.

Por exemplo, a rota `/api/produtos` representa a lista de produtos da loja, enquanto `/api/produtos/:id` representa um produto específico.

---

## Renderização dinâmica dos produtos

Na página de produtos, a ideia é evitar deixar todos os cards escritos manualmente no HTML.

Em vez disso, a página terá apenas uma área vazia onde os produtos serão inseridos dinamicamente:

```html
<section id="lista-produtos"></section>
```

Depois disso, o JavaScript irá buscar os dados no back-end:

```js
const resposta = await fetch("/api/produtos");
const produtos = await resposta.json();
```

Com os dados recebidos, o JavaScript poderá criar os elementos da página usando o DOM, por exemplo:

* `document.createElement`
* `document.getElementById`
* `appendChild`
* `textContent`
* `setAttribute`

Assim, os produtos exibidos na tela passam a vir da API local, e não mais diretamente do HTML.

Essa parte é uma das mais importantes do projeto, pois mostra a integração entre front-end e back-end.

---

## Página de detalhes dinâmica

Na versão estática, cada produto poderia ter sua própria página de detalhes, como:

```txt
iphone-11.html
galaxy-s20.html
motorola-edge-30.html
```

Na nova versão, a ideia é usar apenas uma página de detalhes dinâmica:

```txt
detalhes.html?id=1
```

O JavaScript irá pegar o ID do produto pela URL e buscar as informações no back-end.

Exemplo:

```txt
GET /api/produtos/1
```

Com isso, a mesma página poderá exibir informações diferentes dependendo do produto selecionado.

A página de detalhes poderá mostrar dados como:

* nome do aparelho;
* imagem;
* preço;
* estado de conservação;
* cor;
* armazenamento;
* saúde da bateria;
* acessórios inclusos;
* pontos positivos;
* observações.

Essa abordagem deixa o projeto mais organizado, evita a criação de várias páginas repetidas e torna o sistema mais próximo de uma loja virtual real.

---

## Carrinho simulado

O projeto também pode ter uma página de carrinho com dados vindos do back-end.

A página `carrinho.html` poderá buscar os dados na rota:

```txt
GET /api/carrinho
```

O back-end pode retornar um carrinho simulado contendo produtos, subtotal, frete e total.

Exemplo de resposta:

```json
{
  "itens": [
    {
      "id": 1,
      "nome": "iPhone 11",
      "preco": 1800
    },
    {
      "id": 2,
      "nome": "Galaxy A52",
      "preco": 1200
    }
  ],
  "subtotal": 3000,
  "frete": 30,
  "total": 3030
}
```

O carrinho não precisa ter pagamento real nem banco de dados. Ele será apenas uma simulação visual, mas já demonstrará a comunicação entre o front-end e o back-end.

---

## Formulário de contato

A página de contato poderá ter um formulário com os seguintes campos:

* nome;
* e-mail;
* assunto;
* produto de interesse;
* mensagem.

Quando o usuário clicar em enviar, o JavaScript enviará os dados para a API usando o método POST:

```txt
POST /api/contato
```

O back-end poderá verificar se os campos foram preenchidos corretamente e retornar uma mensagem de confirmação.

Exemplo de resposta:

```json
{
  "mensagem": "Mensagem recebida com sucesso. Em breve entraremos em contato."
}
```

Essa parte aproveita os conteúdos de formulário, validação e manipulação de elementos com JavaScript.

---

## Login simulado

Também pode ser criada uma rota simples para simular login:

```txt
POST /api/login
```

Essa funcionalidade não precisa ter autenticação real, banco de dados ou criptografia de senha.

O objetivo é apenas demonstrar o envio de dados do front-end para o back-end.

Por exemplo, o usuário informa e-mail e senha, e o servidor retorna uma resposta simulada dizendo se o login foi aceito ou não.

---

## O que o projeto demonstra

Com essa evolução, o projeto passa a demonstrar conhecimentos importantes de desenvolvimento web, como:

* criação de servidor com Node.js;
* organização de arquivos estáticos;
* criação de rotas;
* uso de API REST;
* retorno de dados em JSON;
* consumo de API com `fetch`;
* uso de `async/await`;
* manipulação do DOM;
* renderização dinâmica de produtos;
* envio de dados com POST;
* validação simples de formulário;
* integração entre front-end e back-end.

---

## Conclusão

A ideia principal é transformar a ReUse Phone em uma aplicação web simples, mas mais completa.

O visual do site pode continuar parecido com a primeira versão, porém os dados principais passam a vir do back-end.

Com isso, o projeto deixa de ser apenas estático e passa a funcionar como uma loja virtual dinâmica, usando uma API própria em Node.js.

Essa proposta é adequada para a segunda etapa porque aplica os conteúdos estudados em sala, como API, rotas, JSON, `fetch`, `async/await`, DOM e formulários, sem tornar o projeto complexo demais.

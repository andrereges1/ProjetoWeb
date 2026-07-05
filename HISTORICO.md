# Histórico do Projeto

## Etapa 3 — Integração da página de produtos

- Criado o arquivo public/js/produtos.js.
- Página produtos.html passou a buscar produtos da rota GET /api/produtos.
- Cards de produtos passaram a ser renderizados pelo JavaScript usando DOM.
- Mantido o uso de JavaScript vanilla.
- Nenhuma biblioteca externa foi utilizada.

## Etapa 4 — Página de detalhes dinâmica

- Criada a página public/pages/detalhes.html.
- Criado o arquivo public/js/detalhes.js.
- A página de detalhes passou a buscar dados da rota GET /api/produtos/:id.
- Implementada leitura do ID pela URL usando URLSearchParams.
- Renderizadas informações completas do produto usando DOM.
- Adicionada tabela comparativa simples com dados vindos do backend.
- Mantido o uso de JavaScript vanilla.
- Nenhuma biblioteca externa foi utilizada.

## Etapa 5 — Carrinho simulado vindo do backend

- Criado o arquivo data/carrinho.js.
- Criada a rota GET /api/carrinho.
- O backend passou a montar um carrinho simulado usando os produtos cadastrados.
- Criado o arquivo public/js/carrinho.js.
- A página carrinho.html passou a buscar dados do backend usando fetch e async/await.
- Itens, resumo e aviso do carrinho passaram a ser renderizados pelo DOM.
- Mantido o uso de JavaScript vanilla.
- Nenhum banco de dados foi utilizado.
- Nenhuma biblioteca externa foi utilizada.

## Etapa 6 — Formulário de contato com POST simulado

- Criado o arquivo public/js/contato.js.
- A página contato.html passou a enviar dados para o backend.
- Criada a rota POST /api/contato.
- Implementada leitura do corpo da requisição no Node.js puro.
- Implementada validação simples no frontend e no backend.
- Adicionada resposta JSON com protocolo simulado.
- Mantido o uso de JavaScript vanilla.
- Nenhum banco de dados foi utilizado.
- Nenhuma biblioteca externa foi utilizada.
- O envio de contato é apenas uma simulação acadêmica.

## Etapa 7 — Login simulado com POST

- Criado o arquivo public/js/login.js.
- A página login.html passou a enviar dados para o backend.
- Criada a rota POST /api/login.
- Implementada validação simples no frontend e no backend.
- O backend passou a retornar uma resposta simulada de login.
- Nenhuma sessão real foi criada.
- Nenhum dado foi salvo.
- Mantido o uso de JavaScript vanilla.
- Nenhum banco de dados foi utilizado.
- Nenhuma biblioteca externa foi utilizada.
- O login é apenas uma simulação acadêmica.

## Etapa 8 — Página inicial dinâmica

- Criado o arquivo public/js/index.js.
- A página inicial passou a buscar dados da rota GET /api/loja.
- A página inicial passou a buscar produtos em destaque da rota GET /api/destaques.
- Nome, slogan, descrição e aviso da loja passaram a vir do backend.
- Cards de produtos em destaque passaram a ser renderizados pelo DOM.
- Mantido o uso de JavaScript vanilla.
- Nenhuma biblioteca externa foi utilizada.
- Nenhum banco de dados foi utilizado.

## Etapa 9 — Revisão geral e responsividade

- Revisada a estrutura geral do projeto.
- Testadas as principais rotas da API.
- Testadas as páginas principais do frontend.
- Revisados links internos.
- Revisados caminhos de CSS, JS e imagens.
- Melhorada a responsividade básica do site.
- Revisados avisos de simulação.
- Atualizada a documentação do projeto.
- Mantido o uso de HTML, CSS, JavaScript vanilla e Node.js puro.
- Nenhum banco de dados foi utilizado.
- Nenhuma biblioteca externa foi utilizada.

## Etapa 10 — Carrinho com adicionar e remover pelo backend

- Criada lógica de carrinho em memória no backend.
- Criada rota POST /api/carrinho/adicionar.
- Criada rota DELETE /api/carrinho/remover/:id.
- O botão "Adicionar ao carrinho" passou a enviar o produto para o backend.
- A página carrinho.html passou a permitir remover produtos.
- O carrinho continua sendo uma simulação acadêmica.
- Nenhum banco de dados foi utilizado.
- Nenhum dado é salvo permanentemente.
- Mantido o uso de JavaScript vanilla no frontend.
- Mantido o uso de Node.js puro no backend.

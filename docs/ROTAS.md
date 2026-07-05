# Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | /api/status | Retorna o status do backend |
| GET | /api/produtos | Retorna todos os produtos |
| GET | /api/produtos/:id | Retorna um produto específico |
| GET | /api/destaques | Retorna produtos em destaque |
| GET | /api/loja | Retorna informações simuladas da loja |
| GET | /api/carrinho | Retorna o carrinho atual |
| POST | /api/carrinho/adicionar | Adiciona um produto ao carrinho em memória |
| DELETE | /api/carrinho/remover/:id | Remove um produto do carrinho em memória |
| POST | /api/contato | Recebe mensagem simulada de contato |
| POST | /api/login | Recebe dados de login e retorna uma resposta simulada |

## Observação sobre o carrinho

O carrinho é mantido apenas em memória no servidor. Ao reiniciar o servidor, os itens voltam ao estado inicial definido em data/carrinho.js.

## Como o frontend usa as rotas

- public/js/index.js usa /api/loja e /api/destaques para preencher a página inicial e envia produtos para /api/carrinho/adicionar.
- public/js/produtos.js usa /api/produtos para montar a vitrine de produtos.
- public/js/produtos.js envia produtos para /api/carrinho/adicionar.
- public/js/detalhes.js usa /api/produtos/:id para carregar os detalhes do produto selecionado e envia produtos para /api/carrinho/adicionar.
- public/js/carrinho.js usa /api/carrinho para montar o carrinho simulado e /api/carrinho/remover/:id para remover itens.
- public/js/contato.js envia dados para /api/contato usando POST.
- public/js/login.js envia dados para /api/login usando POST.

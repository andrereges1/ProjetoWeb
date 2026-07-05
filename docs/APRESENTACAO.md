# Apresentação — ReUse Phone

## 1. Problemática

Muitas pessoas desejam comprar smartphones de qualidade, mas não possuem orçamento para aparelhos novos. Ao mesmo tempo, celulares usados em bom estado podem ser reaproveitados.

## 2. Justificativa

O projeto propõe uma loja simulada de celulares usados, permitindo visualizar produtos, consultar detalhes, simular carrinho, enviar contato e realizar login simulado.

## 3. Requisitos

- Exibir produtos.
- Exibir detalhes dos produtos.
- Simular carrinho.
- Simular contato.
- Simular login.
- Integrar frontend com backend.
- Renderizar elementos com dados vindos do backend.
- Usar JS vanilla.

## 4. Solução implementada

O backend em Node.js fornece rotas de API em JSON. O frontend usa fetch e async/await para buscar ou enviar dados. Os elementos são renderizados com manipulação do DOM.

## 5. Rotas principais

| Método | Rota | Descrição |
|---|---|---|
| GET | /api/status | Retorna o status do backend |
| GET | /api/produtos | Retorna todos os produtos |
| GET | /api/produtos/:id | Retorna um produto específico |
| GET | /api/destaques | Retorna produtos em destaque |
| GET | /api/loja | Retorna informações simuladas da loja |
| GET | /api/carrinho | Retorna carrinho simulado |
| POST | /api/contato | Recebe mensagem simulada de contato |
| POST | /api/login | Recebe dados de login e retorna uma resposta simulada |

## 6. Como o frontend obtém os dados

- A página inicial busca informações da loja em /api/loja e produtos em destaque em /api/destaques.
- A página produtos busca todos os produtos em /api/produtos.
- A página detalhes busca um produto pelo ID em /api/produtos/:id.
- A página carrinho busca o carrinho simulado em /api/carrinho.
- A página contato envia dados por POST para /api/contato.
- A página login envia dados por POST para /api/login.

## 7. Conclusão

O projeto demonstra a integração entre frontend e backend de forma simples, usando HTML, CSS, JavaScript vanilla e Node.js, sem banco de dados e sem bibliotecas externas.

# Pasta data

Esta pasta armazena os dados simulados usados pelo backend da ReUse Phone.

Arquivos:

- produtos.js: lista de celulares usados disponíveis na loja.
- loja.js: informações básicas simuladas da loja.
- carrinho.js: representa o estado inicial do carrinho simulado.

Os dados são usados pelas rotas da API no arquivo app.js.

O arquivo carrinho.js não cria um carrinho real. Ele apenas define o estado inicial usado quando o servidor é iniciado.

Durante a execução, o carrinho atual fica em memória no backend. Se o servidor for reiniciado, o carrinho volta ao estado inicial.

Neste projeto acadêmico, os dados ficam em arquivos JavaScript simples, sem uso de banco de dados.

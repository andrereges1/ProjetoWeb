function obterDadosFormulario() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const assunto = document.getElementById("assunto").value.trim();
  const produto = document.getElementById("produto").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  return {
    nome: nome,
    email: email,
    assunto: assunto,
    produto: produto,
    mensagem: mensagem
  };
}

function mostrarRespostaContato(texto, tipo) {
  const resposta = document.getElementById("resposta-contato");

  if (!resposta) {
    return;
  }

  resposta.textContent = texto;
  resposta.classList.remove("mensagem-sucesso");
  resposta.classList.remove("mensagem-erro");
  resposta.classList.remove("mensagem-carregando");

  if (tipo === "sucesso") {
    resposta.classList.add("mensagem-sucesso");
  }

  if (tipo === "erro") {
    resposta.classList.add("mensagem-erro");
  }

  if (tipo === "carregando") {
    resposta.classList.add("mensagem-carregando");
  }
}

function validarFormularioContato(dados) {
  if (!dados.nome) {
    return "Digite seu nome.";
  }

  if (!dados.email) {
    return "Digite seu e-mail.";
  }

  if (!dados.email.includes("@")) {
    return "Digite um e-mail válido.";
  }

  if (!dados.assunto) {
    return "Digite o assunto.";
  }

  if (!dados.mensagem) {
    return "Digite sua mensagem.";
  }

  return "";
}

function marcarCamposInvalidos(dados) {
  const campoNome = document.getElementById("nome");
  const campoEmail = document.getElementById("email");
  const campoAssunto = document.getElementById("assunto");
  const campoMensagem = document.getElementById("mensagem");

  limparErrosCampos();

  if (!dados.nome) {
    campoNome.classList.add("campo-erro");
  }

  if (!dados.email || !dados.email.includes("@")) {
    campoEmail.classList.add("campo-erro");
  }

  if (!dados.assunto) {
    campoAssunto.classList.add("campo-erro");
  }

  if (!dados.mensagem) {
    campoMensagem.classList.add("campo-erro");
  }
}

function limparErrosCampos() {
  const campos = [
    document.getElementById("nome"),
    document.getElementById("email"),
    document.getElementById("assunto"),
    document.getElementById("mensagem")
  ];

  campos.forEach(function(campo) {
    if (campo) {
      campo.classList.remove("campo-erro");
    }
  });
}

async function enviarContato(evento) {
  evento.preventDefault();

  const form = document.getElementById("form-contato");
  const botao = document.getElementById("btn-enviar-contato");
  const dados = obterDadosFormulario();
  const erroValidacao = validarFormularioContato(dados);

  if (erroValidacao) {
    marcarCamposInvalidos(dados);
    mostrarRespostaContato(erroValidacao, "erro");
    return;
  }

  limparErrosCampos();
  mostrarRespostaContato("Enviando mensagem...", "carregando");
  botao.disabled = true;
  botao.textContent = "Enviando...";

  try {
    const resposta = await fetch("/api/contato", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });
    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.mensagem || "Erro ao enviar mensagem.");
    }

    mostrarRespostaContato(resultado.mensagem + " Protocolo: " + resultado.protocolo + ".", "sucesso");
    form.reset();
  } catch (erro) {
    mostrarRespostaContato(erro.message || "Não foi possível enviar a mensagem.", "erro");
    console.log(erro);
  } finally {
    botao.disabled = false;
    botao.textContent = "Enviar mensagem";
  }
}

const formularioContato = document.getElementById("form-contato");

if (formularioContato) {
  formularioContato.addEventListener("submit", enviarContato);
}

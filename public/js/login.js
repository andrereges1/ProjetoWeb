function obterDadosLogin() {
  const email = document.getElementById("email-login").value.trim();
  const senha = document.getElementById("senha-login").value.trim();

  return {
    email: email,
    senha: senha
  };
}

function mostrarRespostaLogin(texto, tipo) {
  const resposta = document.getElementById("resposta-login");

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

function validarLogin(dados) {
  if (!dados.email) {
    return "Digite seu e-mail.";
  }

  if (!dados.email.includes("@")) {
    return "Digite um e-mail válido.";
  }

  if (!dados.senha) {
    return "Digite sua senha.";
  }

  if (dados.senha.length < 4) {
    return "A senha deve ter pelo menos 4 caracteres.";
  }

  return "";
}

function marcarCamposInvalidosLogin(dados) {
  const campoEmail = document.getElementById("email-login");
  const campoSenha = document.getElementById("senha-login");

  limparErrosLogin();

  if (!dados.email || !dados.email.includes("@")) {
    campoEmail.classList.add("campo-erro");
  }

  if (!dados.senha || dados.senha.length < 4) {
    campoSenha.classList.add("campo-erro");
  }
}

function limparErrosLogin() {
  const campoEmail = document.getElementById("email-login");
  const campoSenha = document.getElementById("senha-login");

  if (campoEmail) {
    campoEmail.classList.remove("campo-erro");
  }

  if (campoSenha) {
    campoSenha.classList.remove("campo-erro");
  }
}

async function enviarLogin(evento) {
  evento.preventDefault();

  const form = document.getElementById("form-login");
  const botao = document.getElementById("btn-login");
  const dados = obterDadosLogin();
  const erroValidacao = validarLogin(dados);

  if (erroValidacao) {
    marcarCamposInvalidosLogin(dados);
    mostrarRespostaLogin(erroValidacao, "erro");
    return;
  }

  limparErrosLogin();
  mostrarRespostaLogin("Verificando dados...", "carregando");
  botao.disabled = true;
  botao.textContent = "Entrando...";

  try {
    const resposta = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });
    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.mensagem || "Erro ao realizar login simulado.");
    }

    mostrarRespostaLogin(resultado.mensagem + " Usuário: " + resultado.usuario.email + ".", "sucesso");
    form.reset();
  } catch (erro) {
    mostrarRespostaLogin(erro.message || "Não foi possível realizar o login simulado.", "erro");
    console.log(erro);
  } finally {
    botao.disabled = false;
    botao.textContent = "Entrar";
  }
}

const formularioLogin = document.getElementById("form-login");

if (formularioLogin) {
  formularioLogin.addEventListener("submit", enviarLogin);
}

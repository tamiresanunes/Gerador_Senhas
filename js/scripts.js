// Seleção de Elementos
// Botão para gerar a senha
const generatePasswordButton = document.querySelector("#generate-password");

// Elemento onde a senha gerada será exibida
const generatedPasswordElement = document.querySelector("#generated-password");

// Novas funcionalidades
// Botão para abrir ou fechar o gerador de senhas
const openCloseGeneratorButton = document.querySelector("#open-generate-password");

// Container que contém as opções de geração de senha
const generatePasswordContainer = document.querySelector("#generate-options");

// Campo de entrada para o comprimento da senha
const lengthInput = document.querySelector("#length");

// Checkbox para incluir letras na senha
const lettersInput = document.querySelector("#letters");

// Checkbox para incluir números na senha
const numbersInput = document.querySelector("#numbers");

// Checkbox para incluir símbolos na senha
const symbolsInput = document.querySelector("#symbols");

// Botão para copiar a senha gerada para a área de transferência
const copyPasswordButton = document.querySelector("#copy-password");

// Funções

/**
 * Gera uma letra minúscula aleatória.
 * @returns {string} Letra minúscula aleatória.
 */
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

/**
 * Gera uma letra maiúscula aleatória.
 * @returns {string} Letra maiúscula aleatória.
 */
const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

/**
 * Gera um número aleatório (0-9).
 * @returns {string} Número aleatório em formato de string.
 */
const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

/**
 * Gera um símbolo aleatório a partir de uma lista predefinida.
 * @returns {string} Símbolo aleatório.
 */
const getSymbol = () => {
  const symbols = "(){}[]=<>/,.!@#$%&*+-";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

/**
 * Gera uma senha aleatória com base nas opções selecionadas pelo usuário.
 * A senha pode incluir letras minúsculas, maiúsculas, números e/ou símbolos,
 * dependendo das opções marcadas pelo usuário.
 * 
 * @param {Function} getLetterLowerCase - Função para gerar uma letra minúscula.
 * @param {Function} getLetterUpperCase - Função para gerar uma letra maiúscula.
 * @param {Function} getNumber - Função para gerar um número.
 * @param {Function} getSymbol - Função para gerar um símbolo.
 */
const generatePassword = (
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
) => {
  let password = "";

  // Obtém o comprimento da senha a partir do valor inserido pelo usuário
  const passwordLength = +lengthInput.value;

  // Array para armazenar as funções de geração escolhidas
  const generators = [];

  // Adiciona funções de geração de letras se a opção estiver marcada
  if (lettersInput.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }

  // Adiciona a função de geração de números se a opção estiver marcada
  if (numbersInput.checked) {
    generators.push(getNumber);
  }

  // Adiciona a função de geração de símbolos se a opção estiver marcada
  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  // Verifica se pelo menos uma opção foi marcada; se não, retorna sem gerar senha
  if (generators.length === 0) {
    return;
  }

  // Gera a senha aleatória combinando as funções selecionadas
  for (let i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();
      password += randomValue;
    });
  }

  // Corta a senha para o comprimento desejado, caso necessário
  password = password.slice(0, passwordLength);

  // Exibe a senha gerada no elemento designado
  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
};

// Eventos

// Adiciona evento de clique ao botão de gerar senha, que executa a função de geração de senha
generatePasswordButton.addEventListener("click", () => {
  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
  );
});

// Adiciona evento de clique ao botão de abrir/fechar o gerador, que alterna a visibilidade do container de opções
openCloseGeneratorButton.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

// Adiciona evento de clique ao botão de copiar senha, que copia a senha gerada para a área de transferência
copyPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Obtém a senha gerada do elemento HTML
  const password = generatedPasswordElement.querySelector("h4").innerText;

  // Copia a senha para a área de transferência e exibe uma mensagem de confirmação
  navigator.clipboard.writeText(password).then(() => {
    copyPasswordButton.innerText = "Senha copiada com sucesso!";

    // Reseta o texto do botão após 1 segundo
    setTimeout(() => {
      copyPasswordButton.innerText = "Copiar";
    }, 1000);
  });
});


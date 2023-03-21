const words = [
    "javascript",
    "html",
    "css",
    "python",
    "java",
    "php",
    "ruby",
    "swift",
    "kotlin",
    "csharp"
  ];
  
  let word = words[Math.floor(Math.random() * words.length)];
  let guessedLetters = [];
  let wrongLetters = [];
  let tentativas = 6;

  const wordElement = document.getElementById("word");
  const wrongLettersElement = document.getElementById("wrong-letters");
  const messageElement = document.getElementById("message");
  const letterElement = document.getElementById("letter");
  const submitButton = document.getElementById("submit");
  const restartButton = document.getElementById("restart");
  const tentativasElement = document.getElementById("tentativas");
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  
  //Exibindo palavra
  console.log("Palavra: "+word);
  console.log("Letras certas: "+guessedLetters);
  console.log("Letras erradas: "+wrongLetters);

  function displayWord() {
    wordElement.innerHTML = word
      .split("")
      .map(
        letter =>
          `<span class="letter">${
            guessedLetters.includes(letter) ? letter : "_ "
          }</span>`
      )
      .join("");
  }


  function displayWrongLetters() {
    wrongLettersElement.innerHTML =
      "Letras Erradas: " + wrongLetters.join(", ");
  }
  
  function checkWin() {
    if (word.split("").every(letter => guessedLetters.includes(letter))) {
      messageElement.innerHTML = "Você Ganhou!";
      letterElement.setAttribute("disabled", "disabled");
      submitButton.setAttribute("disabled", "disabled");
    }
  }

  function check(letter) {
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
      messageElement.innerHTML = "Você já tentou essa letra!";
      return;
    }
  
    if (word.includes(letter)) {
      guessedLetters.push(letter);
      displayWord();
      checkWin();
    } else if (letter != "" & letter != " " & containsSpecialChars(letter) == false){
      wrongLetters.push(letter);
      displayWrongLetters();
      tentativas--;      
      if (wrongLetters.length == 6) {
        messageElement.innerHTML = "Você Perdeu!";
        letterElement.setAttribute("disabled", "disabled");
        submitButton.setAttribute("disabled", "disabled");
      }
    } else{
      messageElement.innerHTML = "Caractere inválido!";
    }
  }
  
  function resetGame() {
    tentativas = 6;
    tentativasElement.innerHTML = tentativas;
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongLetters = [];
    displayWord();
    displayWrongLetters();
    messageElement.innerHTML == "";
    letterElement.removeAttribute("disabled");
    submitButton.removeAttribute("disabled");
  }
  
  displayWord();
  displayWrongLetters();
  
  submitButton.addEventListener("click", event => {
    event.preventDefault();
    const letter = letterElement.value.toLowerCase();
    letterElement.value = "";
    check(letter);
    tentativasElement.innerHTML = tentativas;
  });
  
  restartButton.addEventListener("click", event => {
    event.preventDefault();
    resetGame();
  });

  function apagarMsg(){
    messageElement.innerHTML = "";
  }

  document.getElementById("submit", "restart").addEventListener("click", () => {
    document.getElementById("letter").focus();
  });

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;
    return specialChars.test(str);
  }


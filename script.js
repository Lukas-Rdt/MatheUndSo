document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector(".title");
  const taskElement = document.getElementById("task");
  const optionsElement = document.getElementById("options");
  const scoreElement = document.getElementById("score-value");
  const modal = document.getElementById("modal");
  const finalScoreElement = document.getElementById("final-score");
  const playAgainButton = document.getElementById("play-again");

  let score = 0;
  let counter = 10;
  let result;
  let operator;

  const letters = title.textContent.split("");

  title.textContent = "";
  letters.forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.color = getRandomColor(); // Jeder Buchstabe bekommt eine zufällige Startfarbe zugewiesen
    title.appendChild(span);
  });

  function getRandomColor() {
    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function changeColors() {
    const spans = title.querySelectorAll("span");

    spans.forEach((span) => {
      span.style.color = getRandomColor(); // Jeder Buchstabe bekommt eine neue zufällige Farbe zugewiesen
    });
  }

  // Start der Farbänderungen in regelmäßigen Abständen
  setInterval(changeColors, Math.random() * 200 + 500);

  // Math
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateTask() {
    const operators = ["+", "-", "*", "/"];
    operator = operators[getRandomNumber(0, 3)];
    let num1 = getRandomNumber(0, 100);
    let num2 = getRandomNumber(0, 100);

    if (operator === "/") {
      do {
        num2 = getRandomNumber(1, 100);
      } while (num1 % num2 !== 0);
    }

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = Math.round(num1 / num2);
        break;
    }

    taskElement.textContent = `${num1} ${operator} ${num2} = ?`;

    optionsElement.innerHTML = "";
    const correctOption = getRandomNumber(0, 2);
    const correctResult = result;
    const deviation = 10; // Abweichung für falsche Antworten
    for (let i = 0; i < 3; i++) {
      const option = document.createElement("div");
      option.classList.add("option");
      if (i === correctOption) {
        option.textContent = correctResult;
        option.dataset.correct = "true";
      } else {
        let wrongAnswer;
        do {
          wrongAnswer = getRandomNumber(
            correctResult - deviation,
            correctResult + deviation
          );
        } while (wrongAnswer === correctResult || wrongAnswer < 0);
        option.textContent = wrongAnswer;
      }
      option.addEventListener("click", handleOptionClick);
      optionsElement.appendChild(option);
    }
  }

  function handleOptionClick(event) {
    const selectedOption = event.target;
    const isCorrect = selectedOption.dataset.correct === "true";
    if (isCorrect) {
      console.log("selected antwort:" + result);
      console.log("score before:" + score);
      score += getRandomNumber(0, 100);
      console.log("score: " + score);
      scoreElement.textContent = score;
      counter = 10;
      generateTask();
    } else {
      endGame();
    }
  }

  function endGame() {
    finalScoreElement.textContent = score;
    modal.style.display = "flex";
  }

  playAgainButton.addEventListener("click", function () {
    score = 0;
    scoreElement.textContent = score;
    counter = 10;
    generateTask();
    modal.style.display = "none";
  });

  generateTask();

  /*
  setInterval(function () {
    counter--;
    if (counter <= 0) {
      endGame();
    }
  }, 1000);
  */
});

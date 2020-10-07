document.addEventListener("DOMContentLoaded", async () => {

    let nextQuestionBtn = document.getElementById("nextQuestionBtn")
    let previousBtn = document.getElementById("previousBtn")
    let playAgainBtn = document.getElementById("playAgainBtn")

    let userName = "jimmy" // prompt("vad heter du?")
    let control = new Controller(userName)

    let inputQuestionNo = 4 // parseInt(prompt("Hur många frågor vill du ha? minst 5 max 10"));
    let questions = new Questions(inputQuestionNo)

    let data = await questions.fetch() //Här finns hela fetch objektet som en JASON


    // Buttons
    nextQuestionBtn.addEventListener("click", () => {
        if (nextQuestionBtn.innerHTML = "Start quiz") {
            nextQuestionBtn.innerHTML = "Next question"
        }

        if (inputQuestionNo == questions.currentQuestion) {
            control.endGame(inputQuestionNo)
        } else {
            let checkBoxes = document.getElementsByTagName("input")
            let userAnswers = [] //Inehåller dom svar som användaren har kryssat i

            for (let box of checkBoxes) {
                if (box.checked) {
                    userAnswers.push(box.value)
                }
            }
            control.updateScore(questions.returnTrue(data[questions.currentQuestion].correct_answers), userAnswers)
            questions.nextQuestion(data)
        }
    })


    playAgainBtn.addEventListener("click", async () => {
        questions.currentQuestion = 0
        control.userName = "Dino" // prompt("vad heter du?")
        inputQuestionNo = 3 // parseInt(prompt("Hur många frågor vill du ha? minst 5 max 10"));
        questions.numberOfQuestions = inputQuestionNo
        data = await questions.fetch()

        document.getElementById("endContainer").classList.add("hidden")
        document.getElementById("quizContainer").classList.remove("hidden")
        document.getElementById("currentScore").classList.add("hidden")

        currentScore.innerHTML = ""
        questions.nextQuestion(data)
    })
    previousBtn.addEventListener("click", () => {
        questions.previousQuestion(data)
    })
});
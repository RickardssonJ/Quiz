document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("currentScore").classList.add("hidden")

    let submitBtn = document.getElementById("submitBtn")
    let playAgainBtn = document.getElementById("playAgainBtn")

    let userName = "Jimmy" //prompt("vad heter du?")
    let inputQuestionNo = 3 //parseInt(prompt("Hur många frågor vill du ha? minst 5 max 10"));

    let questions = new Questions(inputQuestionNo)
    let data = await questions.fetch() //Här får vi tillbaka hela fetch objektet som en JASON
    questions.nextQuestion(data)

    let control = new Controller(userName)


    submitBtn.addEventListener("click", function () {

        if (inputQuestionNo - 1 == questions.currentQuestion) {
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
            questions.currentQuestion++
            console.log("This is the current question " + questions.currentQuestion)

            questions.nextQuestion(data)
        }

    })
    playAgainBtn.addEventListener("click", async function () {

        questions.currentQuestion = 0
        control.userName = "Dino" //prompt("vad heter du?")
        inputQuestionNo = 5 //parseInt(prompt("Hur många frågor vill du ha? minst 5 max 10"));

        questions.numberOfQuestions = inputQuestionNo
        document.getElementById("endContainer").classList.add("hidden")
        document.getElementById("quizContainer").classList.remove("hidden")
        document.getElementById("currentScore").classList.add("hidden")

        currentScore.innerHTML = ""
        data = await questions.fetch()
        questions.nextQuestion(data)


    })

});
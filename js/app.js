document.addEventListener("DOMContentLoaded", async function () {

    let submitBtn = document.getElementById("submitBtn")
    let playAgainBtn = document.getElementById("playAgainBtn")

    let userName = "Jimmy" //prompt("vad heter du?")
    let inputQuestionNo = 3 //parseInt(prompt("Hur många frågor vill du ha?"));

    let questions = new Questions(inputQuestionNo)
    let data = await questions.fetch() //Här får vi tillbaka hela fetch objektet som en JASON
    questions.nextQuestion(data)

    let control = new Controller(userName)


    submitBtn.addEventListener("click", function () {

        if (inputQuestionNo - 1 == questions.currentQuestion) {
            control.endGame()
        } else {
            let checkBoxes = document.getElementsByTagName("input")

            let userAnswers = []

            for (let box of checkBoxes) {
                if (box.checked) {
                    userAnswers.push(box.value)
                }
            }

            control.updateScore(questions.returnTrue(data[questions.currentQuestion].correct_answers), userAnswers)
            questions.currentQuestion++
            questions.nextQuestion(data)
        }

    })
    playAgainBtn.addEventListener("click", async function () {

        questions.currentQuestion = 0
        control.userName = "Dino" //prompt("vad heter du?")
        inputQuestionNo = 3 //parseInt(prompt("Hur många frågor vill du ha?"));

        document.getElementById("endContainer").classList.add("hidden")
        document.getElementById("quizContainer").classList.remove("hidden")
        data = await questions.fetch()

    })

});
document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("currentScore").classList.add("hidden")

    let submitBtn = document.getElementById("submitBtn")
    let playAgainBtn = document.getElementById("playAgainBtn")
    let previousBtn = document.getElementById("previousBtn")
    previousBtn.classList.add("hidden")
    let userName = "Jimmy" //prompt("vad heter du?")
    let inputQuestionNo = 4 //parseInt(prompt("Hur många frågor vill du ha? minst 5 max 10"));


    let questions = new Questions(inputQuestionNo)


    let data = await questions.fetch() //Här fhela fetch objektet som en JASON
    questions.nextQuestion(data)

    let control = new Controller(userName)


    submitBtn.addEventListener("click", function () {
        
        if (inputQuestionNo == questions.currentQuestion) {
            console.log("I submitt eventet currentQuestion  " + questions.currentQuestion)
            console.log("I submitt eventet inputQuestionNo  " + inputQuestionNo)

            control.endGame(inputQuestionNo)
        } else {
            console.log("I submitt eventet currentQuestion" + questions.currentQuestion)
            console.log("I submitt eventet inputQuestionNo" + inputQuestionNo)
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
        document.getElementById("previousBtn").classList.remove("hidden")
    })
    playAgainBtn.addEventListener("click", async function () {

        questions.currentQuestion = 0
        control.userName = "Dino" //prompt("vad heter du?")
        inputQuestionNo = 5 //parseInt(prompt("Hur många frågor vill du ha? minst 5 max 10"));
        questions.numberOfQuestions = inputQuestionNo
        data = await questions.fetch()

        document.getElementById("endContainer").classList.add("hidden")
        document.getElementById("quizContainer").classList.remove("hidden")
        document.getElementById("currentScore").classList.add("hidden")

        currentScore.innerHTML = ""

        questions.nextQuestion(data)


    })

    previousBtn.addEventListener("click", function () {
        questions.previousQuestion(data)
    })

});
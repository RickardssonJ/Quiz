class Controller {
    constructor(userName) {
        this.score = 0;
        this.userName = userName
    }



    updateScore(apiCorrectAnswers, userAnswers) {

        if (apiCorrectAnswers.toString() === userAnswers.toString()) {
            this.score++
            console.log("rätt")

        } else {
            console.log("fel")
        }
        console.log(this.score)
        console.log(userAnswers)
    }

    endGame(numOfQuestions) {
        let currentScore = document.getElementById("currentScore")

        currentScore.innerHTML = `${this.userName} fick ${this.score} rätt utav ${numOfQuestions} möjliga`

        document.getElementById("endContainer").classList.remove("hidden")
        document.getElementById("quizContainer").classList.add("hidden")
        document.getElementById("currentScore").classList.remove("hidden")

        let currentQuestionDiv = document.getElementById("currentQuestionDiv")
        currentQuestionDiv.innerHTML = ``
        this.score = 0;

    }

}
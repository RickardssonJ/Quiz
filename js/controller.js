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

    endGame() {
        let currentScore = document.getElementById("currentScore")

        currentScore.innerHTML = `${this.userName} fick ${this.score} rätt`

        document.getElementById("endContainer").classList.remove("hidden")
        document.getElementById("quizContainer").classList.add("hidden")

    }

}
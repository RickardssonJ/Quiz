class Controller {
    constructor(userName) {
        this.score = 0;
        this.userName = userName
    }

    player() {

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
        console.log("Spelet är slut")
        currentScore.innerHTML = `${this.userName} fick ${this.score} rätt`

        document.getElementById("endContainer").classList.remove("hidden")
        document.getElementById("quizContainer").classList.add("hidden")

        //StartOver ska starta spelet igen. genom att tabort allt innehåll i startContainer?
    }

}
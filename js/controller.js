class Controller {
    constructor(userName) {
        this.score = 0;
        this.userName = userName;
    }

    updateScore(apiCorrectAnswers, userAnswers) {

        if (userAnswers[0] == null) {
            return
        } else if (apiCorrectAnswers.toString() === userAnswers.toString()) {
            this.score++;
        }
        console.log("API " + apiCorrectAnswers)
        console.log("USER " + userAnswers)
    }

    endGame(numOfQuestions) {
        let currentScore = document.getElementById("currentScore");
        currentScore.innerHTML = `${this.userName} got ${this.score} correct answers, out of ${numOfQuestions} possible`;

        document.getElementById("endContainer").classList.remove("hidden");
        document.getElementById("quizContainer").classList.add("hidden");
        document.getElementById("currentScore").classList.remove("hidden");

        let currentQuestionDiv = document.getElementById("currentQuestionDiv");
        currentQuestionDiv.innerHTML = ``;
        this.score = 0;
    }
}
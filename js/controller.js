class Controller {
    constructor(game) {
        this.userAnswers = {}
        this.game = game; //Objectet Game. Gör att jag kan komma åt alla klasser via Game klassen
        this.totalScore;
    }

    updateScore(userAnswers, apiData) {
      
        let sum = []
        //Här loopar jag igenom alla arryer som finns i unserAnswers, och för varje userAnswer så jämför jag om APIns rätta svar är samma som användarens.
        //i APINs rätta svar tar jag först bort alla svaren som har vädet null eller false med returnTrue(), sen gör jag om svaret till en sträng och trimmar bort _correct för varje svar.
        for (let i = 0; i < Object.keys(userAnswers).length; i++) {
            if (Object.keys(this.returnTrue(apiData[i].correct_answers)).toString().replace(/_correct/g, "") == userAnswers[i].toString()) {
                //this.game.player.score++
                sum.push(2)
            }
        }

        let score = sum.map(value => value / 2)

        this.totalScore = score.reduce((previousValue, currentValue) => {
            return previousValue + currentValue
        }, 0);

    }

    endGame() {


        document.getElementById("nextQuestionBtn").classList.add("hidden")
        document.getElementById("endContainer").classList.remove("hidden");
        document.getElementById("quizContainer").classList.add("hidden");
        document.getElementById("currentScore").classList.remove("hidden");
        document.getElementById("playAgainBtn").classList.remove("hidden");//               this.game.player.score
        document.getElementById("result").innerHTML = `${this.game.player.userName} got ${this.totalScore} right answers out of ${this.game.questions.numberOfQuestions} possible`

    }

    returnTrue(apiAnswerOption) {
        for (let key in apiAnswerOption) {
            if (apiAnswerOption[key] == null || apiAnswerOption[key] == "false") {
                delete apiAnswerOption[key]
            }
        }
        return apiAnswerOption
    }
}
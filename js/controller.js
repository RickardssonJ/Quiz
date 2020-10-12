class Controller {
    constructor(parent) {
        this.userAnswers = {}
        this.parent = parent; //Objectet Game
        this.totalScore;
    }

    updateScore(userAnswers, apiData) {
        //Object.keys(mittObject) för at göra om det till en array
        // /_correct/g tar bort alla instanser av _correct. Man ska skriva utan "" om man använder / /g

        //1 apiData[i].correct_answers)  - Tar alla svar på fråga i (index)
        //2 this.returnTrue(apiData[i].correct_answers))  -  skickar tillbaka alla som är true
        //3 Object.keys(this.returnTrue(apiData[i].correct_answers)) gör om det till en array
        //4 Object.keys(this.returnTrue(apiData[i].correct_answers)).toString() gör om arrayen till en sträng
        //5 (Object.keys(this.returnTrue(apiData[i].correct_answers)).toString().replace(/_correct/g, "") tar bort alla "_correct" i strängen
        console.log(userAnswers)
        console.log(apiData)
        let sum = []

        for (let i = 0; i < Object.keys(userAnswers).length; i++) {
            if (Object.keys(this.returnTrue(apiData[i].correct_answers)).toString().replace(/_correct/g, "") == userAnswers[i].toString()) {
                //this.parent.player.score++
                sum.push(2)
            }
        }

        let score = sum.map(value => value / 2)
        console.log(score)

        this.totalScore = score.reduce((previousValue, currentValue) => {
            return previousValue + currentValue
        }, 0);

        console.log(this.totalScore)

    }

    endGame() {


        document.getElementById("nextQuestionBtn").classList.add("hidden")
        document.getElementById("endContainer").classList.remove("hidden");
        document.getElementById("quizContainer").classList.add("hidden");
        document.getElementById("currentScore").classList.remove("hidden");
        document.getElementById("playAgainBtn").classList.remove("hidden");//               this.parent.player.score
        document.getElementById("result").innerHTML = `${this.parent.player.userName} got ${this.totalScore} right answers out of ${this.parent.questions.numberOfQuestions} possible`

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
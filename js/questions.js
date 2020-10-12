
class Questions {
    constructor() {
        this.data;
        this.numberOfQuestions;
        this.currentQuestion;
    }

    async fetchQuestions() {
        this.numberOfQuestions = parseInt(document.getElementById("numberOfQuestions").value) //Varför här och inte i constructorn?

        let data = await fetch(`https://quizapi.io/api/v1/questions?apiKey=HwKYcBi9saCldePyQrk0E2e1bAEdvTTn0iMPuG1R&difficulty=Easy&limit=${this.numberOfQuestions}`);
        this.data = await data.json();
        console.log(this.data)
    }

    showQuestion() {
        let questionContainer = document.getElementById("questionContainer")
        questionContainer.innerHTML = this.data[this.currentQuestion].question
    }

    showAnswerOptions() {
        let answersContainer = document.getElementById("answersContainer")
        let apiOptions = this.returnTrue(this.data[this.currentQuestion].answers)

        while (answersContainer.firstChild) {
            answersContainer.removeChild(answersContainer.lastChild)
        }

        for (let element in apiOptions) {
            let newSpan = document.createElement("span")
            let newCheckBox = document.createElement("input")
            newCheckBox.type = "checkbox"
            newCheckBox.value = element

            newSpan.textContent = apiOptions[element]

            answersContainer.appendChild(newSpan)
            newSpan.appendChild(newCheckBox)
        }
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



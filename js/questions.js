
class Questions {
    constructor() {
        this.data; //Inehåller hela api objektet som en Jason
        this.numberOfQuestions;
        this.currentQuestion;
    }

    async fetchQuestions() {
        this.numberOfQuestions = parseInt(document.getElementById("numberOfQuestions").value)

        let data = await fetch(`https://quizapi.io/api/v1/questions?apiKey=HwKYcBi9saCldePyQrk0E2e1bAEdvTTn0iMPuG1R&difficulty=Easy&limit=${this.numberOfQuestions}`);
        this.data = await data.json();

    }

    showQuestion() {
        let questionContainer = document.getElementById("questionContainer")
        questionContainer.innerHTML = this.data[this.currentQuestion].question
    }

    showAnswerOptions() {
        let answersContainer = document.getElementById("answersContainer")
        let apiOptions = this.returnTrue(this.data[this.currentQuestion].answers) //Får tillbaka alla frågorna som inehåller true

        //Sålänge som det finns svarsalternativ i answersContainer, så kommer dom att tasbort nästkomande omgång
        while (answersContainer.firstChild) {
            answersContainer.removeChild(answersContainer.lastChild)
        }

        for (let element in apiOptions) {
            let newSpan = document.createElement("span")
            let newCheckBox = document.createElement("input")
            newCheckBox.type = "checkbox"
            newCheckBox.value = element

            newSpan.textContent = apiOptions[element] //Skriver ut frågorna på sidan

            answersContainer.appendChild(newSpan)
            newSpan.appendChild(newCheckBox)
        }
    }

    //Om det finns svarsalternativ med värdet null eller false som kommer dom att tasbort.
    returnTrue(apiAnswerOption) {
        for (let key in apiAnswerOption) {
            if (apiAnswerOption[key] == null || apiAnswerOption[key] == "false") {
                delete apiAnswerOption[key]
            }
        }
        return apiAnswerOption
    }
}



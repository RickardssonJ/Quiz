class Questions {
    constructor(numberOfQuestions) {
        this.numberOfQuestions = numberOfQuestions
        this.currentQuestion = 0;

    }

    async fetch() {
        let data = await fetch(`https://quizapi.io/api/v1/questions?apiKey=HwKYcBi9saCldePyQrk0E2e1bAEdvTTn0iMPuG1R&difficulty=Easy&limit=${this.numberOfQuestions}`)
        return data.json()
    }

    //apiData inehåller nu hela objektet ifrån fetchen
    nextQuestion(apiData) {
        this.showQuestion(apiData[this.currentQuestion].question)
        this.showAnswerOptions(this.trimmed(apiData[this.currentQuestion].answers))

        let currentQuestionDiv = document.getElementById("currentQuestionDiv")
        currentQuestionDiv.innerHTML = `Fråga ${this.currentQuestion +1} utav ${this.numberOfQuestions}`

        this.currentQuestion++
    }

    showQuestion(question) {
        let questionContainer = document.getElementById("questionContainer")
        questionContainer.innerHTML = question
    }

    showAnswerOptions(apiOptions) {

        let answersContainer = document.getElementById("answersContainer")

        //Sålänge som det finns en fråga i answersContainer, så ska den sista (senaste) childen (frågan) tas bort
        while (answersContainer.firstChild) {
            answersContainer.removeChild(answersContainer.lastChild)
        }
        console.log(apiOptions)
        //Den här loopen skapar ett span och en checkbox för varje fråga som är kvar i apiOptions efter den tidigare loopen 
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

    trimmed(inputObject) {
        for (let key in inputObject) {
            if (inputObject[key] == null || inputObject[key] == "false") {
                delete inputObject[key]
            }
        }
        return inputObject
    }

    returnTrue(apiCorrectAnswers) {
        let trimmedCorrectAnswers = Object.keys(this.trimmed(apiCorrectAnswers)).map(function (item) {
            return item.replace("_correct", "");
        });

        return trimmedCorrectAnswers
    }

    previousQuestion(apiData) {
        this.currentQuestion--
        this.showQuestion(apiData[this.currentQuestion - 1].question)
        this.showAnswerOptions(apiData[this.currentQuestion - 1].answers)

        let currentQuestionDiv = document.getElementById("currentQuestionDiv")
        currentQuestionDiv.innerHTML = `Fråga ${this.currentQuestion} utav ${this.numberOfQuestions}`
    }
}
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
        this.showOptions(apiData[this.currentQuestion].answers)
    }

    showQuestion(question) {
        let questionContainer = document.getElementById("questionContainer")
        questionContainer.innerHTML = question
    }

    showOptions(apiOptions) {

        let answersContainer = document.getElementById("answersContainer")

        //Sålänge som det finns en fråga i answersContainer, så ska den sista (senaste) childen (frågan) tas bort
        while (answersContainer.firstChild) {

            answersContainer.removeChild(answersContainer.lastChild)
        }

        //Den här loopen kollar igenom alla svaren som finns i objektet apiOptions ifrån APIn och tar bort alla svaren som inehåller null eller false
        for (let option in apiOptions) {
            // apiOptions inehåller alla svarsalternativ. apiOptions[option] pekar på det första vädret i apiOptions. är det värdet null eller false, så kommer den att tasbort ifrån objektet
            if (apiOptions[option] == null || option == "false") {
                delete apiOptions[option]
            }
        }

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

    returnTrue(apiCorrectAnswers) {

        let trimmedCorrectAnswers = []

        //En loop som plockar ut alla svar som är true och sparar värdet på dom i arryen trimmedCorrectAnswers
        for (let answer in apiCorrectAnswers) {

            if (apiCorrectAnswers[answer] == "true") {
                trimmedCorrectAnswers.push(answer.replace("_correct", "")) //Tarbort "_correct" i slutet av varje svar för att bli samma som userAnswers svar
            }
        }

        return trimmedCorrectAnswers
    }



}
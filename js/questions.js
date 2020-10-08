class Questions {
    constructor(numberOfQuestions) {
        this.numberOfQuestions = numberOfQuestions;
        this.currentQuestion = 0;
        this.num = 1
    }

    async fetch() {
        let data = await fetch(`https://quizapi.io/api/v1/questions?apiKey=HwKYcBi9saCldePyQrk0E2e1bAEdvTTn0iMPuG1R&difficulty=Easy&limit=${this.numberOfQuestions}`);
        return data.json();
    }

    //apiData inehåller nu hela objektet ifrån fetchen
    nextQuestion(apiData) {

        this.showQuestion(apiData[this.currentQuestion].question);
        this.showAnswerOptions(this.trimmed(apiData[this.currentQuestion].answers));

        let currentQuestionDiv = document.getElementById("currentQuestionDiv");
        currentQuestionDiv.innerHTML = `Fråga ${this.num} utav ${this.numberOfQuestions}`;

        if (this.currentQuestion > 0) {
            document.getElementById("previousBtn").classList.remove("hidden");
        }
        this.num++
        this.currentQuestion++;
    }

    showQuestion(question) {
        let questionContainer = document.getElementById("questionContainer");
        questionContainer.innerHTML = question;
    }

    // Går igenom objectet och tar bort dom svars alternativen som har värderna null eller false och skickar tillbaka ett object utan null och false
    trimmed(apiAnswerOption) {
        for (let key in apiAnswerOption) {
            if (apiAnswerOption[key] == null || apiAnswerOption[key] == "false") {
                delete apiAnswerOption[key];
            }
        }
        return apiAnswerOption;
    }

    showAnswerOptions(apiOptions) {
        let answersContainer = document.getElementById("answersContainer");

        //Sålänge som det finns en fråga i answersContainer, så ska den sista (senaste) childen (frågan) tas bort
        while (answersContainer.firstChild) {
            answersContainer.removeChild(answersContainer.lastChild);
        }
        //Den här loopen skapar ett span och en checkbox för varje fråga som är kvar i apiOptions efter trim metoden 
        for (let element in apiOptions) {
            let newSpan = document.createElement("span");
            let newCheckBox = document.createElement("input");
            newCheckBox.type = "checkbox";
            newCheckBox.value = element;

            newSpan.textContent = apiOptions[element];

            answersContainer.appendChild(newSpan);
            newSpan.appendChild(newCheckBox);
        }
    }

    returnTrue(apiCorrectAnswers) {
        //Object.keys kommer att peka på egenskaperna i apiCorrectAnswers. Som kommer färdig "trimmad" ifrån trimmed()
        let trimmedCorrectAnswers = Object.keys(this.trimmed(apiCorrectAnswers)).map((property) => {
            return property.replace("_correct", "");
        });
        console.log("Return true " + trimmedCorrectAnswers)
        return trimmedCorrectAnswers;
    }

    previousQuestion(apiData) {
        this.currentQuestion--;
        this.showQuestion(apiData[this.currentQuestion - 1].question);
        this.showAnswerOptions(apiData[this.currentQuestion - 1].answers);

        let currentQuestionDiv = document.getElementById("currentQuestionDiv");
        currentQuestionDiv.innerHTML = `Fråga ${this.currentQuestion} utav ${this.numberOfQuestions}`;

        if (this.currentQuestion < 2) {
            document.getElementById("previousBtn").classList.add("hidden");
        }
    }
}
class Game {
    constructor() {
        //Allt här i startar automatiskt
        this.player = new Player()
        this.questions = new Questions()
        this.controller = new Controller(this)
        this.eventListeners()
    }

    async start() {

        this.questions.currentQuestion = 0
        await this.questions.fetchQuestions() //Om vi inte väntar på fetchen i questions så kommer rad 15  och nedåt att laddas in utan fetch
        this.player.score = 0
        this.questions.showQuestion()
        this.questions.showAnswerOptions()
        document.getElementById("nextQuestionBtn").classList.remove("hidden")

    }

    eventListeners() {
        let nextBtn = document.getElementById("nextQuestionBtn")
        let startBtn = document.getElementById("startBtn")
        let playAgainBtn = document.getElementById("playAgainBtn")

        startBtn.addEventListener("click", () => {
            document.getElementById("login").classList.add("hidden")
            this.start() // Start hämtar fetchen
            this.currentQuestionDisplay()
            this.player.userName = document.getElementById("inputName").value
        })

        nextBtn.addEventListener("click", () => {
            this.getCheckBoxes()
            this.questions.currentQuestion++
            this.currentQuestionDisplay()

            if ((this.questions.currentQuestion) === (this.questions.numberOfQuestions)) {
                this.controller.updateScore(this.controller.userAnswers, this.questions.data) //Updatescore körs bara på slutet
                this.controller.endGame()
            }
            else {
                this.questions.showQuestion()
                this.questions.showAnswerOptions()
            }
        })

        playAgainBtn.addEventListener("click", () => {
            location.reload()
        })
    }

    currentQuestionDisplay() {
        let displayQuestion = document.getElementById("currentQuestionDiv")
        displayQuestion.innerHTML = `Question ${this.questions.currentQuestion + 1} out of ${this.questions.numberOfQuestions}`
    }

    getCheckBoxes() {
        let checkBoxes = document.getElementById("answersContainer").getElementsByTagName("input")
        //Skapar en ny array för varje fråga
        this.controller.userAnswers[this.questions.currentQuestion] = [] //På plats 0 i första omgången så skapar vi en tom array i objektet

        for (let box of checkBoxes) {
            if (box.checked) {
                this.controller.userAnswers[this.questions.currentQuestion].push(box.value)
            }
        }

    }
}
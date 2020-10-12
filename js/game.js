//Ifrån Game kan jag komma åt alla dom andra klasserna

class Game {
    constructor() {
        //Här skapar jag dom andra objekten för att kunna komma åt alla metoder i dom olika klasserna ifrån Game
        this.player = new Player()
        this.questions = new Questions()
        this.controller = new Controller(this)
        this.eventListeners()
    }

    async start() {
        //Start() sätter igång spelet och ser till att alla värden är nollade
        this.questions.currentQuestion = 0
        await this.questions.fetchQuestions() //Om jag inte väntar på att fetchen ska gå klart i questions först så kommer rad 15  och nedåt att laddas in utan fetch.
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
            this.start()
            this.currentQuestionDisplay()
            this.player.userName = document.getElementById("inputName").value //Skickar användarens namn till player klassen
        })

        nextBtn.addEventListener("click", () => {
            this.getCheckBoxes()
            this.questions.currentQuestion++
            this.currentQuestionDisplay() //Visar vilken fråga man är på

            if ((this.questions.currentQuestion) === (this.questions.numberOfQuestions)) {
                this.controller.updateScore(this.controller.userAnswers, this.questions.data) 
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
                this.controller.userAnswers[this.questions.currentQuestion].push(box.value) //Pushar in värdet ifrån varje checkbox som är checkad till arrayn som skapas tidigare
            }
        }

    }
}
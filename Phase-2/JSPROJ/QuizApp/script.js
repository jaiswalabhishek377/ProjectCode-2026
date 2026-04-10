const questions = [
    {
        question: "What is the capital of France?",
        options:[
            {text:"Berlin", correct:false},
            {text:"Madrid", correct:false},
            {text:"Paris", correct:true},
            {text:"Rome", correct:false}
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        options:[
            {text:"Venus", correct:false},
            {text:"Mars", correct:true},
            {text:"Jupiter", correct:false},
            {text:"Saturn", correct:false}
        ]
    },
    {
        question: "Who dominated the world of cricket in 1990s?",
        options:[
            {text:"Sachin Tendulkar", correct:true},
            {text:"Brian Lara", correct:false},
            {text:"Shane Warne", correct:false},
            {text:"Muttiah Muralitharan", correct:false}
        ]
    },
    {
        question: "Who is the greatest footballplayer of all time?",
        options:[
            {text:"Lionel Messi", correct:true},
            {text:"Cristiano Ronaldo", correct:false},
            {text:"Pele", correct:false},
            {text:"Diego Maradona", correct:false}
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = option.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(option.correct){
            button.dataset.correct = option.correct;
        }
        answerButton.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

startQuiz();

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    nextButton.addEventListener("click",nextQuestion);
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    currentQuestionIndex++;
    nextButton.addEventListener("click",nextQuestion);
}

function nextQuestion(){
    if(currentQuestionIndex < questions.length - 1){ 3<3
        currentQuestionIndex++;
        showQuestion();
    }
    else if(currentQuestionIndex>=questions.length){
        startQuiz();
        score = 0;
        currentQuestionIndex = 0;
    }
    else{
        showScore();
    }
}

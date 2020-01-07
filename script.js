///VARIABLES

const timer = document.getElementById("timer");

const text = document.getElementById("quiz-text");
const quiz = document.getElementById("quiz");
const start = document.getElementById("start");
let question = document.getElementById("question");
let progress = document.getElementById("ongoing");

const choices = document.getElementById("choices");
const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const choiceC = document.getElementById('C');
const choiceD = document.getElementById('D');




let restartBtn = document.getElementById("restart");
const rightA = document.getElementById("right-a");
const wrong = document.getElementById("wrong-a");

let timeLeft = 100;
let score = 0;



//QUESTIONS
const questions = [
    {
        question: "______________?",
        choiceA: "a",
        choiceB: "b",
        choiceC: "c",
        choiceD: "d",
        correct: "d"
    },
    {
        question: "___________________?",
        choiceA: "a",
        choiceB: "b",
        choiceC: "c",
        choiceD: "d",
        correct: "c"
    },
    {
        question: "_______________________?",
        choiceA: "a",
        choiceB: "b",
        choiceC: "c",
        choiceD: "d",
        correct: "b"
    },
    {
        question: "______________________?",
        choiceA: "a",
        choiceB: "b",
        choiceC: "c",
        choiceD: "d",
        correct: "a"
    },
    {
        question: "_______________________?",
        choiceA: "a",
        choiceB: "b",
        choiceC: "c",
        choiceD: "d",
        correct: "c"
    },

];

const lastQuestion = questions.length;
let ongoingQuestion = 0;


let rightAnswer = 0;
let wrongAnswer = 0;





//FUCNTIONS FOR QUESTIONS


function renderQuestion() {
    let q = questions[ongoingQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;

}
//keeping count of amount of questions rendered
function keepCount() {
    if (ongoingQuestion < lastQuestion) {
        renderQuestion();
    } else {
        gameOver();

    }
}



//add points, 5 questions right = 100, 20 points each per question
function isCorrect() {
    rightAnswer++;
    ongoingQuestion++;
    score += 20
}



//deduct time
function isWrong() {
    wrongAnswer++;
    ongoingQuestion++;
    timeLeft -= 10;
}

function checkAnswer(answer) {
    if (answer == questions[ongoingQuestion].correct) {
        isCorrect();
    } else {
        isWrong();
    }
}




// Function - quiz ends
function gameOver() {
    restartBtn.style.display = "block";
    save.style.display = "block";
    quiz.style.display = "none";
    choices.style.display = "none";
    text.style.display = "block";

    text.textContent = `${score} is your total score.`;

    timer.textContent = "Time is up.";
}



//QUIZ FUNCTION
function beginQuiz() {
    let timeInterval = setInterval(function () {
        timer.textContent = `Timer: ${timeLeft}`;
        timeLeft--;
        rightA.textContent = `Correct: ${rightAnswer}`;
        wrong.textContent = `Incorrect: ${wrongAnswer}`;
        start.style.display = "none";
        text.style.display = "none";
        quiz.style.display = "block";
        choices.style.display = "block";
        ongoing.textContent = `Score: ${score}`;
        keepCount();
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
}


//Function to restart quiz, leads back to index
function startOver() {
    window.location.href = "index.html";
}

restartBtn.addEventListener('click', startOver);

start.addEventListener('click', beginQuiz);



//saves scores 

//variables
let scores = document.getElementById("hsBox");
let save = document.getElementById("save");
let hsHeader = document.getElementById("hs-header");
let span = document.getElementsByClassName("close")[0];

save.onclick = function () {
    scores.style.display = "block";
    object.style.display = "block";
    hsHeader.textContent = `You got ${score} total points!`;
    button.style.display = 'none';
}

span.onclick = function () {
    scores.style.display = "none";
    hsBox.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == scores) {
        scores.style.display = "none";
        hsBox.style.display = "none";
    }
}






///hs box

let save2 = document.getElementById("hi-scores");
let hsHeader2 = document.getElementById("hs-header-2");
let hsBox = document.getElementById("hi-score-box");
let lbSpan = document.getElementsByClassName("hs-close")[0];

let form = document.getElementById('hs-form');
let ul = document.querySelector('ul');
let button = document.getElementById('clear-out');
let input = document.getElementById('object');

save2.onclick = function () {
    scores.style.display = "block";
    hsHeader.textContent = "High Scores";
    input.style.display = "none";
    button.style.display = 'block';
}

lbSpan.onclick = function () {
    scores.style.display = "none";
}





// script to be able to save information, save initials, save score

const liMaker = text => {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
}

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))


scores.addEventListener('submit',function(event){
    event.preventDefault();

    itemsArray.push(input.value + ` ${score} points`);
    localStorage.setItem('items', JSON.stringify(itemsArray))
    liMaker(input.value);
    input.value = "";
})

data.forEach(item => {
    liMaker(item)
  })





  button.addEventListener('click', function() {
    localStorage.clear()
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild)
    }
  })
function Quiz(questions) {
    this.questions = questions;
    this.score=0;
    this.questionIndex=0;
}

function Question(text, choices, answer) {
    this.questionText = text;
    this.choices=choices;
    this.answer = answer;
}

Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function(answer){
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function loadQuestions() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        
        let questionTextual = document.getElementById('question');
        questionTextual.innerText = quiz.getQuestionByIndex().questionText;
        
        var choices = quiz.getQuestionByIndex().choices;

        for(var i=1; i<=choices.length; i++) {
            var element = "choice" + i;
            let currentCh = document.getElementById(element);
            currentCh.innerText = choices[i-1];
            handleOpt(i,choices[i-1]);
        }

        showProgress();
    }
}

function handleOpt(i,choice) {
    var btnElement = "btn" + i;
            let currentBtn = document.getElementById(btnElement);
            currentBtn.onclick = function() {
                quiz.checkOptionWithAnswer(choice);
                loadQuestions();
            };
}

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  };
  
  function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + ".And mark percentage is: "+((quiz.score/questions.length)*100)+"%"+"</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
  };


let questions = [
    new Question("Question 1",["opt1","opt2","opt3","opt4"],"opt1"), 
    new Question("Question 2",["opt1","opt2","opt3","opt4"],"opt2"), 
    new Question("Question 3",["opt1","opt2","opt3","opt4"],"opt3"), 
    new Question("Question 4",["opt1","opt2","opt3","opt4"],"opt4"), 
    new Question("Question 5",["opt1","opt2","opt3","opt4"],"opt2"), 

];


let quiz = new Quiz(questions);

loadQuestions();
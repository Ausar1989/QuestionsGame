//the area where the block ui informtion will be
var card = $("#quiz-area");
var countStartNumber = 30;

var questions = [{
  question: "What is the best selling album of all time?",
  answers: ["Thriller", "The White Album", "The Black Album", "The Slim Shady LP"],
  correctAnswer: "Thriller",
  Image: "assets/images/thriller.gif" 
},
{
  question: "What song by Prince includes the lyrics 'you don't have to be rich to be my girl'?",
  answers: ["When Doves Cry", "Kiss", "Purple Rain", "Little Red Corvette"],
  correctAnswer: "Kiss",
  image: "assets/images/prince.gif"  
},
{
  question: "Who is the greatest guitar player ever?",
  answers: ["Stevie Ray Vaughn", "Slash", "Jimi Hendrix", "B.B. King"],
  correctAnswer: "Jimi Hendrix",
  image: "assets/images/jimi.gif"  
},
{
  question: "What is The best Hip Hop album of all time?",
  answers: ["The Eminem Show", "Reasonable Doubt", "To Pimp a Butterfly", "My Beautiful Dark Twisted Fantasy"],
  correctAnswer: "My Beautiful Dark Twisted Fantasy",
  image: "assets/images/mbdtf.gif"
},
{
  question: "Who the first physician in recorded history?",
  answers: ["Imhotep", "Charles Drew", "Dr. Phil", "Ron Paul"],
  correctAnswer: "Imhotep",
  image: "assets/images/imhotep" 
},
{
  question: "Who was the villain in 'The Dark Knight Rises'?",
  answers: ["Joker", "Bane", "Riddler", "DeadShot"],
  correctAnswer: "Bane",
  image: "assets/images/bane.gif"  
},
{
  question: "What does 'x' equal in '5x+4=24'?",
  answers: ["5", "20", "4", "24"],
  correctAnswer: "4",
  image: "assets/images/four.gif" 
},
{
  question: "I'm light as a feather, yet the strongest person can't hold me for five minutes. What am I?",
  answers: ["Air", "Smoke", "Water", "Breath"],
  correctAnswer: "Breath",
  image: "assets/images/breath.gif" 
},
{
  question: "I am always hungry and will die if not fed, but whatever I touch will soon turn red. What am I?",
  answers: ["Fire", "A Match", "Red Light", "Red Paint"],
  correctAnswer: "Fire",
  image: "assets/images/fire.gif"
},
{
  question: "What can fill a room but takes up no space?",
  answers: ["Gas", "Light", "Sound", "Liquid"],
  correctAnswer: "Light",
  image: "assets/images/light.gif"
},
{
  question: "What can be larger than you without weighing anything?",
  answers: ["Cotton", "Air", "A Feather", "A Shadow"],
  correctAnswer: "A Shadow",
  image: "assets/images/shadow.gif" 
},
{
  question: "What is so fragile that saying its name breaks it?",
  answers: ["Silence", "Secret", "A Code Word", "A Mirage"],
  correctAnswer: "Silence",
  image: "assets/images/silence.gif"
}];

var timer;

var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  right: 0,
  wrong: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").text(this.counter);
    if (this.counter === 0) {
      console.log("Time's Up!");
      this.timesUp();
    }
 },

 loadQuestion: function() {
   timer = setInterval(this.countdown.bind(this), 1000);

   card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

   for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
   card.prepend("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i] +
   "'>" + questions[this.currentQuestion].answers[i] + "</button>"); 
   }
 },

 followingQuestion: function() {
   this.currentQuestion++;
   this.counter = window.countStartNumber;
   $("#counter-number").text(this.counter);
   this.loadQuestion.bind(this)();
 },

 timesUp: function() {
   clearInterval(window.timer);
   $("#counter-number").text(this.counter);
   card.html("<h2>Time's Up!</h2>");
   card.append("<h3>The Correct Answer is: " + questions[this.currentQuestion].correctAnswer + "</h3>");
   card.append("<img src='" + questions[this.currentQuestion].image + "'/>");

   if (this.currentQuestion === questions.length - 1) {
     setTimeout(this.results, 3 * 1000);
   }
   else {
     setTimeout(this.followingQuestion, 3 * 1000);
   }
 },

 results: function() {
   clearInterval(window.timer);

   $("#counter-number").text(this.counter);
 
   card.html("<h2>Congratulations! You Completed the Trivia.");
   card.append("<h3>Answered correctly: " + this.right + "</h3>");
   card.append("<h3>Answered incorrectly: " + this.wrong + "</h3>");
   card.append("<h3>Questions Unanswered: " + (this.questions - (this.right + this.wrong)) + "</h3>");
   card.append("<br><button id='start-over'>Start Over?</button>");
 },

 clicked: function(e) {
   clearInterval(window.timer);
   if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
     this.rightAnswer();
   }
   else {
     this.wrongAnswer();
   }
 },

 rightAnswer: function() {
    clearInterval(window.timer);

    this.right++;

    card.append("<h2>You're Correct! &#128522</h2>");
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.followingQuestion.bind(this), 3 * 1000);
    }
 },

 wrongAnswer: function() {
   clearInterval(window.timer);

   card.append("<h2>You Are Wrong! &#128542</h2>");
   card.append("<h3>The Correct Answer is: " + questions[this.currentQuestion].correctAnswer + "</h3>");
   card.append("<img src='" + questions[this.currentQuestion].image + "' />");

   if (this.currentQuestion === questions.length - 1) {
     setTimeout(this.results.bind(this), 3 * 1000);
   }
   else {
     setTimeout(this.followingQuestion.bind(this), 3 * 1000);
   }
 },

 reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.right = 0;
    this.wrong = 0;
    this.loadQuestion();
 }

};

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion.bind(game)();
});

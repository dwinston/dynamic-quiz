var allQuestions = [
  {question: "Where am I?",
   choices: ["here","there","everywhere"],
   correctAnswer: 0},
  {question: "What time is it?",
   choices: ["now","3 o'clock, somewhere","game time"],
   correctAnswer: 0},
  {question: "What am I?",
   choices: ["just a man","this moment","an egg","a shell"],
   correctAnswer: 1}
];

var putQuestion = function (q) {
  $("#question").text(q.question);
  var i, choice;
  for (i=0; i < q.choices.length; i++) {
    choice = $("<li></li>").appendTo("#choices");
    choice.append("<input type=\"radio\" name=\"choice\" value=\"" +
                  i + "\"/>");
    choice.append(q.choices[i]);
  }
};

$(document).ready(function() {
  var qNum = 0;
  var numQuestions = allQuestions.length;
  var score = 0;
  var q = allQuestions[qNum];

  putQuestion(q);

  $("#quiz-element").on("click", "#next", function() {
    var correct = q.correctAnswer === +$("input:checked").val();
    if (correct) { score++; }
    $("#quiz-element").find("li").remove();
    if (qNum === numQuestions - 1) {
      $("#quiz-element").remove();
      $("#score").text("Your score is " + score + "/" + numQuestions);
    } else {
      q = allQuestions[++qNum];
      putQuestion(q);
    }
  });
});

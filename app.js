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

var choices = [];
var numQuestions = allQuestions.length;

var putQuestion = function (q, checked) {
  $("#question").text(q.question);
  var i, choice;
  for (i=0; i < q.choices.length; i++) {
    choice = $("<li></li>").appendTo("#choices");
    choice.append("<input type=\"radio\" name=\"choice\" value=\"" +
                  i + "\"/>");
    choice.append(q.choices[i]);
  }
  if (typeof checked === "number") {
    $("#choices").find("input[value='"+checked+"']").prop("checked", true);
  }
  $("#quiz-element").find("li").fadeIn();
};

var score = function (choices) {
  var score = 0, i;
  for (i=0; i < choices.length; i++) {
    score +=  choices[i] === allQuestions[i].correctAnswer ? 1 : 0;
  }
  return score;
};

$(document).ready(function() {
  var qNum = 0;
  var q = allQuestions[qNum];

  putQuestion(q);

  $("#quiz-element").on("click", "#next", function() {
    var choice = +$("#choices :checked").val();
    var message = $(this).parent().find(".message");
    if (isNaN(choice)) {
      message.text("Please choose an answer before moving on; you can come back.");
      return;

    } else {
      message.text("");
      choices[qNum] = choice;
    }
    $("#quiz-element").find("li").fadeOut().remove();
    if (qNum === numQuestions - 1) {
      $("#quiz-element").remove();
      $("#score").text("Your score is " + score(choices) + "/" + numQuestions);
    } else {
      q = allQuestions[++qNum];
      putQuestion(q, choices[qNum]);
    }
  });

  $("#quiz-element").on("click", "#back", function() {
    if (qNum > 0) {
      $("#quiz-element").find("li").remove();
      q = allQuestions[--qNum];
      putQuestion(q, choices[qNum]);
    }
  });
});

var choices = [];

var loadChoices = function(username) {
  var i = 0;
  var choices = [];
  var choice = parseInt(localStorage.getItem(username+"q"+i));
  while (!isNaN(choice)) {
    choices[i] = choice;
    i++;
    choice = parseInt(localStorage.getItem(username+"q"+i));
  }
  return choices;
};

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

var storeChoice = function(qNum, choice) {
  choices[qNum] = choice;
  username = localStorage.getItem("username");
  if (username) {
    localStorage.setItem(username+"q"+qNum,choice);
  }
};

var allQuestions;
$.getJSON('allQuestions.json', function (data) {
  allQuestions = data;
}).done(function() {

    $(document).ready(function() {
      var qNum = 0;
      var q = allQuestions[qNum];
      var numQuestions = allQuestions.length;

      putQuestion(q);

      $("#quiz-element").on("click", "#next", function() {
        var choice = +$("#choices :checked").val();
        var message = $(this).parent().find(".message");
        if (isNaN(choice)) {
          message.text("Please choose an answer before moving on; you can come back.");
          return;

        } else {
          message.text("");
          storeChoice(qNum, choice);
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

      $("#login").on("click", "#submitLogin", function() {
        var username = $(this).parent().find("#username").val();
        localStorage.setItem("username", username);
        var nickname = $(this).parent().find("#nickname").val();
        if (nickname) { 
          $.cookie("nickname", nickname, {expires: 365});
        }
        $("#welcome").text("Welcome, " + $.cookie("nickname"));
        $(this).parent().remove();
        choices = loadChoices(localStorage.getItem("username"));
        $("#quiz-element").find("li").remove();
        putQuestion(q, choices[qNum]);
      });
    });
  });

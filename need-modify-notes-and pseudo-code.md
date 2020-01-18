0. how many html pages, how many api endpoints?
   home page , sign in sign up page, game page (show / hide), result page, suggestion page

1. n number of questions, do a survey for answsers, save the answers in database rank them by amount of people. (list of answers (easier maybe)/ text)
   (??? how to do autofill - pre-built autofill)
   (surveys api )
   (db - CRUD)

requirements: includes validation & updating the database

2. authentication - user needs to login to play the game
   includes validation & updating the database

   express js authentication?
   firebase authentication?
   validation

3. allow admins to add questions and answers.
   (different user privileges)

4. two teams : computer vs user
   4.1 computer will guess a random id from the answers array.
   4.2 user will insert the answer, and it needs to match one of the answers in the answer array. (THIS NEEDS DISCUSSION)
   4.3 compare the ranking between user input answer and computer randomchoice.(if conditions)
   4.4 keep record of scores, update scores on html and db.
   4.5 repeat until all questions are answered.

5. Need to think what API does?
   api - word completion - auto complete dictionary
   OR
   same information from db  
   OR
   most popular answsers for each questions (agg information across all different players)
   user put suggestions add questions - goto a different tables
   can delete the question also
   user privilege - admin and user
   admin can do the CRUD

6) server needs to be able to direct different routes for apis and htmls

7) password information in .env, to be ignored, how to handle passwords.

8) need to work on a local machine since number 7.

9) how to connect db with server (heroku)?

Game:
Timed,
3 wrong answers- you are done
sum the scores of the correct answers from three rounds.
show score at the end.

!!!!!pseudo code starts here!!!!!

Home page sign in / sign up page
under sign in page, there should be a start game button

game page (show / hide), result page, suggestion page

===============================================================

- GAME page
- setInterval(), clearForm(), displayQuestions(),isUserTyping(), didUserSubmit() should be their own functions.  
  userInputHandling()?
- Timer is for one question
- setInterval() to display the time left for a user.
  if time is 0, then do the big ELSE [line 123] as a function userTimeout()

* Ramdomly choose 10 questions from the database, to form a questionsArray.

* function showQuestion (questionsArray.index)
  {
  if (index >= questionsArray.length){
  display result page (function?)
  }  
   else {
  function displayQuestions and hidden answers
  eventlistener function isusertyping()
  eventlistener function didusersubmit()
  }
  }

- Form for user to insert the answer
- Listen to user input (event listener) // it will trigger every time user inputs something, either modal(a form within the modal) or an empty form (clear form)

- (Autocomplete the insert field, based on matches from a dictionary API, to provide potential words to be filled in, a user a click to autocomplete)

function onSubmit() is when user submit the form (answer)

!!! small if is within big IF () {}

- IF (user fill in the answer within the timeout),
  (display a pop up (modal) for user to submit the answer)
  { 1. chance -1; // may not need 2. compare the answer inserted and the answers in the database / server (which one? - DB), do a loop or forEach.
  (each answer should be an object with a property called score)

* if (answer inserted matched one of the answers in the DB) { 1. Display the answer (flip the hidden), 2. And record the answer.score, score += answer.score 3. Clear the form if it's a form / if it's a modal or pop-up, pop up a new modal 4. Record the user input answer, create a variable array in the html, everytime a correct answer is guessed, that answer will be removed from the array, and if the array is empty, say "congrats, you've guessed all the answers".
  then show the next question.

  }

* else (answer inserted doesn't match any answers in the array) {
  1.display cross sign
  2.score - 5
  3.clear the form if it's a form / if it's a modal or pop-up, pop up a new modal
  (consider a clearForm function to be reused)
  }

} // end IF

- ELSE (user failed to fill in the answer within the time out) {
  1.display cross sign,
  (2.chances -1 // is this even needed? Not really)
  3.switch to the next question
  //?How to handle the timer and switch of question? (Trivia game)

}

After all three questions are answered, display the total score a user got -
either another result page click a button, or hidden result div being shown.
???what action triggers the display of results page???
1.Go by the questionsArray length, count down the length, once it hits 0, display the result page.
Current question's index is >= than the questionsArray.length, then display result page.

Suggestion page should also be a form where user can insert suggested question to the database, or whatever they would like to suggest

[Code For Reference for setInterval:
//
function countDown() {
let startTime = 5;
let interval = setInterval(function(){
startTime--;
if (startTime ===0){
shownextQuestion()
clearInterval(interval);
}
}, 1000);
}
//
]

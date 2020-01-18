// !!!Get data from DB
// !!!Do I pull them directly from DB or from API

// let Questions= require('./models/question.js')
$(document).ready(function () {

    let userName;
    // get user information from user table  !!!K's version
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.username);
        console.log(data.username)
    });

    // get user information from user table  !!!D's version
    // and updates the HTML on the page
    $.get("/api/users").then(function (data) {
        console.log('User Data: ', data);
        userName = data.username;
        $(".member-name").text(userName);
    });

    // get high score from /api/highscore
    $.get("/api/highscores", function (data) {
        console.log("HISCORES", data)
    })

    // Default round scores:
    $(".scoreRound_1").text('0');
    $(".scoreRound_2").text('0');
    $(".scoreRound_3").text('0');
    // Below is the Formatted Data Structure, 
    // Converting the Questions from database to an array of objects, 
    // With each object as the following format
    // let q = {
    //     question: 'domdsfksdflksf',
    //     answers: [{
    //         label: 'Snow White',
    //         value: 20
    //     }, {
    //         label: 'Ariel',
    //         value: 20
    //     }]
    // }
    console.log('file loaded')

    // Function to transfer data from database to local format to be used.
    function helper(dbResponse) {
        const questionFormatted = [];
        dbResponse.forEach(function (res, index) {
            const question = Object.keys(res).filter((f) => f.includes('quest'));
            const answerIds = Array.from(new Set(
                Object.keys(res)
                .filter((f) => !f.includes('quest') && !f.includes('id'))
                .map((m) => m.substring(m.length, m.length - 1))))
            const obj = {
                question: res[question[0]],
                answers: []
            };

            answerIds.forEach((id) => {
                const answerObj = {
                    label: res['answer_' + id].toUpperCase(),
                    score: res['answer_score_' + id]

                };

                obj.answers.push(answerObj)
            })

            questionFormatted.push(obj)

        })
        return questionFormatted;
    }

    // !!! This needs to be modified to use data from the DB
    let questions = [{
            id: 1,
            question: "Who was the first Disney princess?",
            answer_1: "Snow White",
            answer_score_1: 20,
            answer_2: "Ariel",
            answer_score_2: 30,
            answer_3: "Cinderella",
            answer_score_3: 20,
            answer_4: "Belle",
            answer_score_4: 10
        },
        {
            id: 2,
            question: "Who was the second Disney princess?",
            answer_1: "Snow-White",
            answer_score_1: 20,
            answer_2: "Ar-iel",
            answer_score_2: 30,
            answer_3: "Cinde-rella",
            answer_score_3: 20,
            answer_4: "Be-lle",
            answer_score_4: 10
        },
        {
            id: 3,
            question: "Who was the Third Disney princess?",
            answer_1: "Snow White",
            answer_score_1: 20,
            answer_2: "Ariel",
            answer_score_2: 30,
            answer_3: "Cinderella",
            answer_score_3: 20,
            answer_4: "Belle",
            answer_score_4: 10
        },
    ]

    // Convert the db format into new format using helper function
    // These were the dummy questions for testing on this js file.
    console.log(helper(questions))
    let newQuestions = helper(questions);
    // Get the 3 randomquestions data from the questions table.

    // !!! Instead of using api/questions, use api/randomquestions
    $.get("api/questions", function (data) {
        console.log("All questions", data);

        newQuestions = helper(data)

        // after calling data back from the API, display data
        if (currentQuestionIndex === 0) {
            displayQA();
        }
    })


    // global variables
    let question = $('#question');

    // Link the answer html elements to js
    let answer1 = $('.answer1');
    let answer2 = $('.answer2');
    let answer3 = $('.answer3');
    let answer4 = $('.answer4');
    let answer5 = $('.answer5');
    let answer6 = $('.answer6');

    // Link user guess input field with js
    let userGuess = $('#playerAnswer-input');

    // Timer variables
    let timeCount = 50;
    let timer;

    // Guess status
    // let guessCorrect;
    // question index starts from 0
    let currentQuestionIndex = 0;
    let currentQuestion;


    // Define score Array for three rounds.
    let scoreArray = [0, 0, 0];
    // Define total score 
    let totalScore = 0;


    // Count down function
    function countDown() {
        timeCount--;
        //console.log("Count down: ", timeCount)
        $('#boardTimer').text(timeCount);
        if (timeCount === 0) {
            //alert("You've run out of time!")
            timeUp();
            //timeCount = 30;
        }
    };

    // function clicked to see if the button is clicked or not within timeout.



    // Display question, hidden answers and guessed answers
    function displayQA() {

        console.log("displayQA is called");
        // Define variable timer using setInterval, to count down every second.
        timer = setInterval(countDown, 1000);

        // Display question and hidden answers
        question.text(newQuestions[currentQuestionIndex].question);
        console.log("current question: ", newQuestions[currentQuestionIndex]);
        answer1.text('1');
        answer2.text('2');
        answer3.text('3');
        answer4.text('4');
        answer5.text('5');
        answer6.text('6');

        // Button click status
        // let buttonClick = false;




        currentQuestion = newQuestions[currentQuestionIndex];
        console.log("current QQ: ", currentQuestion);


        // !!! Add functions here - if user didn't input anything to the form, show score 0
        // if (buttonClick === false) {
        //     $(".scoreRound_" + (currentQuestionIndex + 1)).text('0');
        // } else {

    }

    $('#add-playerAnswer').on('click', function (event) {
        // prevent page refresh
        event.preventDefault();
        console.log("submit is triggered");





        // If user filled in an answer
        // let guessCorrect = false;
        if (userGuess.val().trim() !== '') {

            let guessCorrect = false;
            let tempAnswers = [...currentQuestion.answers]
            console.log("tempAnswers: ", tempAnswers);


            // Loop through the answers in newQuestions[currentQuestionIndex].answers[i], 
            // Compare the answer to userGuess, then display the correct answer to the correct html element
            // Add the score when each answer is put in.
            for (let i = 0; i < tempAnswers.length; i++) {
                if ((userGuess.val().trim().toUpperCase()) === tempAnswers[i].label) {
                    console.log("You guess right");
                    console.log("Hi :", tempAnswers[i].score);
                    scoreArray[currentQuestionIndex] += tempAnswers[i].score;
                    console.log("Score current Round: ", scoreArray[currentQuestionIndex]);

                    guessCorrect = true;
                    // Display the score beside the answer
                    // Display the correct Answer
                    console.log('Correct Answer', tempAnswers[i].label);
                    //console.log(i);

                    //$('.front').hide();
                    //$('.back').show();
                    $('.answer' + (i + 1)).text(tempAnswers[i].label);
                    //$('.answer_score_' + (i + 1)).text(tempAnswers[i].score);
                    tempAnswers[i].score = 0;
                    //guessCorrect = false;
                    return tempAnswers;
                }

            }
            // !!! This function doesn't quite work, It triggers multiple times
            // if user input doesn't match any of the answer, say wrong answer

            if (guessCorrect === false) {
                alert("Wrong answer!");
                console.log("Wrong answer");
            }

            // Write scoreRound_n to HTML
            // console.log("Current Question Number: ", currentQuestionIndex + 1);
            // $(".scoreRound_" + (currentQuestionIndex + 1)).text(scoreArray[currentQuestionIndex]);

            // !!!Also needs to write into API with userName and userScore!
        }
        // If user guess all answers correct, hit timeup()
        else {
            alert("Please insert an answer!");
        }
    })



    // if (currentQuestionIndex === 0) {
    //     displayQA();
    // }

    // clear timer 
    function clearTimer() {
        clearInterval(timer);
    }

    // Need to add a bunch of if else to handle round score, result page, wrong answers here.
    function timeUp() {
        console.log("timeup is called")
        console.log("inside timeup");

        // display round answers and round score
        displayRoundAnswers();
        displayRoundScore();
        displayResults();

        // call logicInTimeout after 5 seconds;
        setTimeout(logicInTimeout, 5000);
    }

    function logicInTimeout() {

        clearInterval(timer);
        $('#boardTimer').text(timeCount);

        // if the button is not clicked, user's roundScore is 0
        if (document.getElementById('add-playerAnswer').clicked == false) {
            // scoreArray[currentQuestionIndex] += 0; 
            // console.log("roundScore", scoreArray[currentQuestionIndex]);
            $(".scoreRound_" + (currentQuestionIndex + 1)).text('0');
        } else {
            // Next Question or Display Results for a certain time
            if (currentQuestionIndex === (newQuestions.length - 1)) {
                // if user didn't click the button, roundScore+0;

                // show whole result page 
                //displayResults();
                console.log("Here's your total score!", totalScore)

            } else {
                // !!!show all answers and current score for a certain time!!!

                // function roundResult? If in same page then this is not needed.

                // display next qusetion
                displayNextQA();

            }
        }
    }

    function displayNextQA() {
        console.log("displayNextQA is called")
        timeCount = 50;
        $('#boardTimer').text(timeCount);
        currentQuestionIndex++;
        console.log("Current Question Number: ", currentQuestionIndex + 1)
        // Not sure if it should be here.

        // let tempAnswers = [...currentQuestion.answers]

        //console.log("question Number+1:", currentQuestionIndex);
        guessCorrect = false;
        displayQA();
    }

    // display round answers
    // added on 16
    function displayRoundAnswers() {
        console.log("Display Round Answers");
        clearTimer();
        for (let j = 0; j < (newQuestions[currentQuestionIndex].answers.length); j++)
            $('.answer' + (j + 1)).text(newQuestions[currentQuestionIndex].answers[j].label);
    }


    function displayRoundScore() {
        // Write scoreRound_n to HTML
        //console.log("Current Question Number: ", currentQuestionIndex + 1);
        $(".scoreRound_" + (currentQuestionIndex + 1)).text(scoreArray[currentQuestionIndex]);
    }
    // display all scores
    function displayResults() {

        //console.log('displayResults is called')

        // // Write scoreRound_n to HTML
        // //console.log("Current Question Number: ", currentQuestionIndex + 1);
        // $(".scoreRound_" + (currentQuestionIndex + 1)).text(scoreArray[currentQuestionIndex]);

        console.log('SCORE ARRAY:', scoreArray);
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        // [1, 2, 3, 4].reduce(reducer) => 10
        totalScore = scoreArray.reduce(reducer);
        console.log('NEW SCORE ARRAY', totalScore)
        // scoreArray.forEach(function (roundScore) {
        //     totalScore += parseInt(roundScore);
        //     //return totalScore;
        // })

        console.log('totalScore: ', totalScore);

        // Use setTimeout()?
        // Display totalScore to html
        $('.totalScore').text(parseInt(totalScore));

        // !!!! Need to post user score to the api.
        // $post("/api/user_data", {
        //     score: totalScore
        // });


    }


})

// Button disable or Enable
function buttonAction() {
    //console.log("button action loaded");
    document.getElementById("add-playerAnswer").disabled = false;
    if ($('#playerAnswer-input').val().trim() === '') { //TODO reconsider comparison
        document.getElementById("add-playerAnswer").disabled = true;
    } else {
        document.getElementById("add-playerAnswer").disabled = false;
    }
}


// test answer flip
// toggles is-flipped class to display the back of cards
let displayCard = function () {
    this.classList.toggle('is-flipped');
}
// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];
// for loop to add event listeners to each card
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", displayCard);
};
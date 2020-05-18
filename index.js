'use strict';

const questionSet = [
  { 
    number: 1,
    text: 'What is one of the Cs to consider when selecting a ring?',
    ans: [
      'Care',
	    'Comparison',
	    'Color',
	    'Confidence'],
  }, 

  {
    number: 2,
    text: 'What is another name for a cushion cut?',
    ans: [
      'Pear', 
      'Square', 
      'Oval', 
      'Old mine cut'],
  }, 

  {
    number: 3,
    text: 'What is a round setting called?',
    ans: [
      'Halo', 
      'Bezel', 
      'Prong', 
      'Solitaire'],
  }, 
  {
    number: 4, 
    text: 'What type of metal is the pink tinted one called?',
    	ans: [
        'Platinum',
	      'Rose Gold',
	      'Gold',
	      'Sterling Silver'],
  }, 
  {
    number: 5,
    text: 'How do you know if your diamond is well cut?',
    ans: [
      'Larger in size', 
      'It reflects more light', 
      'Dull', 
      'Smaller in size'],
  }
];

const ANSWERS = [ 
  'Color', 
  'Old mine cut', 
  'Halo', 
  'Rose Gold', 
  'It reflects more light', 
];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    
    
    <form class="template" role="form">
      <fieldset>
      <legend id="question-page">
        <h2 id="question">${question.text}</h2>
      </legend>
        <label class="answerChoice">
          <input class="answer" type="radio" name="option" checked required></input>
          <span>${question.ans[0]}</span>
        </label>
  
        <label class="answerChoice">
          <input class="answer" type="radio" name="option" required></input>
          <span>${question.ans[1]}</span>
        </label>
  
        <label class="answerChoice">
          <input class="answer" type="radio" name="option" required></input>
          <span>${question.ans[2]}</span>
        </label>
  
        <label class="answerChoice">
          <input class="answer" type="radio" name="option" required></input>
          <span>${question.ans[3]}</span>
        </label>
      </fieldset>  
      <button type "submit" id="js-submit-button">Submit</button>
    </form>
    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/5</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {

    if(questionNum === 5) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2>You are Correct!</h2>
    <button type="button" id="js-next-button">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Wrong! It was ${ANSWERS[questionNum - 1]}!</h2>
      <button id="js-next-button">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('#container').html(`
    <section id="final-page" role="main">
      <h2>Final Score: ${correctAnswers} out of 5</h2>
      <button type="button" id="js-restart-button">Try Again?</button>
    </section>
  `);
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();

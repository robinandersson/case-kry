import React, { useState } from 'react';
import CheckerForm from './components/CheckerForm';
import questionnaire from './assets/data/heartburn.json';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(
    questionnaire.questions[0]
  );
  const [currentOutcome, setCurrentOutcome] = useState();
  const [currentAnswer, setCurrentAnswer] = useState();
  const [currentScore, setCurrentScore] = useState(0);

  const onAnswerChange = evt => {
    // TODO: look into why the SyntheticEvent's properties are nullified
    // need to store value to avoid having to persist the SyntheticEvent
    const newAnswerId = evt.target.value;
    setCurrentAnswer(() =>
      currentQuestion.answers.find(
        answerOption => answerOption.id === newAnswerId
      )
    );
  };

  const onAnswerSubmit = evt => {
    evt.preventDefault();

    const { id, score } = currentAnswer;
    setCurrentScore(currentScore + score);

    // determine the appropriate next action ('next_question', or 'outcome')
    // and set state accordingly
    for (let answer of currentQuestion.next) {
      const { next_question, answered, max_score, outcome } = answer;

      const actionType = answer.hasOwnProperty('next_question')
        ? 'next_question'
        : 'outcome';

      switch (actionType) {
        case 'next_question':
          if (!answer.hasOwnProperty('answered') || answered === id) {
            setCurrentQuestion(() =>
              questionnaire.questions.find(
                answerOption => answerOption.id === next_question
              )
            );
          }
          break;
        case 'outcome':
          if (
            !answer.hasOwnProperty('max_score') ||
            currentScore <= max_score
          ) {
            setCurrentOutcome(() =>
              questionnaire.outcomes.find(
                outcomeOption => outcomeOption.id === outcome
              )
            );
          }
          break;
        default:
          // Should never happen
          // TODO: some nifty error handling goes here
          return {};
      }
    }
  };

  const onBookingSubmit = evt => {
    evt.preventDefault();
    // Book a meeting
    console.log('Booking initialized');
  };

  const formContent = currentOutcome
    ? { ...currentOutcome, type: 'outcome' }
    : { ...currentQuestion, type: 'question' };

  return (
    <main
      role="main"
      className="h-auto min-h-full overflow-auto flex flex-col justify-center"
    >
      <CheckerForm
        formTitle="Heartburn Checker"
        formContent={formContent}
        onAnswerChange={onAnswerChange}
        onAnswerSubmit={onAnswerSubmit}
        onBookingSubmit={onBookingSubmit}
      />
    </main>
  );
}

export default App;

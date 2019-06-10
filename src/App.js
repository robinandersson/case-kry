import React, { useState, useRef, useEffect } from 'react';
import CheckerForm from './components/CheckerForm';
import questionnaire from './assets/data/heartburn.json';

import { jsonIdToReadableString } from './utils/strings';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(
    questionnaire.questions[0]
  );
  const [currentOutcome, setCurrentOutcome] = useState();
  const [currentScore, setCurrentScore] = useState(0);

  const history = useRef([]);

  const formTitle = useRef('Heartburn Checker');

  // TODO: refactor out this as a custom hook
  useEffect(() => {
    const subTitle = (() => {
      if (currentOutcome) {
        return jsonIdToReadableString(currentOutcome.id);
      }
      if (currentQuestion) {
        return `${currentQuestion.question_text}`;
      }
    })();

    document.title = subTitle
      ? `${formTitle.current} – ${subTitle}`
      : formTitle.current;
  }, [currentQuestion, currentOutcome]);

  //TODO: refactor this bad boy ;)
  const onAnswerSubmit = newAnswerId => {
    const { id, score } = currentQuestion.answers.find(
      answerOption => answerOption.id === newAnswerId
    );

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
            setCurrentQuestion(prevQuestion => {
              history.current.push(prevQuestion);
              return questionnaire.questions.find(
                answerOption => answerOption.id === next_question
              );
            });
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
            return;
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

  const handleFormReset = evt => {
    setCurrentQuestion(questionnaire.questions[0]);
    setCurrentOutcome();
    setCurrentScore();
  };

  const handleBackClick = evt => {
    setCurrentQuestion(history.current.pop());
  };

  const formContent = currentOutcome
    ? { ...currentOutcome, type: 'outcome' }
    : { ...currentQuestion, type: 'question' };

  return (
    <main
      role="main"
      className="h-auto min-h-full overflow-auto flex flex-col justify-center p-4"
    >
      <CheckerForm
        formTitle={formTitle.current}
        formContent={formContent}
        onAnswerSubmit={onAnswerSubmit}
        onBookingSubmit={onBookingSubmit}
        onFormReset={handleFormReset}
        onBackClick={handleBackClick}
        historyIsAvailable={history.current.length}
      />
    </main>
  );
}

export default App;

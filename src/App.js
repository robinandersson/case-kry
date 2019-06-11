import React, { useState, useRef, useEffect } from 'react';
import CheckerForm from './components/CheckerForm';
import questionnaire from './assets/data/heartburn.json';

import { firstLetterToUpperCase, snakeCaseToSentence } from './utils/strings';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(
    questionnaire.questions[0]
  );
  const [currentOutcome, setCurrentOutcome] = useState();

  const currentScore = useRef(0);
  const history = useRef([]);
  const formTitle = useRef('Heartburn Checker');

  // TODO: refactor out this as a custom hook
  // set document title when question/outcome changes
  useEffect(() => {
    const subTitle = (() => {
      if (currentOutcome) {
        const sentence = snakeCaseToSentence(currentOutcome.id);
        return firstLetterToUpperCase(sentence);
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
  const onAnswerSubmit = answerId => {
    const { id, score } = currentQuestion.answers.find(
      answerOption => answerOption.id === answerId
    );

    currentScore.current += score;

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
            return;
          }
          break;

        case 'outcome':
          if (
            !answer.hasOwnProperty('max_score') ||
            currentScore.current <= max_score
          ) {
            setCurrentOutcome(
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
    history.current.length = 0;
    currentScore.current = 0;
    setCurrentQuestion(questionnaire.questions[0]);
    setCurrentOutcome();
  };

  const handleBackClick = evt => {
    setCurrentQuestion(history.current.pop());
    currentOutcome && setCurrentOutcome();
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
        historyIsAvailable={!!history.current.length}
      />
    </main>
  );
}

export default App;

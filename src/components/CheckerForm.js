import React, { useState } from 'react';

import MultiPageForm from './MultiPageForm';

const CheckerForm = props => {
  const {
    formTitle,
    formContent,
    onAnswerSubmit,
    onBookingSubmit,
    onFormReset,
    onBackClick,
    historyIsAvailable,
  } = props;

  const [currentAnswer, setCurrentAnswer] = useState();

  const handleAnswerChange = evt => setCurrentAnswer(evt.target.value);

  const handleAnswerSubmit = evt => {
    evt.preventDefault();
    setCurrentAnswer();
    onAnswerSubmit(currentAnswer);
  };

  const handleReset = evt => {
    setCurrentAnswer();
    onFormReset();
  };

  // determine what to show in the form 'body'
  // TODO: break out to components from the elements below
  const content = (() => {
    switch (formContent.type) {
      case 'outcome':
        const { text, show_booking_button } = formContent;
        return (
          <>
            <fieldset className="flex flex-col my-20">
              <legend className="text-2xl font-black pb-4">
                Thank you for answering the questions!
              </legend>
              <p>{text}</p>
              {show_booking_button && (
                <button className="btn" type="submit">
                  Book a meeting
                </button>
              )}
            </fieldset>
            <div className="flex justify-center">
              <button
                className="text-button"
                onClick={handleReset}
                type="button"
              >
                Back to the start screen
              </button>
            </div>
          </>
        );

      case 'question':
        const { id, question_text, answers } = formContent;
        return (
          <fieldset className="flex flex-col my-20">
            <legend className="text-2xl font-black pb-4">
              {question_text}
            </legend>
            <div className="flex">
              {answers.map(answer => (
                <label key={answer.id} className="flex-1">
                  {answer.label}
                  <input
                    type="radio"
                    name={id}
                    value={answer.id}
                    onChange={handleAnswerChange}
                  />
                </label>
              ))}
            </div>
          </fieldset>
        );
      default:
        // default should never occur
        // TODO: style and properly layout this error message, just in case
        return <h1>'Something went wrong :/'</h1>;
    }
  })();

  return (
    <MultiPageForm
      formTitle={formTitle}
      showBackButton={historyIsAvailable}
      onBackClick={onBackClick}
      onSubmit={onBookingSubmit}
      showNextButton={formContent.type === 'question'}
      nextIsDisabled={!currentAnswer}
      onNextClick={handleAnswerSubmit}
    >
      {content}
    </MultiPageForm>
  );
};

export default CheckerForm;

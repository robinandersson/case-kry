import React, { useState } from 'react';

import MultiPageForm from './MultiPageForm';

const CheckerForm = props => {
  const {
    formTitle,
    formContent,
    onAnswerSubmit,
    onBookingSubmit,
    onFormReset,
  } = props;
  const { id } = formContent;

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

  const content = (() => {
    switch (formContent.type) {
      case 'outcome':
        const { text, show_booking_button } = formContent;
        console.log(show_booking_button);

        return (
          <>
            <fieldset className="flex flex-col my-20">
              <legend className="text-2xl font-black pb-4">
                Thank you for answering the questions!
              </legend>
              <p>{text}</p>
              {show_booking_button && (
                <button class="btn" type="submit">
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
        const { question_text, answers } = formContent;
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
        return <h1>'Something went wrong :/'</h1>;
    }
  })();

  const actionButton = formContent.type === 'question' && (
    <button
      type="submit"
      onClick={handleAnswerSubmit}
      className="btn"
      disabled={!currentAnswer}
    >
      Next
    </button>
  );

  return (
    <MultiPageForm
      formTitle={formTitle}
      onSubmit={onBookingSubmit}
      actionButton={actionButton}
      formFooter={actionButton}
    >
      {content}
    </MultiPageForm>
  );
};

export default CheckerForm;

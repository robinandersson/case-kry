import React from 'react';

import MultiPageForm from './MultiPageForm';

const CheckerForm = props => {
  const { formTitle, formContent, onAnswerChange, onAnswerSubmit } = props;
  const { id } = formContent;

  const content = (() => {
    switch (formContent.type) {
      case 'outcome':
        const { text, show_booking_button } = formContent;
        console.log(show_booking_button);

        return (
          <fieldset className="flex flex-col py-10">
            <legend className="text-2xl font-black pb-4">
              Thank you for answering the questions!
            </legend>
            <p>{text}</p>
            {show_booking_button && <button class="btn">Book a meeting</button>}
          </fieldset>
        );

      case 'question':
        const { question_text, answers } = formContent;
        return (
          <fieldset className="flex flex-col py-10">
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
                    onChange={onAnswerChange}
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

  return (
    <MultiPageForm
      formTitle={formTitle}
      onSubmit={onAnswerSubmit}
      buttonText={'Next'}
      showButton={formContent.type === 'question'}
    >
      {content}
    </MultiPageForm>
  );
};

export default CheckerForm;

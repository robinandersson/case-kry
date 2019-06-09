import React from 'react';

import Form from './Form';
import MultiPageForm from './MultiPageForm';

const CheckerForm = props => {
  const { formTitle, formContent, onAnswerChange, onAnswerSubmit } = props;
  const { id } = formContent;

  const content = (() => {
    switch (formContent.type) {
      case 'outcome':
        const { text, showBookingButton } = formContent;
        return <h1>{text}</h1>;
        break;

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
        break;
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

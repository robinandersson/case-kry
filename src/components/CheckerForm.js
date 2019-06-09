import React from 'react';

import Form from './Form';
import MultiPageForm from './MultiPageForm';

const CheckerForm = props => {
  const { formTitle, onAnswerChange, onAnswerSubmit } = props;
  const { id, question_text, answers } = props.question;

  return (
    <MultiPageForm formTitle={formTitle} onSubmit={onAnswerSubmit}>
      <fieldset className="flex flex-col py-10">
        <legend className="text-2xl font-black pb-4">{question_text}</legend>
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
    </MultiPageForm>
  );
};

export default CheckerForm;

import React from 'react';

const Form = props => {
  const { formTitle, onAnswerChange, onAnswerSubmit } = props;
  const { id, question_text, answers } = props.question;

  return (
    <form
      onSubmit={onAnswerSubmit}
      className="flex flex-col justify-between w-full max-w-lg bg-white shadow-lg mx-auto p-10 rounded-xl h-64 min-h-2/3"
    >
      <div className="pb-4">
        <h1 className="text-center">{formTitle}</h1>
      </div>

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

      <button type="submit" className="btn">
        Next
      </button>
    </form>
  );
};

export default Form;

import React from 'react';

const Form = props => {
  const { formTitle } = props;
  const { id: questionId, text, answers } = props.question;

  return (
    <form className="flex flex-col justify-between w-full max-w-lg bg-white shadow-lg mx-auto p-10 rounded-xl h-64 min-h-2/3">
      <div className="pb-4">
        <h1 className="text-center">{formTitle}</h1>
      </div>

      <fieldset className="flex flex-col py-10">
        <legend className="text-2xl font-black pb-4">{text}</legend>
        <div className="flex">
          {answers.map(answer => (
            <label key={answer.id} className="flex-1">
              {answer.label}
              <input type="radio" name={questionId} value={answer.label} />
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

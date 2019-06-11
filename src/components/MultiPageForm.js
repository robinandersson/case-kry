import React from 'react';

import Form from './Form';

//TODO: refactor all form buttons to general Button/FormButton component(s)
const MultiPageForm = props => {
  const {
    formTitle,
    showBackButton,
    onBackClick,
    onSubmit,
    children,
    showNextButton,
    nextIsDisabled,
    onNextClick,
  } = props;

  return (
    <Form onSubmit={onSubmit}>
      <div className="pb-4 relative">
        {showBackButton && (
          <button
            type="button"
            className="absolute top left p-2 -mt-2"
            onClick={onBackClick}
          >
            <img
              className="h-6"
              src={process.env.PUBLIC_URL + '/icons/ic-arrow-left-green.svg'}
              alt="Back-arrow"
            />
          </button>
        )}
        {formTitle && <h1 className="text-center">{formTitle}</h1>}
      </div>

      {children}

      {showNextButton && (
        <button
          type="button"
          onClick={onNextClick}
          className="btn"
          disabled={nextIsDisabled}
        >
          Next
        </button>
      )}
    </Form>
  );
};

export default MultiPageForm;

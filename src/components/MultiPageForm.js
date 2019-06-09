import React from 'react';

import Form from './Form';

const MultiPageForm = props => {
  const { formTitle, onSubmit, children } = props;

  return (
    <Form onSubmit={onSubmit}>
      {formTitle && (
        <div className="pb-4">
          <h1 className="text-center">{formTitle}</h1>
        </div>
      )}

      {children}

      <button type="submit" className="btn">
        Next
      </button>
    </Form>
  );
};

export default MultiPageForm;

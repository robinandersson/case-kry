import React from 'react';

import Form from './Form';

const MultiPageForm = props => {
  const { formTitle, onSubmit, children, actionButton } = props;

  return (
    <Form onSubmit={onSubmit}>
      {formTitle && (
        <div className="pb-4">
          <h1 className="text-center">{formTitle}</h1>
        </div>
      )}

      {children}

      {actionButton && (
        <button type="submit" onClick={actionButton.onClick} className="btn">
          {actionButton.text}
        </button>
      )}
    </Form>
  );
};

export default MultiPageForm;

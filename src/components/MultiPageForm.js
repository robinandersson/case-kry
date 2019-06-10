import React from 'react';

import Form from './Form';

const MultiPageForm = props => {
  const { formHeader, onSubmit, children, formFooter } = props;

  return (
    <Form onSubmit={onSubmit}>
      {formHeader}
      {children}
      {formFooter}
    </Form>
  );
};

export default MultiPageForm;

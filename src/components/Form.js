import React from 'react';

//TODO: REMOVE! This component has become totally unneccessary xD
// break out css classes and use those instead
const Form = props => {
  const { onSubmit, children } = props;

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-between w-full max-w-md bg-white shadow-lg mx-auto p-10 rounded-xl min-h-2/3-screen"
    >
      {children}
    </form>
  );
};

export default Form;

import React, { useState } from 'react';
import Form from './components/Form.js';
import questionnaire from './assets/data/heartburn.json';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(
    questionnaire.questions[0]
  );
  const [currentAnswer, setCurrentAnswer] = useState();

  const onAnswerChange = evt => setCurrentAnswer(evt.target.value);
  const onAnswerSubmit = evt => {
    evt.preventDefault();
  };

  return (
    <main role="main" className="h-full flex flex-col justify-center">
      <Form
        formTitle="Heartburn Checker"
        question={currentQuestion}
        onAnswerChange={onAnswerChange}
        onAnswerSubmit={onAnswerSubmit}
      />
    </main>
  );
}

export default App;

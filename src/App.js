import React, { useState } from 'react';
import Form from './components/Form.js';
import questionnaire from './assets/data/heartburn.json';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(
    questionnaire.questions[0]
  );

  return (
    <main role="main" className="h-full flex flex-col justify-center">
      <Form formTitle="Heartburn Checker" question={currentQuestion} />
    </main>
  );
}

export default App;

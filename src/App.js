import React, { useState } from 'react';
import Form from './components/Form.js';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState({
    question: {
      id: 'is_heartburn_known',
      text: 'Is your heartburn previously known?',
      answers: [
        { id: 'is_heartburn_known_yes', label: 'Yes', score: 5 },
        { id: 'is_heartburn_known_no', label: 'No', score: 0 },
      ],
    },
    previous: null,
    next: 'heartburn_previous_treatment',
  });

  return (
    <main role="main" className="h-full flex flex-col justify-center">
      <Form formTitle="Heartburn Checker" question={currentQuestion.question} />
    </main>
  );
}

export default App;

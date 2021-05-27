import { useState, useEffect } from 'react';

import Start from '../components/Start';
import Question from '../components/Question';

import quizData from '../data/quiz.json';

import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answer, setAnswer] = useState([1]);

  const handlerStartQuiz = () => {
    setStep(2);
  }

  return (
    <>
      <Component {...pageProps} />
      {step === 1 && <Start onQuizStart={handlerStartQuiz} />}
      {step === 2 && <Question 
        data={quizData.data[activeQuestion]}
        onAnswerUpdate={setAnswer}
        numberOfQuestions={quizData.data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
      />}
    </>
  )
}

export default MyApp

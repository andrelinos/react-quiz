import { useState, useEffect } from 'react';

import Start from '../components/Start';
import Question from '../components/Question';
import End from '../components/End';

import quizData from '../data/quiz.json';

import '../styles/global.scss';

let interval;

function MyApp({ Component, pageProps }) {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if(step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  const handlerStartQuiz = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  const handleResetClick = () => {

  }

  return (
    <>
      <Component {...pageProps} />

      {step === 1 && <Start onQuizStart={handlerStartQuiz} />}
      {step === 2 && <Question 
        data={quizData.data[activeQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={quizData.data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
      />}
      {step === 3 && <End 
        results={answers}
        data={quizData.data}
        onReset={handleResetClick}
        onAnswerCheck={() => {}}
        time={time}
      />}
    </>
  )
}

export default MyApp

import { useState, useEffect } from 'react';
import { AppProps } from 'next/app';

import Start from '../components/Start';
import Question from '../components/Question';
import End from '../components/End';
import Modal from '../components/Modal';

import quizData from '../data/quiz.json';

import '../styles/global.scss';

let interval: NodeJS.Timeout;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (step === 3) {
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
    setActiveQuestion(0);
    setShowModal(false);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  return (
    <div className="App">
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
        onAnswerCheck={() => setShowModal(true)}
        time={time}
      />}

      {showModal && <Modal
        onClose={() => setShowModal(false)}
        results={answers}
        data={quizData.data}
      />}
    </div>
  )
}

export default MyApp

import { useEffect, useState } from 'react';

import {formatTime} from '../utils/time';

export default function End({ results, data, onReset, onAnswerCheck, time }) {
  const [currentAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if(result.a === data[index].answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
  }, []);

  return (
    <div className="card">
      <div className="card-content">
        <h3>Seus resultados</h3>
        <p>{currentAnswers} de {data.length}</p>
        <p><strong>{Math.floor((currentAnswers / data.length) * 100)}%</strong></p>
        <p><strong>Seu tempo:</strong>{formatTime(time)}</p>
        <button type="button" className="button-info" onClick={onAnswerCheck}>Ver suas respostas</button>
        <button type="button" className="button-success" onClick={onReset}>Tentar novamente</button>
      </div>
    </div>
  )
}
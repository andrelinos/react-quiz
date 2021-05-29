import { useState, useEffect, useRef } from 'react';

interface QuestionProps {
  data: QuestionDataProps[];
  onAnswerUpdate: any;
  numberOfQuestions: number;
  activeQuestion: number;
  onSetActiveQuestion: any;
  onSetStep: any;
}

interface QuestionDataProps {
  data: {
    question: string,
    a: string,
    q: string,
  }
}

export default function Question({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep
}: QuestionProps): JSX.Element {

  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef<HTMLInputElement | any>();

  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelected(e.target.value);
    if (error) {
      setError('');
    }
  }

  function handleNextClick(e: React.ChangeEvent<HTMLInputElement>) {
    if (selected === '') {
      return setError('Por favor selecione uma opção!');
    }

    onAnswerUpdate((prevState: QuestionProps) => [...prevState, { q: data.question, a: selected }]);
    setSelected('');
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      onSetStep(3);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h2 className="title">{data.question}</h2>
            <div className="control" ref={radiosWrapper}>
              {data.choices.map((choice, i) => (
                <label className="radio" key={i}>
                  <input type="radio" name="answer" value={choice} onChange={handleChange} />
                  {choice}
                </label>
              ))}
            </div>
            {error && <div className="error">{error}</div>}
            <button type="button" className="button" onClick={handleNextClick}>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
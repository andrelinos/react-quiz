import { useState, useEffect, useRef } from 'react';

export default function Question({ 
  data, 
  onAnswerUpdate, 
  numberOfQuestions, 
  activeQuestion, 
  onSetActiveQuestion,
  onSetStep
}) {

  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();

  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if(findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data])

  const handleChange = (e) => {
    setSelected(e.target.value);
    if(error) {
      setError('');
    }
  }

  const handleNextClick = (e) => {
    if(selected === '') {
      return setError('Por favor selecione uma opção!');
    }

    onAnswerUpdate(prevState => [...prevState, { q: data.question, a: selected }]);
    setSelected('');
    if(activeQuestion < numberOfQuestions -1) {
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
              {data.choices.map((choice, i) =>(
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
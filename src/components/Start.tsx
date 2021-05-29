import './styles.module.scss';

export default function Start({ onQuizStart }) {
  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h1>Iniciar Jogo</h1>
            <p>Boa sorte!</p>
            <button type="button" onClick={onQuizStart}>Iniciar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
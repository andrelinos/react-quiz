type ModalProps = {
  onClose: () => void;
  results: Array<{
    id: number;
    a: string;
    q: string;
  }>;
  data: any;
}

export default function Modal({ onClose, results, data }: ModalProps): JSX.Element {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Suas repostas</p>
          <button className="delete" onClick={onClose}></button>
        </header>
        <section className="modal-card-body content">
          <ul>
            {results.map((result, i) => (
              <li key={result.id} className="mb-6">
                <p><strong>{result.q}</strong></p>
                <p className={result.a === data[i].answer
                  ? 'has-background-sucess has-text-white p-2'
                  : 'has-background-danger has-text-white p-2'
                }>Sua resposta: {result.a}</p>
                {result.a !== data[i].answer && 
                  <p className="has-background-link has-text-white p-2"
                  >Resposta correta: {data[i].answer}</p>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
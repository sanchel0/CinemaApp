import './Modal.css'

export default function Modal({ show, onClose, children }) {
  if (!show) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

Modal.Header = function Header({ children, closeButton = true, onClose }) {
  return (
    <div className="modal-header">
      {children}
      {closeButton && (
        <button type="button" className="modal-close-button" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
};

Modal.Title = function Title({ children }) {
  return <h2 className="modal-title">{children}</h2>;
};

Modal.Body = function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>;
};

Modal.Footer = function ModalFooter({ children }) {
  return <div className="modal-footer">{children}</div>;
};

/*
<Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Country</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="ISO Code" value={isoCode} onChange={e => setIsoCode(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>



--
<Modal show={show} onHide={() => setShow(false)}>
  <h2>Crear Country</h2>
  {Formulario acá}
  <button onClick={() => setShow(false)}>Cerrar</button>
</Modal>

--como se llama a <Modal.Footer>? se le debe poner export tambien? o bastae con que modal tenga el export export default function Modal?
*/
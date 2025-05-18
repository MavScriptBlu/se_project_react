import "./modalwithform.css";

function ModalWithForm({
  isOpen,
  children,
  buttonText,
  title,
  onClose,
  onOverlayClick,
  isValid,
  onSubmit,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={onOverlayClick}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"></button>
        <form
          className="modal__form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}>
          {children}
          <button type="submit" className="modal__submit" disabled={!isValid}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

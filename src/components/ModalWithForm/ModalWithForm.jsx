/*ModalWithForm.jsx*/
import "./modalwithform.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  onOverlayClick,
  isValid,
  onSubmit,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}
      onClick={onOverlayClick}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"></button>
        <form className="modal__form" onSubmit={onSubmit}>
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

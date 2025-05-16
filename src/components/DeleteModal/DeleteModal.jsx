import "./DeleteModal.css";

export default function DeleteModal({
  activeModal,
  onClose,
  onOverlayClick,
  handleConfirm,
}) {
  return (
    <div
      className={`modal ${activeModal === "delete-item" ? "modal_opened" : ""}`}
      onClick={onOverlayClick}>
      <div className="delete-modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close_type_delete"
        />
        <p className="delete-modal__title">
          Are you sure you want to delete this item? <br />
          This action cannot be undone.
        </p>
        <div className="delete-modal__button_container">
          <button
            className="delete-modal__confirm-button"
            onClick={handleConfirm}>
            Yes, delete item
          </button>
          <button className="delete-modal__cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

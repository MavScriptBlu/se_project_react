//DeleteModal component
import "./DeleteModal.css";
import useModalDismiss from "../../hooks/useModalDismiss";

function DeleteModal({ isOpen, onClose, handleConfirm }) {
  // hook to handle modal close events
  useModalDismiss(isOpen, onClose);

  return (
    <div className={`modal delete-modal ${isOpen ? "modal_opened" : ""}`}>
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

export default DeleteModal;

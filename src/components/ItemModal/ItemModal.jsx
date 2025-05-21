/*ItemModal.jsx*/
import "./itemmodal.css";
import useModalClose from "../../hooks/useModalClose";

function ItemModal({ isOpen, onClose, card, onDeleteCard }) {
  // custom hook to handle modal close events
  useModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          type="button"
          className="modal__close_type_image"
        />
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <section className="modal__footer-description">
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </section>
          <button className="modal__delete" onClick={() => onDeleteCard(card)}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

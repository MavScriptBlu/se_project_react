/*ItemModal.jsx*/
import "./itemmodal.css";

function ItemModal({ activeModal, onClose, card, onOverlayClick }) {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`modal ${activeModal === "preview" && "modal_opened"}`}
      onClick={onOverlayClick}>
      <div
        className="modal__content modal__content_type_image"
        onClick={handleContentClick}>
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_image"
        />
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <section className="modal__footer-description">
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </section>{" "}
          <button className="modal__delete">Delete Item</button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

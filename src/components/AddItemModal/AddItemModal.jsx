import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useModalDismiss from "../../hooks/useModalDismiss";

function AddItemModal({
  isOpen,
  onClose,
  isSubmitted,
  onSubmit,
  values,
  errors,
  handleChange,
  isFormValid,
}) {
  // custom hook to handle modal close events
  useModalDismiss(isOpen, onClose);

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      isValid={isFormValid()}
      onSubmit={onSubmit}
      isSubmitted={isSubmitted}>
      <label className="modal__label">
        Name
        <input
          type="text"
          className={`modal__input ${
            errors.name ? "modal__input_type_error" : ""
          }`}
          name="name"
          placeholder="Enter garment name"
          value={values.name || ""}
          onChange={handleChange}
          minLength={2}
          maxLength={40}
          required
        />
        <span className="modal__error">{errors.name}</span>
      </label>

      <label className="modal__label">
        Image
        <input
          type="url"
          className={`modal__input ${
            errors.imageUrl ? "modal__input_type_error" : ""
          }`}
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.imageUrl}</span>
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>

        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;

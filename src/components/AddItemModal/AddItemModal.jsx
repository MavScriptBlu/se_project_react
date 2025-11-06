import { useState } from "react";
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

  // State to track whether user wants to upload file or use URL
  const [imageMethod, setImageMethod] = useState("url");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageMethodChange = (e) => {
    setImageMethod(e.target.value);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // Store file in a way that parent component can access
    handleChange({ target: { name: "imageFile", value: file } });
  };

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

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Choose image method:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="imageMethod"
            value="url"
            checked={imageMethod === "url"}
            onChange={handleImageMethodChange}
          />
          Use Image URL
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="imageMethod"
            value="file"
            checked={imageMethod === "file"}
            onChange={handleImageMethodChange}
          />
          Upload from Computer
        </label>
      </fieldset>

      {imageMethod === "url" ? (
        <label className="modal__label">
          Image URL
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
      ) : (
        <label className="modal__label">
          Choose Image File
          <input
            type="file"
            className="modal__input"
            name="imageFile"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {selectedFile && (
            <span className="modal__file-name">
              Selected: {selectedFile.name}
            </span>
          )}
        </label>
      )}

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
// App.jsx
import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

function App() {
  // States for managing the application
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormAndValidation();
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Function to handle temperature unit toggle
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Function to handle clicking on a card
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Function to handle add modal opening/
  const handleAddClick = () => {
    setActiveModal("add-garment");
    setValues({
      name: "",
      imageUrl: "",
      weather: "",
    });
  };

  // Function to handle closing the active modal
  const closeActiveModal = () => {
    setActiveModal("");
    resetForm(); // This will reset all form values
  };

  //Function to close modal on the overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeActiveModal();
    }
  };

  // Function for form input value validation
  const isFormValid = () => {
    return isValid && values.name && values.imageUrl && values.weather;
  };

  // Function for submission validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const newGarment = {
      _id: Date.now(),
      ...values,
      weather: values.weather.toLowerCase(),
      link: values.imageUrl,
    };
    setClothingItems([...clothingItems, newGarment]);
    resetForm();
    setIsSubmitted(false);
    closeActiveModal();
  };

  // checking input values
  useEffect(() => {
    if (!activeModal) return; // Only add listener when needed

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <div className="page">
        <div className="page__content">
          <Header
            userName="Darien Johnas"
            handleAddClick={handleAddClick}
            weatherData={weatherData}
          />

          <Main
            weatherData={weatherData}
            onCardClick={setActiveModal}
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
          />
        </div>

        <ModalWithForm
          title="New Garment"
          buttonText="Add garment"
          activeModal={activeModal}
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onOverlayClick={handleOverlayClick}
          isValid={isFormValid()}
          onSubmit={handleSubmit}
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

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onOverlayClick={handleOverlayClick}
        />

        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

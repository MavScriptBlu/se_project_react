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

function App() {
  // States for managing the application
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    imageUrl: false,
    weather: false,
  });

  // Function to handle clicking on a card
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Function to handle add modal opening/
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  // Function to handle closing the active modal
  const closeActiveModal = () => {
    setActiveModal("");
    setFormValues({
      name: "",
      imageUrl: "",
      weather: "",
    });
    setTouchedFields({
      name: false,
      imageUrl: false,
      weather: false,
    });
  };

  //Function to close modal on the overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeActiveModal();
    }
  };

  // Function to check input value
  const handleInputChange = (event) => {
    const { id, name, value } = event.target;
    setFormValues({
      ...formValues,
      [name || id]: value,
    });
    setTouchedFields({
      ...touchedFields,
      [name || id]: true,
    });
  };

  // Function for form input value validation
  const isFormValid = () => {
    return (
      formValues.name &&
      formValues.imageUrl &&
      formValues.weather &&
      !getErrorMessage("name", formValues.name) &&
      !getErrorMessage("imageUrl", formValues.imageUrl)
    );
  };

  // Function for submission validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const newGarment = {
      _id: Date.now(), //this creates a unique ID based on timestamp
      ...formValues,
      weather: formValues.weather.toLowerCase(),
      link: formValues.imageUrl,
    };
    setClothingItems([...clothingItems, newGarment]); //adds new garment to the collection
    setFormValues({
      name: "",
      imageUrl: "",
      weather: "",
    });
    setIsSubmitted(false); // resets submission state
    closeActiveModal(); // closes after successful submission
  };

  // Function to get error message
  const getErrorMessage = (name, value) => {
    if (!value && touchedFields[name]) {
      return "This field is required";
    }
    if (name === "name" && value.length < 2 && touchedFields[name]) {
      return "Name must be at least 2 characters long";
    }
    if (name === "imageUrl" && touchedFields[name] && value) {
      try {
        const url = new URL(value);
        // Check if URL contains image-related patterns
        if (
          !url.pathname.includes("photo") &&
          !/\.(jpg|jpeg|png|gif|bmp)/i.test(url.pathname)
        ) {
          return "URL must link directly to an image file";
        }
      } catch (e) {
        return "Please enter a valid URL";
      }
    }
    return "";
  };

  // checking input values
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
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
        onClose={closeActiveModal}
        onOverlayClick={handleOverlayClick}
        isValid={isFormValid()}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}>
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className={`modal__input ${
              touchedFields.name && getErrorMessage("name", formValues.name)
                ? "modal__input_type_error"
                : ""
            }`}
            id="name"
            placeholder="Enter garment name"
            value={formValues.name}
            onChange={handleInputChange}
            minLength={2}
            maxLength={40}
            required
          />
          <span className="modal__error">
            {getErrorMessage("name", formValues.name)}
          </span>
        </label>

        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            className={`modal__input ${
              touchedFields.imageUrl &&
              getErrorMessage("imageUrl", formValues.imageUrl)
                ? "modal__input_type_error"
                : ""
            }`}
            id="imageUrl"
            placeholder="Image URL"
            value={formValues.imageUrl}
            onChange={handleInputChange}
            required
          />
          <span className="modal__error">
            {getErrorMessage("imageUrl", formValues.imageUrl)}
          </span>
        </label>

        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              className="modal__radio-input"
              name="weather"
              value="hot"
              checked={formValues.weather === "hot"}
              onChange={handleInputChange}
            />
            Hot
          </label>

          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio">
            <input
              id="warm"
              type="radio"
              className="modal__radio-input"
              name="weather"
              value="warm"
              checked={formValues.weather === "warm"}
              onChange={handleInputChange}
            />
            Warm
          </label>

          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio">
            <input
              id="cold"
              type="radio"
              className="modal__radio-input"
              name="weather"
              value="cold"
              checked={formValues.weather === "cold"}
              onChange={handleInputChange}
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
  );
}

export default App;

// App.jsx
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";

import { coordinates, APIkey } from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { getClothingItems, addClothingItem } from "../../utils/api";

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
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [isClothingLoading, setIsClothingLoading] = useState(true);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newGarment = {
      ...values,
      weather: values.weather.toLowerCase(),
      link: values.imageUrl,
    };

    try {
      const savedItem = await addClothingItem(newGarment);
      setClothingItems([savedItem, ...clothingItems]); // Add new items to the beginning
      resetForm();
      setIsSubmitted(false);
      closeActiveModal();
    } catch (error) {
      console.error("Error adding clothing item:", error);
      setIsSubmitted(false);
    }
  };

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

  // Fetch weather data from the API
  useEffect(() => {
    setIsWeatherLoading(true);
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error)
      .finally(() => {
        setIsWeatherLoading(false);
      });
  }, []);

  // Fetching clothing items from the API
  useEffect(() => {
    setIsClothingLoading(true);
    getClothingItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Error fetching clothing items:", error);
      })
      .finally(() => {
        setIsClothingLoading(false);
      });
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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={setActiveModal}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  isWeatherLoading={isWeatherLoading}
                  isClothingLoading={isClothingLoading}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  weatherData={weatherData}
                />
              }
            />
          </Routes>
        </div>

        <AddItemModal
          activeModal={activeModal}
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onOverlayClick={handleOverlayClick}
          isSubmitted={isSubmitted}
          onSubmit={handleSubmit}
          values={values}
          errors={errors}
          handleChange={handleChange}
          isFormValid={isFormValid()}
        />

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

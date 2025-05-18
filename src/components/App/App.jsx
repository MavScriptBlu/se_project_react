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
import DeleteModal from "../DeleteModal/DeleteModal";

import { coordinates, APIkey } from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { getItems, addItem, deleteItem } from "../../utils/api";

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
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "Darien Johnas",
  });

  // Function to handle temperature unit toggle
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Function to handle clicking on a card
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Function to handle add modal opening
  const handleAddClick = () => {
    setActiveModal("add-garment");
    setValues({
      name: "",
      imageUrl: "",
      weather: "",
    });
  };

  // Function to handle delete modal opening
  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-item");
  };

  // Function to handle deletion of a card
  const handleDeleteCard = async () => {
    if (!cardToDelete) return;

    // Check if it's a default item
    if (String(cardToDelete._id).startsWith("default_")) {
      console.log("Cannot delete default items");
      setCardToDelete(null);
      closeActiveModal();
      return;
    }

    try {
      await deleteItem(cardToDelete.id); // Just use id directly
      const updatedClothingItems = clothingItems.filter(
        (item) => item.id !== cardToDelete.id // Simplified filter
      );
      setClothingItems(updatedClothingItems);
      closeActiveModal();
      setCardToDelete(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Function to handle closing the active modal
  const closeActiveModal = () => {
    setActiveModal("");
    setCardToDelete(null);
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

  // Function to add a new item to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newGarment = {
      _id: String(Date.now()), // Convert timestamp to string for consistency
      name: values.name,
      weather: values.weather.toLowerCase(),
      link: values.imageUrl,
    };

    try {
      const savedItem = await addItem(newGarment);
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

  // Fetch clothing items from the API
  useEffect(() => {
    setIsClothingLoading(true);
    getItems()
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
            userName={currentUser.name}
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
                  currentUser={currentUser}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddItem={handleAddClick}
                />
              }
            />
          </Routes>
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onOverlayClick={handleOverlayClick}
          isSubmitted={isSubmitted}
          onSubmit={handleSubmit}
          values={values}
          errors={errors}
          handleChange={handleChange}
          isFormValid={isFormValid}
        />

        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          onOverlayClick={handleOverlayClick}
          onDeleteCard={openConfirmationModal}
        />

        <DeleteModal
          isOpen={activeModal === "delete-item"}
          onClose={closeActiveModal}
          onOverlayClick={handleOverlayClick}
          handleConfirm={handleDeleteCard}
        />

        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

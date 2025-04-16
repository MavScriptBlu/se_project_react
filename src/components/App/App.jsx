// App.jsx
import { useEffect, useState } from "react";

import "./app.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
// import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import ItemModal from "../ItemModal/ItemModal";
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

  // Function to handle clicking on a card
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Function to handle modal opening/closing
  const handleModalClose = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

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
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        title="New Garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      />
      <label htmlFor="name" className="modal__label">
        Name(" ")
        <input
          type="text"
          name="name"
          id="name"
          className="modal__input"
          placeholder="Enter garment name"
          required
        />
      </label>
    </div>
  );
}

export default App;

/*
import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "../Main";
import Footer from "./Footer";
import ModalWithForm from "../ModalWithForm";
import ItemModal from "../ItemModal";
import "./assets/react.svg";


function App() {
  const [temp, setTemp] = useState(0);



  // Function to handle adding new clothing item
  const handleAddNewClick = () => {
    setActiveModal("create");
  };

  return (
    <div className="page">
      <Header onAddNewClick={handleAddNewClick} location={location} />
      <Main weatherTemp={temp} onCardClick={handleCardClick} />
      <Footer />

      {activeModal === "create" && (
        <ModalWithForm
          title="New Garment"
          name="new-card"
          buttonText="Add garment"
          onClose={handleModalClose}>
      //    { Form children will go here }
        </ModalWithForm>
      )}

      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleModalClose} />
      )}
  </div>
  );
 */

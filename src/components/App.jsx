// App.jsx
import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import "./assets/react.svg";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function App() {
  // States for managing the application
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");

  // Function to handle modal opening/closing
  const handleModalClose = () => {
    setActiveModal(null);
    setSelectedCard(null);
  };

  // Function to handle clicking on a card
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

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
          {/* Form children will go here */}
        </ModalWithForm>
      )}

      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default App;

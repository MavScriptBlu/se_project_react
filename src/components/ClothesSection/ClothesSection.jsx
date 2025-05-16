import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants";
import { useMemo } from "react";

export default function ClothesSection({
  onCardClick,
  clothingItems,
  weatherData,
  onAddItem,
}) {
  // Add the same filtering logic as in Main.jsx
  const filteredClothingItems = useMemo(() => {
    const allItems = [...defaultClothingItems, ...clothingItems];
    return allItems.filter((item) => {
      return item.weather === weatherData.type;
    });
  }, [weatherData.type, clothingItems]);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">My Clothes</p>
        <button
          className="clothes-section__add-button"
          type="button"
          onClick={onAddItem}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {filteredClothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

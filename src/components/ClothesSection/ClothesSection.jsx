import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useMemo } from "react";

export default function ClothesSection({
  onCardClick,
  clothingItems,
  onAddItem,
}) {
  // Combine default clothing items with the user's clothing items
  const filteredClothingItems = useMemo(() => {
    const allItems = [...clothingItems];
    return allItems;
  }, [clothingItems]);

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

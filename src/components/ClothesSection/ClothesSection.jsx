import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

export default function ClothesSection() {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">My Clothes</p>
        <button className="clothes-section__add-button" type="button">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id} //both default and new cards
              item={item}
              //PASS AS PROP TO COMPONENT ClothesSection onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

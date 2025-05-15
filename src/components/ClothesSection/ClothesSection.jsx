import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { filteredClothingItems } from "../../utils/constants";

export default function ClothesSection() {
  return (
    <div className="clothes-section">
      <div>
        <h2 className="clothes-section__title">My Clothes</h2>
        <button className="clothes-section__add-button" type="button">
          Add New Garment
        </button>
      </div>
      <ul className="cards__list">
        {filteredClothingItems.map((item) => {
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

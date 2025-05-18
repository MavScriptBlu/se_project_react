/*Main.jsx*/
import "./main.css";

import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { useMemo, useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredClothingItems = useMemo(() => {
    // ensure all database items have string IDs
    const databaseItemsWithStringIds = clothingItems.map((item) => ({
      ...item,
      _id: String(item._id), // Convert number IDs to strings
    }));

    // Create default items with stable IDs
    const defaultItemsWithUniqueIds = defaultClothingItems.map(
      (item, index) => ({
        ...item,
        _id: `default_${item.weather}_${index}`, // Stable ID based on weather type and index
      })
    );
    const allItems = [
      ...databaseItemsWithStringIds,
      ...defaultItemsWithUniqueIds,
    ];
    return allItems.filter((item) => {
      return item.weather === weatherData.type;
    });
  }, [weatherData.type, clothingItems]);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}
          &deg;{currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id} //both default and new cards
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

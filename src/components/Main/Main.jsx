/*Main.jsx*/
import "./main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { useMemo } from "react";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const filteredClothingItems = useMemo(() => {
    const allItems = [...defaultClothingItems, ...clothingItems];
    return allItems.filter((item) => {
      return item.weather === weatherData.type;
    });
  }, [weatherData.type, clothingItems]);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {Math.round(weatherData.temp.F)}&deg;F / You may want to
          wear:
        </p>
        <ul className="cards__list">
          {filteredClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id || item.id} //both default and new cards
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

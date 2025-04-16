/*Header.jsx*/

import "./header.css";
import logo from "../../assets/wtwrLogo.svg";
import avatar from "../../assets/avatarPhoto.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div>
        <img className="header__logo" src={logo} alt="logo" />{" "}
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <button className="header__add-clothes-button">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Darien Johnas</p>
        <img className="header__avatar" src={avatar} alt="Darien Johnas" />
      </div>
    </header>
  );
}

export default Header;

/*Header.jsx*/

import "./header.css";
import logo from "../../assets/wtwrLogo.svg";
import avatar from "../../assets/avatarPhoto.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData, userName }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo-container">
        <img className="header__logo" src={logo} alt="logo" />{" "}
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button">
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">{userName}</p>
        <img className="header__avatar" src={avatar} alt="User Avatar" />
      </div>
    </header>
  );
}

export default Header;

/*Header.jsx*/

import "./header.css";
import logo from "../../assets/wtwrLogo.svg";
import avatar from "../../assets/avatarPhoto.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData, userName }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          {" "}
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
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
      <Link to="/profile">
        <div className="header__user-container">
          <p className="header__username">{userName}</p>
          <img className="header__avatar" src={avatar} alt="User Avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;

import "./SideBar.css";
import avatar from "../../assets/avatarPhoto.svg";

function SideBar({ currentUser }) {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="default avatar" />
      <p className="sidebar__username">{currentUser.name}</p>
    </div>
  );
}

export default SideBar;

import "./SideBar.css";
import avatar from "../../assets/avatarPhoto.svg";

export default function SideBar({ currentUser }) {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="default avatar" />
      <p className="sidebar__username">{currentUser.name}</p>
    </div>
  );
}

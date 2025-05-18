import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({
  onCardClick,
  clothingItems,
  onAddItem,
  currentUser,
}) {
  return (
    <div className="profile">
      <section className="profile_sidebar">
        <SideBar currentUser={currentUser} />
      </section>
      <section className="profile_clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddItem={onAddItem}
        />
      </section>
    </div>
  );
}

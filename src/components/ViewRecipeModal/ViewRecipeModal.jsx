import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./ViewRecipeModal.css";

function ViewRecipeModal({ recipe }) {
  const user = useSelector((store) => store.user);
  console.log(user);

  const dispatch = useDispatch();

  const { id, title, author, backstory, ingredients, instructions, favorite } =
    recipe;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorite);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    try {
      if (isFavorite) {
        // Remove from favorites
        await axios.post(`/api/favorites/${id}/unfavorite`, {
          userId: user.id,
        });
        setIsFavorite(false);
        getFavorites();
      } else {
        // Add to favorites
        await axios.post(`/api/favorites/${id}/favorite`, { userId: user.id });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating recipe favorite status:", error);
      // Handle error
    }
  };

  const getFavorites = () => {
    axios
      .get("/api/favorites")
      .then((response) => {
        // Dispatch an action to update the state with the fetched recipes
        console.log("response is:", response);
        dispatch({
          type: "SET_FAVORITES",
          payload: response.data,
        });
        console.log("response.data is:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching favorites:", error);
      });
  };

  const handleView = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button className="view-btn" onClick={handleView}>
        VIEW
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Recipe Modal"
        ariaHideApp={false}
      >
        {/* Modal content */}
        <button className="toggle-btn" onClick={toggleModal}>
          ×
        </button>
        <br />
        <div className="all-text">
          <label className="label">Title:</label>
          <div className="text">{title}</div>
          <br />
          <label className="label">Author:</label>
          <div className="text">{author}</div>

          <br />
          <label className="label">Backstory:</label>
          <div className="text">{backstory}</div>

          <br />
          <label className="label">Ingredients:</label>
          <div className="text">{ingredients}</div>

          <br />
          <label className="label">Instructions:</label>
          <div className="text">{instructions}</div>
        </div>
        <br />
        <button className="favorite-btn" onClick={handleFavorite}>
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </Modal>
    </>
  );
}

export default ViewRecipeModal;

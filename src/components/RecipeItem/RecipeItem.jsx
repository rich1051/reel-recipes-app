import "./RecipeItem.css";
import ViewRecipeModal from "../ViewRecipeModal/ViewRecipeModal";
import { useDispatch } from "react-redux";

function RecipeItem({ recipe }) {
  console.log("RECIPE IS:", recipe);

  const dispatch = useDispatch();

  const handleDelete = (recipe) => {
    dispatch({ type: "DELETE_RECIPE", payload: recipe });
  };

  return (
    <div className="recipe-item">
      <h4>{recipe.title}</h4>
      <p>Author: {recipe.author}</p>
      <ViewRecipeModal recipe={recipe} />
      <button className="delete-btn" onClick={() => handleDelete(recipe)}>
        DELETE
      </button>
    </div>
  );
}

export default RecipeItem;
import React from 'react';
import "./RecipeCard.css";

const RecipeCard = ({recipe}) => {
  return (
    <div className='recipe-card'>
        {/* <img src={`./recipe-website${recipe.image}`} alt={recipe.title} /> */}
        <img src={recipe.image} alt={recipe.title} />
        <h3>{recipe.title}</h3>
        <p>{recipe.category}</p>
    </div>
  );
};

export default RecipeCard;
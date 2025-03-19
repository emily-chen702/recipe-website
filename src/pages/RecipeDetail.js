import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./RecipeDetail.css"

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch("/recipes.json")
            .then((response) => response.json())
            .then((data) => {
                const selectedRecipe = data.find((r) => r.id === parseInt(id));
                setRecipe(selectedRecipe);
            });
    }, [id]);

    if (!recipe) return <p>Loading...</p>;
  return (
    <div className='recipe-detail'>
        <div className='top-section'>
            <div className="recipe-info">
                <span className='tag'>{recipe.category}</span>
                <h1>{recipe.title}</h1>
                {recipe.description && (
                    <p className='description'>{recipe.description}</p>
                )}
            <div className='recipe-meta'>
                {recipe.date && <span> Date made: {recipe.date}</span>}
            </div>
            </div>
            <div className='recipe-image'>
                <img src={recipe.image} alt={recipe.title} />
            </div>
        </div>

        <div className='bottom-section'>
            <div  className='ingredients-col'>
                <h2> Ingredients </h2>
                <ul>
                    {recipe.ingredients.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className='instructions-col'>
                <h2>Instructions</h2>
                <ol>
                    {recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        </div>

        {/*
        <p> Cooks on {recipe.date}</p>
        <h3>Ingredients</h3>
        <ul>
            {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
        <h3>Instructions</h3>
        <ol>
            {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
            ))}
        </ol> */}
    </div>
  );
};

export default RecipeDetail
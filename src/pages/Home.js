import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Home.css';


const Home = () => {
    const [featuredRecipes, setFeaturedRecipes] = useState([]);

    useEffect(() => {
        fetch("./recipe-website/featured_recipes.json")
            .then((res) => res.json())
            .then((data) => setFeaturedRecipes(data.slice(0,3)))
            .catch((err) => console.error("Error fetching featured recipes:", err));
    }, [])
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetch("./recipe-website/recipes.json")
            .then((response) => response.json())
            .then((data) => {
                const uniqueCategories = Array.from(
                    new Set(
                        data.flatMap((recipe) =>
                        recipe.category.split(",").map((cat) => cat.trim())
                    )
                )
            );
            setCategories(uniqueCategories);
            })
            .catch((err) => console.error("Error fetching recipes:", err));
    }, []);

    const handleCategoryClick = (category) => {
        navigate(`/recipes?categories=${encodeURIComponent(category)}`);
    };

  return (
    <div className="home-page">
        {/* Bio Section */}
        <section className="bio-section container">
            <div className="bio-content">
                <div className="bio-image">
                    <img src="./recipe-website/images/emily_profile.jpg" alt="Emily" />
                </div>
                <div className="bio-text">
                    <h2>Hi, I'm Emily.</h2>
                    <p> Welcome to my recipe website! Feel free to browse through my collection of my self-curated and family recipes :) </p>
                </div>
            </div>
        </section>

        {/* Category Button Section */}
        <section className="category-buttons container">
            {categories.map((category) => (
                <button 
                className="category-btn"
                key={category} 
                onClick={() => handleCategoryClick(category)}>
                    {category}
                </button>
            ))}
        </section>

        {/*Featured Section */}
        <section className="featured-selection container">
            <h2 className="section-title">Featured Recipes</h2>
            <div className="featured-recipes">
                {featuredRecipes.map((recipe) => (
                    <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="featured-card">
                        <img src={`./recipe-website${recipe.image}`} alt={recipe.title} />
                        <h2>{recipe.title}</h2>
                        <p>{recipe.category}</p>
                    </Link>
                ))}
            </div>
        </section>
    </div>
  )
}

export default Home
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">Emmy Eats</div>
            <div className="nav-links">
                <Link to="/recipe-website">Home</Link>
                <Link to="/recipe-website/recipes">All Recipes</Link>
                <Link to="/">How tos</Link>
                <Link to="/">Ingredients</Link>
            </div>
        </nav>
    );
};

export default Navbar;
// Filename - App.js

import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import AllRecipes from "./pages/AllRecipes";
// import About from "./pages/about";
// import Blogs from "./pages/blogs";
// import SignUp from "./pages/signup";
// import Contact from "./pages/contact";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/recipe-website" element={<Home />} />
                <Route exact path="/recipe-website/recipes" element={<AllRecipes />} />
                {/* <Route path="/about" element={<About />} />
                <Route
                    path="/contact"
                    element={<Contact />}
                /> */}
                <Route path="/recipe-website/recipe/:id" element={<RecipeDetail />} />
            </Routes>
        </Router>
    );
}

export default App;

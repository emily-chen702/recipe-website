import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import './AllRecipes.css';

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("./recipe-website/recipes.json")
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data);
            const uniqueCategories = Array.from(
                new Set(
                    data.flatMap((recipe) =>
                        recipe.category.split(",").map((cat) => cat.trim())
                    )
                )
            );
            setCategories(uniqueCategories);
        
            // Read categories from URL on first load
            const queryParams = new URLSearchParams(location.search);
            const categoriesParam = queryParams.get("categories");
            if (categoriesParam) {
                setSelectedCategories(categoriesParam.split(",").map((cat) => cat.trim()));
            }
        })
        .catch((err) => console.error("Error fetching recipes:", err));
    }, [location.search]);

    useEffect(() => {
        applyFilters();
    }, [recipes, selectedCategories, searchQuery]);
    
    const applyFilters = () => {
        let filtered = recipes;
        
        // Filter by category (if selected)
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((recipe) => {
                const recipeCategories = recipe.category
                .split(",")
                .map((c) => c.trim());
                return selectedCategories.some((cat) => recipeCategories.includes(cat));
            });
        }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
        filtered = filtered.filter((recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    setFilteredRecipes(filtered);
    };
    
    // const toggleCategory = (category) => {
    //     let updatedCategories;
    //     if (selectedCategories.includes(category)) {
    //         updatedCategories = selectedCategories.filter((c) => c !== category);
    //     } else {
    //         updatedCategories = [...selectedCategories, category];
    //     }
        
    //     setSelectedCategories(updatedCategories);
    //     updateURL(updatedCategories);
    // };
    
    const toggleCategory = (category) => {
        setSelectedCategories((prevCategories) => {
          if (prevCategories.includes(category)) {
            // If category is already selected, remove it
            const updatedCategories = prevCategories.filter((c) => c !== category);
            updateURL(updatedCategories);
            return updatedCategories;
          } else {
            // If category is not selected, add it
            const updatedCategories = [...prevCategories, category];
            updateURL(updatedCategories);
            return updatedCategories;
          }
        });
      };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSearchQuery("");
        navigate("/recipes");
    };
    
    const updateURL = (updatedCategories) => {
        const queryParams = new URLSearchParams();
        if (updatedCategories.length > 0) {
            queryParams.set("categories", updatedCategories.join(","));
        }
        navigate(`/recipes?${queryParams.toString()}`);
    };
    
    return (
        <div className="all-recipes-page">
        <h1>All Recipes</h1>
        {/* Search Bar */}
        <section className="search-category-section container" >
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            {/* Category Buttons */}
            <div>
                <button onClick={clearFilters} 
                className={selectedCategories.length === 0 ? "active" : ""}>
                    All
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={selectedCategories.includes(category) ? "active" : ""}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </section>
        
        {/* Recipe List */}
        <section className="latest-recipes-section container">
            <div className="recipe-grid">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                    <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
                        {/* <img src={recipe.image} alt={recipe.title} />
                        <h2>{recipe.title}</h2>
                        <p>{recipe.category}</p> */}
                        <RecipeCard recipe={recipe} />
                    </Link>
                ))
            ) : (
                <p>No recipes found.</p>
                )}
            </div>
        </section>
    </div>
    );
    };

export default AllRecipes;

// const AllRecipes = () => {
//     const [recipes, setRecipes] = useState([]);
//     const [filteredRecipes, setFilteredRecipes] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     // const [searchTerm, setSearchTerm] = useState("");

//     const location = useLocation();
//     const navigate = useNavigate();

//     const queryParams = new URLSearchParams(location.search);
//     const categoriesParam = queryParams.get("categories");
//     const selectedCategories = categoriesParam 
//         ? categoriesParam.split(",").map((cat) => cat.trim())
//         : [];
//     const applyFilters = (data) => {
//         let filtered = data;
//         if (selectedCategories.length > 0 && selectedCategories[0] !== "") {
//             filtered = filtered.filter((recipe) => {
//                 const recipeCategories = recipe.category
//                     .split(",")
//                     .map((c) => c.trim());
//                 return selectedCategories.some((cat) => recipeCategories.includes(cat));
//             });
//         }
//         setFilteredRecipes(filtered);
//     };
    
//     useEffect(() => {
//         fetch("/recipes.json")
//             .then((res) => res.json())
//             .then((data) => {
//                 setRecipes(data);
//                 applyFilters(data);
//             })
//             .catch((err) => console.error("Error fetching recipes:", err));
//     }, [location.search])
    
//     useEffect(() => {
//         fetch("/recipes.json")
//             .then((response) => response.json())
//             .then((data) => {
//                 const uniqueCategories = Array.from(
//                     new Set(
//                         data.flatMap((recipe) =>
//                         recipe.category.split(",").map((cat) => cat.trim())
//                     )
//                 )
//             );
//             setCategories(uniqueCategories);
//             })
//             .catch((err) => console.error("Error fetching recipes:", err));
//     }, []);

//     return (
//         <div className="all-recipes-page">
           
//             <section className="latest-recipes-section container">
//                 <div className="recipe-grid">
//                 {filteredRecipes.map((recipe)=> (
//                     <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
//                         <RecipeCard recipe={recipe} />
//                     </Link>
//                 ))}
//                 </div>
//             </section>
           
//         </div>
//     )

// }

// {/* <section className="search-category-section container" >
// <div className="search-bar">
// <input 
// type="text"
// placeholder="Search for a recipe ..."
// value={searchTerm}
// onChange={(e) => setSearchTerm(e.target.value)}
// />
// </div>
// <div className="category-buttons">
//     {categories.map((cat) => (
//         <button
//         key={cat}
//         className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
//         // onClick={() => setSelectedCategory(cat)}
//         onClick={() => handleCategoryClick(cat)}
//         >
//             {cat}
//         </button>
//     ))}
// </div>
// </section> */}
// //     const [recipes, setRecipes] = useState([]);
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const [selectedCategory, setSelectedCategory] = useState("All");
// //     const [categories, setCategories] = useState([]);
// //     const filteredRecipes = recipes.filter((recipe) => {
// //         if (selectedCategory !== "All") {
// //             const recipeCategories = recipe.category.split(",").map((c) => c.trim());
// //             if (!recipeCategories.includes(selectedCategory)) return false;
// //         }
// //         if (searchTerm && !recipe.title.toLowerCase().includes(searchTerm.toLowerCase())){
// //             return false;
// //         }
// //         return true;
// //     })

// //     useEffect(() => {
// //         fetch("/recipes.json")
// //             .then((response) => response.json())
// //             .then((data) => {
// //                 setRecipes(data);
            
// //                 const catSet = new Set();
// //                 data.forEach((recipe) => {
// //                     recipe.category.split(",").forEach((c) => catSet.add(c.trim()));
// //                 });
// //                 setCategories(["All", ...Array.from(catSet)]);
// //             })
// //             .catch((err) => console.error("Error fetching recipes:", err));
// //     }, [])
// //   return (
// //     <div className="all-recipes-page">
// //         <section className="search-category-section container" >
// //             <div className="search-bar">
// //                 <input 
// //                 type="text"
// //                 placeholder="Search for a recipe ..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 />
// //             </div>
// //             <div className="category-buttons">
// //                 {categories.map((cat) => (
// //                     <button
// //                     key={cat}
// //                     className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
// //                     onClick={() => setSelectedCategory(cat)}
// //                     >
// //                         {cat}
// //                     </button>
// //                 ))}
// //             </div>
// //         </section>
// //         <section className="latest-recipes-section container">
// //             <h2 className="seciton-title">Latest Recipes</h2>
// //             <div className="recipe-grid">
// //             {filteredRecipes.map((recipe)=> (
// //                 <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
// //                     <RecipeCard recipe={recipe} />
// //                 </Link>
// //             ))}
// //         </div>
// //         </section>
// //     </div>
// //   )
// // }

// export default AllRecipes
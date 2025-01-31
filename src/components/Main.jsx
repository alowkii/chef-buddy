import { useState, useRef, useEffect } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../ai";

function Main(){
    const [ingredients, setIngredients] = useState(["Chicken", "Oregano", "Tomatoes", "Mustard"]);
    const [recipe, setRecipe] = useState("");
    const recipeSection = useRef(null);
    console.log(recipeSection);

    useEffect(() => {
        if (recipe !== "" && recipeSection !== null){
            recipeSection.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [recipe]);
    
    function handleSubmit(event){
        event.preventDefault();
        
        const formEl = event.currentTarget;
        const formData = new FormData(formEl);
        const newIngredient = formData.get("ingredient");
        
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        formEl.reset();
    }

    async function toggleRecipeShown(){
        let generatedRecipeMarkdown = ""; 
        try {
            generatedRecipeMarkdown = await getRecipeFromMistral(ingredients);
        } catch (err) {
            console.error(err.message);
        }
        setRecipe(generatedRecipeMarkdown);
    }

    return (
        <main>
            <form className="add-ingredient-form" onSubmit={handleSubmit}>
                <input
                    type="text" 
                    aria-label="Add ingredient"
                    placeholder="e.g. basil" 
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && 
                <IngredientsList 
                    ref={recipeSection}
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeShown}
            />}
            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}

export default Main;
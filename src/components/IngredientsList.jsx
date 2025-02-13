import { forwardRef } from "react";
import PropTypes from "prop-types";

const IngredientsList = forwardRef(function IngredientsList(props, ref) {
    const ingredientsListItems = props.ingredients.map(ingredient =>
        <li key={ingredient}>{ingredient}</li>);

    return (
        <section className="ingredient-list-container">
            <h1>Ingredients on hand:</h1>
            <ul className="ingredient-list">
                {ingredientsListItems}
            </ul>
            {props.ingredients.length > 3 && 
            <div 
                className="get-recipe-container"
                ref={ref} 
            >
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
                <button onClick={props.toggleRecipeShown}>Get recipe</button>
            </div>}
        </section>
    );
});

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    toggleRecipeShown: PropTypes.func.isRequired
};

export default IngredientsList;

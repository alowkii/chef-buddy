import { PropTypes } from 'prop-types';

export default function IngredientsList(props){
    const ingredientsListItems = props.ingredients.map(ingredient =>
        <li key={ingredient}>{ingredient}</li>);

    return (
        <section className="ingredient-list-container">
            <ul className="ingredient-list">
                <h1>Ingredients on hand:</h1>
                {ingredientsListItems}
            </ul>
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
                <button onClick={props.toggleRecipeShown}>Get recipe</button>
            </div>}
        </section>
    )
}

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    toggleRecipeShown: PropTypes.func.isRequired
};  
import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // Transforming state object into array through Object.keys
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
            // Spread operatorer for Array passing ingredients by Key and mapping within map.
            return [...Array(props.ingredients[igKey])].map((_, i) => {
              return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        // Flattening Arrays into single array
        // Reduce takes two params, prev array and element
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients!</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
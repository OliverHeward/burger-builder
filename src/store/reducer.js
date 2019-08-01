import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                // immutably creating new ingredients object
                ingredients: {
                    // cloning the prev ingredients
                    ...state.ingredients,
                    // expected ingredient from action payload - then update state of ingredient payload + 1
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                // takes old price and adds the ingredient price for the given payload name
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                // immutably creating new ingredients object
                ingredients: {
                    // cloning the prev ingredients
                    ...state.ingredients,
                     // expected ingredient from action payload - then update state of ingredient payload minus 1
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                 // takes old price and minus' the ingredient price for the given payload name
                 totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
            default:
                return state;
    }
};

export default reducer;
import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        axios.get( 'https://burger-build-11e2b.firebaseio.com/ingredients.json' )
            .then( response => {
                this.setState( { ingredients: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
    }

    updatePurchaseState(ingredients) {
        // Mapping ingredients into and Array, then Mapping the Array>Array's(ingredientKey) that are produced
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        // Saving prevState num of ingredient
        const oldCount = this.state.ingredients[type];
        // updating increment 
        const updatedCount = oldCount + 1;
        // Spread operator pulling in state of ingredients
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // prev var set to new Increment count
        updatedIngredients[type] = updatedCount;
        // Grabbing price of ingredient type price
        const priceAddition = INGREDIENT_PRICES[type];
        // Old price saved in var
        const oldPrice = this.state.totalPrice;
        // adding oldprice with selection price
        const newPrice = oldPrice + priceAddition;
        // Updating state to new price and totalingredients
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        // update purchase state
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // If State count is equal or less than 0 return nothing
        if (oldCount <= 0) {
            return;
        }
        // decrementing oldcount of ingredient 
        const updatedCount = oldCount - 1;
        // spread operator to bring in state
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // Updating total ingredients by type
        updatedIngredients[type] = updatedCount;
        // Grabbing price of ingredient type price
        const priceDeduction = INGREDIENT_PRICES[type];
        // pulling in totalprice 
        const oldPrice = this.state.totalPrice;
        // subraction of oldprice and price deduction of unselected ingredient
        const newPrice = oldPrice - priceDeduction;
        // Setting state to updated price and ingredients
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        // updating purhcase state
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        // this.setState({loading: true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Oliver Heward',
        //         address: {
        //             street: 'Redriff Road',
        //             postCode: 'SE16',
        //             country: 'England'
        //         },
        //         email: 'Oliver@hewy.dev'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false})
        //     })
        //     .catch(error => {
        //         this.setState({loading: false})
        //     });
        const queryParams = [];
        for(let i in this.state.ingredients) {
            // pushing ingredients to queryParams object, encoding property name & value for URL safety for given ingredient
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be found!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            )
            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />;
        }

        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

export default withErrorHandler(BurgerBuilder, axios);

import * as actionTypes from './actionTypes';
import Axios from '../../Axios-orders';

export const addIngredient =(name)=>{
    return{
        type:actionTypes.Add_Ingredient,
        ingredientName : name
    };
}
export const removeIngredient =(name)=>{
    return{
        type:actionTypes.Remove_Ingredient,
        ingredientName : name
    };
}
export const setIngredients = (ingredients)=>{
    return{
       type:actionTypes.Set_Ingredient,
       ingredients: ingredients
    };
}

export const fetchedIngredirentsFailed=()=>{
    return {
        type:actionTypes.Fetched_Ingredients_Failed
    }
}
export const initIngredients =()=>{
    return dispatch=>{
       Axios.get('https://react-burger-builder-fcf37.firebaseio.com/ingredients.json')
        .then(response =>dispatch(setIngredients(response.data) ))
        .catch(error =>{
            dispatch(fetchedIngredirentsFailed())
        });
    };
}
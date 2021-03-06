import * as actionTypes from '../action/actionTypes';

const initialState ={
    ingredients:null,
        totalPrice:4,
        error:false
}
const INGREDIENTS_PRICES ={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7,
}
 
const burgerBuilderReducer =(state=initialState,action)=>{
 switch(action.type){
     case actionTypes.Add_Ingredient:
         return{
          ...state,
          ingredients:{
              ...state.ingredients,
              [action.ingredientName]: state.ingredients[action.ingredientName]+1,
          },
          totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
        };
          
    case actionTypes.Remove_Ingredient :
        return{
            ...state,
          ingredients:{
              ...state.ingredients,
              [action.ingredientName]: state.ingredients[action.ingredientName]-1,
          },
          totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
        };
        case actionTypes.Set_Ingredient:
            return{
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice:4,
            };
            case actionTypes.Fetched_Ingredients_Failed:
                return{
                    ...state,
                    error: true,
                }
        default:
            return state;
         }
 }


export default burgerBuilderReducer;
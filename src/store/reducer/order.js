import * as actions from '../action/actionTypes';

 const initialState ={
    orders:[],
    loading:false,
    purchased:false,
}


export const reducer =(state= initialState,action)=>{
  switch(action.type){
      case actions.Purchase_Init:
          return{
             ...state,
             purchased:false
          };
      case actions.purchase_Burger_Start:
      return{
          ...state,
          loading:true,
      };
      case actions.Purchase_Burger_Success:
       const newOrder={
            ...action.orderData,
            id:action.orderId
       };

          return{
              ...state,
              loading:false,
              purchased:true,
              orders:state.orders.concat(newOrder)
          };
       case actions.Purchase_Burger_Fail:
           return{
                ...state,
                loading:false,
           };
           case actions.Fetch_Orders_Start:
               return{
                   ...state,
                   loading:true,
               };
            case actions.Fetch_Orders_Success:
                   return{
                       ...state,
                       orders:action.orders,
                       loading:false,
                   };
            case actions.Fetch_Orders_Failed:
                return{
                  ...state,
                  loading:false,
                };
        default:
            return state;      
  }
}


export default reducer;